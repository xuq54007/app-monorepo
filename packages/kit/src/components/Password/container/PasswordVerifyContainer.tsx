import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { AuthenticationType } from 'expo-local-authentication';
import { useIntl } from 'react-intl';

import { Stack } from '@onekeyhq/components';
import backgroundApiProxy from '@onekeyhq/kit/src/background/instance/backgroundApiProxy';
import { biologyAuthUtils } from '@onekeyhq/kit-bg/src/services/ServicePassword/biologyAuthUtils';
import {
  BIOLOGY_AUTH_ATTEMPTS_FACE,
  BIOLOGY_AUTH_ATTEMPTS_FINGERPRINT,
  EPasswordMode,
  PASSCODE_PROTECTION_ATTEMPTS,
  PASSCODE_PROTECTION_ATTEMPTS_MESSAGE_SHOW_MAX,
  PASSCODE_PROTECTION_ATTEMPTS_PER_MINUTE_MAP,
} from '@onekeyhq/kit-bg/src/services/ServicePassword/types';
import { useSettingsPersistAtom } from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import {
  usePasswordAtom,
  usePasswordBiologyAuthInfoAtom,
  usePasswordModeAtom,
  usePasswordPersistAtom,
} from '@onekeyhq/kit-bg/src/states/jotai/atoms/password';
import { dismissKeyboard } from '@onekeyhq/shared/src/keyboard';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import platformEnv from '@onekeyhq/shared/src/platformEnv';
import timerUtils from '@onekeyhq/shared/src/utils/timerUtils';
import { EPasswordVerifyStatus } from '@onekeyhq/shared/types/password';

import { useWebAuthActions } from '../../BiologyAuthComponent/hooks/useWebAuthActions';
import PasswordVerify from '../components/PasswordVerify';
import usePasswordProtection from '../hooks/usePasswordProtection';

import type { IPasswordVerifyForm } from '../components/PasswordVerify';
import type { LayoutChangeEvent } from 'react-native';

interface IPasswordVerifyProps {
  onVerifyRes: (password: string) => void;
  onLayout?: (e: LayoutChangeEvent) => void;
  name?: 'lock';
}

