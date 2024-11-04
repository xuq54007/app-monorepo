import { useEffect } from 'react';

import { ipcMessageKeys } from '@onekeyhq/desktop/src-electron/config';
import platformEnv from '@onekeyhq/shared/src/platformEnv';
import type { EShortcutEvents } from '@onekeyhq/shared/src/shortcuts/shortcuts.enum';

export const useShortcuts = (
  eventName: EShortcutEvents | undefined,
  callback: (event: EShortcutEvents) => void,
) => {
  useEffect(() => {
    if (platformEnv.isDesktop) {
      let isVisible = true;
      const handleFocus = () => {
        isVisible = true;
      };
      const handleBlur = () => {
        isVisible = false;
      };
      const handleVisibilityStateChange = () => {
        if (document.visibilityState === 'hidden') {
          handleBlur();
        } else if (document.visibilityState === 'visible') {
          handleFocus();
        }
      };
      document.addEventListener(
        'visibilitychange',
        handleVisibilityStateChange,
        false,
      );
      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);
      const handleCallback = (_: unknown, e: EShortcutEvents) => {
        if (isVisible && (eventName === undefined || e === eventName)) {
          callback(e);
        }
      };
      globalThis.desktopApi.addIpcEventListener(
        ipcMessageKeys.APP_SHORCUT,
        handleCallback,
      );
      return () => {
        globalThis.desktopApi.removeIpcEventListener(
          ipcMessageKeys.APP_SHORCUT,
          handleCallback,
        );
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityStateChange,
          false,
        );
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('blur', handleBlur);
      };
    }
  }, [callback, eventName]);
};
