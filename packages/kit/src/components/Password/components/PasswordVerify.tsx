import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { AuthenticationType } from 'expo-local-authentication';
import { useIntl } from 'react-intl';

import type { IKeyOfIcons, IPropsWithTestId } from '@onekeyhq/components';
import {
  Form,
  IconButton,
  Input,
  SizableText,
  XStack,
  useForm,
} from '@onekeyhq/components';
import { EPasswordMode } from '@onekeyhq/kit-bg/src/services/ServicePassword/types';
import { usePasswordAtom } from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import platformEnv from '@onekeyhq/shared/src/platformEnv';
import { EPasswordVerifyStatus } from '@onekeyhq/shared/types/password';

import { useHandleAppStateActive } from '../../../hooks/useHandleAppStateActive';
import { getPasswordKeyboardType } from '../utils';

import PassCodeInput from './PassCodeInput';

interface IPasswordVerifyProps {
  authType: AuthenticationType[];
  isEnable: boolean;
  passwordMode: EPasswordMode;
  onPasswordChange: (e: any) => void;
  onBiologyAuth: () => void;
  onInputPasswordAuth: (data: IPasswordVerifyForm) => void;
  status: {
    value: EPasswordVerifyStatus;
    message?: string;
  };
  alertText?: string;
  confirmBtnDisabled?: boolean;
}

export interface IPasswordVerifyForm {
  password: string;
  passCode: string;
}