const PasswordVerifyContainer = ({
  onVerifyRes,
  onLayout,
  name,
}: IPasswordVerifyProps) => {
  const intl = useIntl();
  const [{ authType, isEnable }] = usePasswordBiologyAuthInfoAtom();
  const { verifiedPasswordWebAuth, checkWebAuth } = useWebAuthActions();
  const [{ webAuthCredentialId }] = usePasswordPersistAtom();
  const [{ isBiologyAuthSwitchOn }] = useSettingsPersistAtom();
  const [hasCachedPassword, setHasCachedPassword] = useState(false);
  const [hasSecurePassword, setHasSecurePassword] = useState(false);
  const [passwordMode] = usePasswordModeAtom();
  const biologyAuthAttempts = useMemo(
    () =>
      authType.includes(AuthenticationType.FACIAL_RECOGNITION)
        ? BIOLOGY_AUTH_ATTEMPTS_FACE
        : BIOLOGY_AUTH_ATTEMPTS_FINGERPRINT,
    [authType],
  );
  const isLock = useMemo(() => name === 'lock', [name]);
  const isExtLockAndNoCachePassword = Boolean(
    platformEnv.isExtension && isLock && !hasCachedPassword,
  );
  const [{ passwordVerifyStatus }, setPasswordAtom] = usePasswordAtom();
  const resetPasswordStatus = useCallback(() => {
    void backgroundApiProxy.servicePassword.resetPasswordStatus();
  }, []);
  useEffect(() => {
    if (webAuthCredentialId && isBiologyAuthSwitchOn) {
      void (async () => {
        setHasCachedPassword(
          !!(await backgroundApiProxy.servicePassword.getCachedPassword()),
        );
      })();
    }
  }, [webAuthCredentialId, isBiologyAuthSwitchOn]);

  useEffect(() => {
    if (isEnable && isBiologyAuthSwitchOn) {
      void (async () => {
        try {
          const securePassword = await biologyAuthUtils.getPassword();
          setHasSecurePassword(!!securePassword);
        } catch (e) {
          setHasSecurePassword(false);
        }
      })();
    }
  }, [isEnable, isBiologyAuthSwitchOn]);

  useEffect(() => {
    setPasswordAtom((v) => ({
      ...v,
      passwordVerifyStatus: { value: EPasswordVerifyStatus.DEFAULT },
    }));
    return () => {
      resetPasswordStatus();
    };
  }, [setPasswordAtom, resetPasswordStatus]);

  const {
    verifyPeriodBiologyEnable,
    verifyPeriodBiologyAuthAttempts,
    unlockPeriodPasswordArray,
    passwordErrorAttempts,
    setVerifyPeriodBiologyEnable,
    setVerifyPeriodBiologyAuthAttempts,
    setPasswordErrorProtectionTimeMinutesSurplus,
    setUnlockPeriodPasswordArray,
    alertText,
    setPasswordPersist,
    enablePasswordErrorProtection,
  } = usePasswordProtection(isLock);

  const isBiologyAuthEnable = useMemo(
    // both webAuth or biologyAuth are enabled
    () => {
      if (isExtLockAndNoCachePassword) {
        return (
          isBiologyAuthSwitchOn &&
          !!webAuthCredentialId &&
          verifyPeriodBiologyEnable
        );
      }
      return (
        isBiologyAuthSwitchOn &&
        verifyPeriodBiologyEnable &&
        ((isEnable && hasSecurePassword) ||
          (!!webAuthCredentialId && !!hasCachedPassword))
      );
    },
    [
      hasCachedPassword,
      hasSecurePassword,
      isEnable,
      webAuthCredentialId,
      isBiologyAuthSwitchOn,
      isExtLockAndNoCachePassword,
      verifyPeriodBiologyEnable,
    ],
  );

  const onBiologyAuthenticateExtLockAndNoCachePassword =
    useCallback(async () => {
      if (
        passwordVerifyStatus.value === EPasswordVerifyStatus.VERIFYING ||
        passwordVerifyStatus.value === EPasswordVerifyStatus.VERIFIED
      ) {
        return;
      }
      setPasswordAtom((v) => ({
        ...v,
        passwordVerifyStatus: { value: EPasswordVerifyStatus.VERIFYING },
      }));
      try {
        const result = await checkWebAuth();
        if (result) {
          setPasswordAtom((v) => ({
            ...v,
            passwordVerifyStatus: { value: EPasswordVerifyStatus.VERIFIED },
          }));
          onVerifyRes('');
        } else {
          throw new Error('biology auth verify error');
        }
      } catch {
        if (verifyPeriodBiologyAuthAttempts >= biologyAuthAttempts) {
          setVerifyPeriodBiologyEnable(false);
        } else {
          setVerifyPeriodBiologyAuthAttempts((v) => v + 1);
        }
        setPasswordAtom((v) => ({
          ...v,
          passwordVerifyStatus: {
            value: EPasswordVerifyStatus.ERROR,
            message: intl.formatMessage({
              id: ETranslations.auth_error_password_incorrect,
            }),
          },
        }));
      }
    }, [
      passwordVerifyStatus.value,
      setPasswordAtom,
      checkWebAuth,
      onVerifyRes,
      verifyPeriodBiologyAuthAttempts,
      biologyAuthAttempts,
      setVerifyPeriodBiologyEnable,
      setVerifyPeriodBiologyAuthAttempts,
      intl,
    ]);

  const onBiologyAuthenticate = useCallback(async () => {
    if (
      passwordVerifyStatus.value === EPasswordVerifyStatus.VERIFYING ||
      passwordVerifyStatus.value === EPasswordVerifyStatus.VERIFIED
    ) {
      return;
    }
    setPasswordAtom((v) => ({
      ...v,
      passwordVerifyStatus: { value: EPasswordVerifyStatus.VERIFYING },
    }));
    try {
      let biologyAuthRes;
      if (!isEnable && isBiologyAuthEnable) {
        // webAuth verify
        biologyAuthRes = await verifiedPasswordWebAuth();
      } else {
        biologyAuthRes =
          await backgroundApiProxy.servicePassword.verifyPassword({
            password: '',
            isBiologyAuth: true,
            passwordMode,
          });
      }
      if (biologyAuthRes) {
        setPasswordAtom((v) => ({
          ...v,
          passwordVerifyStatus: { value: EPasswordVerifyStatus.VERIFIED },
        }));
        onVerifyRes(biologyAuthRes);
      } else {
        throw new Error('biology auth verify error');
      }
    } catch (e) {
      if (verifyPeriodBiologyAuthAttempts >= biologyAuthAttempts) {
        setVerifyPeriodBiologyEnable(false);
      } else {
        setVerifyPeriodBiologyAuthAttempts((v) => v + 1);
      }
      setPasswordAtom((v) => ({
        ...v,
        passwordVerifyStatus: {
          value: EPasswordVerifyStatus.ERROR,
          message: intl.formatMessage({
            id: ETranslations.auth_error_password_incorrect,
          }),
        },
      }));
    }
  }, [
    biologyAuthAttempts,
    intl,
    isBiologyAuthEnable,
    isEnable,
    onVerifyRes,
    passwordMode,
    passwordVerifyStatus.value,
    setPasswordAtom,
    setVerifyPeriodBiologyAuthAttempts,
    setVerifyPeriodBiologyEnable,
    verifiedPasswordWebAuth,
    verifyPeriodBiologyAuthAttempts,
  ]);

  const onInputPasswordAuthenticate = useCallback(
    async (data: IPasswordVerifyForm) => {
      if (
        passwordVerifyStatus.value === EPasswordVerifyStatus.VERIFYING ||
        passwordVerifyStatus.value === EPasswordVerifyStatus.VERIFIED
      ) {
        return;
      }
      setPasswordAtom((v) => ({
        ...v,
        passwordVerifyStatus: { value: EPasswordVerifyStatus.VERIFYING },
      }));
      const finalPassword =
        passwordMode === EPasswordMode.PASSWORD ? data.password : data.passCode;
      try {
        const encodePassword =
          await backgroundApiProxy.servicePassword.encodeSensitiveText({
            text: finalPassword,
          });
        const verifiedPassword =
          await backgroundApiProxy.servicePassword.verifyPassword({
            password: encodePassword,
            passwordMode,
          });
        setPasswordAtom((v) => ({
          ...v,
          passwordVerifyStatus: { value: EPasswordVerifyStatus.VERIFIED },
        }));
        if (platformEnv.isNativeAndroid) {
          dismissKeyboard();
          await timerUtils.wait(0);
        }
        onVerifyRes(verifiedPassword);
        if (isLock && enablePasswordErrorProtection) {
          setPasswordPersist((v) => ({
            ...v,
            passwordErrorAttempts: 0,
            passwordErrorProtectionTime: 0,
          }));
        }
      } catch (e) {
        let message = intl.formatMessage({
          id: ETranslations.auth_error_password_incorrect,
        });
        if (isLock && enablePasswordErrorProtection) {
          let nextAttempts = passwordErrorAttempts + 1;
          if (!unlockPeriodPasswordArray.includes(finalPassword)) {
            setPasswordPersist((v) => ({
              ...v,
              passwordErrorAttempts: nextAttempts,
            }));
            setUnlockPeriodPasswordArray((v) => [...v, finalPassword]);
          } else {
            nextAttempts = passwordErrorAttempts;
          }
          if (nextAttempts >= PASSCODE_PROTECTION_ATTEMPTS_MESSAGE_SHOW_MAX) {
            const timeMinutes =
              PASSCODE_PROTECTION_ATTEMPTS_PER_MINUTE_MAP[
                nextAttempts.toString()
              ];
            message = `${
              PASSCODE_PROTECTION_ATTEMPTS - nextAttempts
            } more failed attempts will reset the device`;
            setPasswordPersist((v) => ({
              ...v,
              passwordErrorProtectionTime: Date.now() + timeMinutes * 60 * 1000, // 2s for animation
            }));
            setPasswordErrorProtectionTimeMinutesSurplus(timeMinutes);
          }
        }
        setPasswordAtom((v) => ({
          ...v,
          passwordVerifyStatus: {
            value: EPasswordVerifyStatus.ERROR,
            message,
          },
        }));
      }
    },
    [
      enablePasswordErrorProtection,
      intl,
      isLock,
      onVerifyRes,
      passwordErrorAttempts,
      passwordMode,
      passwordVerifyStatus.value,
      setPasswordAtom,
      setPasswordErrorProtectionTimeMinutesSurplus,
      setPasswordPersist,
      setUnlockPeriodPasswordArray,
      unlockPeriodPasswordArray,
    ],
  );

  return (
    <Stack onLayout={onLayout}>
      <PasswordVerify
        passwordMode={passwordMode}
        alertText={alertText}
        confirmBtnDisabled={!!alertText}
        onPasswordChange={() => {
          setPasswordAtom((v) => ({
            ...v,
            passwordVerifyStatus: { value: EPasswordVerifyStatus.DEFAULT },
          }));
        }}
        status={passwordVerifyStatus}
        onBiologyAuth={
          isExtLockAndNoCachePassword
            ? onBiologyAuthenticateExtLockAndNoCachePassword
            : onBiologyAuthenticate
        }
        onInputPasswordAuth={onInputPasswordAuthenticate}
        isEnable={isBiologyAuthEnable}
        authType={isEnable ? authType : [AuthenticationType.FINGERPRINT]}
      />
    </Stack>
  );
};
export default memo(PasswordVerifyContainer);
