import { useEffect, useMemo, useRef, useState } from 'react';

import { PASSCODE_PROTECTION_ATTEMPTS_MESSAGE_SHOW_MAX } from '@onekeyhq/kit-bg/src/services/ServicePassword/types';
import { usePasswordPersistAtom } from '@onekeyhq/kit-bg/src/states/jotai/atoms';

const usePasswordProtection = (isLock: boolean) => {
  const [unlockPeriodPasswordArray, setUnlockPeriodPasswordArray] = useState<
    string[]
  >([]);
  const [passwordErrorProtectionTimeOver, setPasswordErrorProtectionTimeOver] =
    useState(false);
  const [
    passwordErrorProtectionTimeMinutesSurplus,
    setPasswordErrorProtectionTimeMinutesSurplus,
  ] = useState(0);
  const [verifyPeriodBiologyAuthAttempts, setVerifyPeriodBiologyAuthAttempts] =
    useState(0);
  const [verifyPeriodBiologyEnable, setVerifyPeriodBiologyEnable] =
    useState(true);
  const [
    {
      passwordErrorAttempts,
      enablePasswordErrorProtection,
      passwordErrorProtectionTime,
    },
    setPasswordPersist,
  ] = usePasswordPersistAtom();
  const alertText = useMemo(() => {
    if (
      isLock &&
      enablePasswordErrorProtection &&
      passwordErrorAttempts >= PASSCODE_PROTECTION_ATTEMPTS_MESSAGE_SHOW_MAX &&
      passwordErrorProtectionTime > Date.now() &&
      passwordErrorProtectionTimeMinutesSurplus > 0 &&
      !passwordErrorProtectionTimeOver
    ) {
      return `Try again in ${Math.floor(
        passwordErrorProtectionTimeMinutesSurplus,
      )} minutes`;
    }
    return '';
  }, [
    isLock,
    enablePasswordErrorProtection,
    passwordErrorAttempts,
    passwordErrorProtectionTime,
    passwordErrorProtectionTimeOver,
    passwordErrorProtectionTimeMinutesSurplus,
  ]);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    if (alertText) {
      intervalRef.current = setInterval(() => {
        if (passwordErrorProtectionTime < Date.now()) {
          setPasswordErrorProtectionTimeOver(true);
          setPasswordErrorProtectionTimeMinutesSurplus(0);
        } else {
          const timeMinutes =
            (passwordErrorProtectionTime - Date.now()) / 60_000 + 1;
          setPasswordErrorProtectionTimeMinutesSurplus(timeMinutes);
        }
      }, 1000 * 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [alertText, passwordErrorProtectionTime]);

  return {
    unlockPeriodPasswordArray,
    passwordErrorProtectionTimeOver,
    passwordErrorProtectionTimeMinutesSurplus,
    verifyPeriodBiologyAuthAttempts,
    verifyPeriodBiologyEnable,
    passwordErrorAttempts,
    alertText,
    setPasswordPersist,
    setVerifyPeriodBiologyEnable,
    setVerifyPeriodBiologyAuthAttempts,
    setUnlockPeriodPasswordArray,
    setPasswordErrorProtectionTimeOver,
    setPasswordErrorProtectionTimeMinutesSurplus,
    enablePasswordErrorProtection,
  };
};

export default usePasswordProtection;