const PasswordVerify = ({
  authType,
  isEnable,
  alertText,
  confirmBtnDisabled,
  status,
  passwordMode,
  onBiologyAuth,
  onPasswordChange,
  onInputPasswordAuth,
}: IPasswordVerifyProps) => {
  const intl = useIntl();
  const form = useForm<IPasswordVerifyForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { password: '', passCode: '' },
  });
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const isEnableRef = useRef(isEnable);
  if (isEnableRef.current !== isEnable) {
    isEnableRef.current = isEnable;
  }
  useEffect(() => {
    // enable first false should wait some logic to get final value
    timeOutRef.current = setTimeout(() => {
      if (!isEnableRef.current) {
        form.setFocus(
          passwordMode === EPasswordMode.PASSWORD ? 'password' : 'passCode',
        );
      }
    }, 500);
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [secureEntry, setSecureEntry] = useState(true);
  const lastTime = useRef(0);
  const passwordInput = form.watch(
    passwordMode === EPasswordMode.PASSWORD ? 'password' : 'passCode',
  );
  const [{ manualLocking }] = usePasswordAtom();
  const biologyAuthIconName = useMemo(() => {
    let iconName: IKeyOfIcons =
      authType &&
      (authType.includes(AuthenticationType.FACIAL_RECOGNITION) ||
        authType.includes(AuthenticationType.IRIS))
        ? 'FaceIdOutline'
        : 'TouchId2Outline';
    if (platformEnv.isDesktopWin) {
      iconName = 'WindowsHelloSolid';
    } else if (platformEnv.isExtension) {
      iconName = 'PassKeySolid';
    }
    return iconName;
  }, [authType]);
  const rightActions = useMemo(() => {
    const actions: IPropsWithTestId<{
      iconName?: IKeyOfIcons;
      onPress?: () => void;
      loading?: boolean;
      disabled?: boolean;
    }>[] = [];
    if (isEnable && !passwordInput) {
      actions.push({
        iconName: biologyAuthIconName,
        onPress: onBiologyAuth,
        loading: status.value === EPasswordVerifyStatus.VERIFYING,
      });
    } else {
      actions.push({
        iconName: secureEntry ? 'EyeOutline' : 'EyeOffOutline',
        onPress: () => {
          setSecureEntry(!secureEntry);
        },
      });
      actions.push({
        iconName: 'ArrowRightOutline',
        onPress: form.handleSubmit(onInputPasswordAuth),
        loading: status.value === EPasswordVerifyStatus.VERIFYING,
        disabled: confirmBtnDisabled,
        testID: 'verifying-password',
      });
    }

    return actions;
  }, [
    isEnable,
    passwordInput,
    biologyAuthIconName,
    onBiologyAuth,
    status.value,
    secureEntry,
    form,
    onInputPasswordAuth,
    confirmBtnDisabled,
  ]);

  useEffect(() => {
    const fieldName =
      passwordMode === EPasswordMode.PASSWORD ? 'password' : 'passCode';
    if (status.value === EPasswordVerifyStatus.ERROR) {
      form.setError(fieldName, { message: status.message });
      form.setFocus(fieldName);
    } else {
      form.clearErrors(fieldName);
    }
  }, [form, passwordMode, status]);

  useLayoutEffect(() => {
    if (
      isEnable &&
      !passwordInput &&
      status.value === EPasswordVerifyStatus.DEFAULT &&
      !manualLocking
    ) {
      void onBiologyAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnable, manualLocking]);

  // Perform biology verification upon returning to the backend after a 1-second interval.
  const onActive = useCallback(() => {
    const now = Date.now();
    if (now - lastTime.current > 1000) {
      lastTime.current = now;
      if (
        isEnable &&
        !passwordInput &&
        status.value === EPasswordVerifyStatus.DEFAULT &&
        !manualLocking
      ) {
        void onBiologyAuth();
      }
    }
  }, [isEnable, passwordInput, status.value, manualLocking, onBiologyAuth]);

  useHandleAppStateActive(isEnable ? onActive : undefined);

  return (
    <Form form={form}>
      {passwordMode === EPasswordMode.PASSWORD ? (
        <>
          <Form.Field
            name="password"
            rules={{
              required: {
                value: true,
                message: intl.formatMessage({
                  id: ETranslations.auth_error_password_incorrect,
                }),
              },
              onChange: onPasswordChange,
            }}
          >
            <Input
              selectTextOnFocus
              size="large"
              editable={status.value !== EPasswordVerifyStatus.VERIFYING}
              placeholder={intl.formatMessage({
                id: ETranslations.auth_enter_your_password,
              })}
              flex={1}
              // onChangeText={(text) => text.replace(PasswordRegex, '')}
              onChangeText={(text) => text}
              keyboardType={getPasswordKeyboardType(!secureEntry)}
              secureTextEntry={secureEntry}
              // fix Keyboard Flickering on TextInput with secureTextEntry #39411
              // https://github.com/facebook/react-native/issues/39411
              textContentType="oneTimeCode"
              onSubmitEditing={form.handleSubmit(onInputPasswordAuth)}
              addOns={rightActions}
              testID="password-input"
            />
          </Form.Field>
          {alertText ? (
            <XStack alignSelf="center" w="$45" h="$10" borderRadius="$2.5">
              <SizableText size="$bodyMd" color="$textOnBrightColor">
                {alertText}
              </SizableText>
            </XStack>
          ) : null}
        </>
      ) : (
        <>
          <Form.Field
            label={intl.formatMessage({
              id: ETranslations.auth_confirm_password_form_label,
            })}
            name="passCode"
            rules={{
              validate: {
                required: (v) =>
                  v
                    ? undefined
                    : intl.formatMessage({
                        id: ETranslations.auth_error_password_empty,
                      }),
              },
              onChange: onPasswordChange,
            }}
          >
            <PassCodeInput
              onPinCodeChange={(pin) => {
                form.setValue('passCode', pin);
                form.clearErrors('passCode');
              }}
              onComplete={form.handleSubmit(onInputPasswordAuth)}
              disabledComplete={confirmBtnDisabled}
              testId="pass-code-input"
            />
          </Form.Field>
          {isEnable && !passwordInput ? (
            <IconButton
              icon={biologyAuthIconName}
              onPress={onBiologyAuth}
              loading={status.value === EPasswordVerifyStatus.VERIFYING}
            />
          ) : (
            <>
              {alertText ? (
                <XStack alignSelf="center" w="$45" h="$10" borderRadius="$2.5">
                  <SizableText size="$bodyMd" color="$textOnBrightColor">
                    {alertText}
                  </SizableText>
                </XStack>
              ) : null}
            </>
          )}
        </>
      )}
    </Form>
  );
};
export default memo(PasswordVerify);
