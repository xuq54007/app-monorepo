import { useIntl } from 'react-intl';

import {
  ESwitchSize,
  Page,
  SizableText,
  Switch,
  XStack,
  YStack,
} from '@onekeyhq/components';
import { useSettingsPersistAtom } from '@onekeyhq/kit-bg/src/states/jotai/atoms/settings';
import { ETranslations } from '@onekeyhq/shared/src/locale';

function FloatingIconModal() {
  const intl = useIntl();
  const [settings, setSettings] = useSettingsPersistAtom();
  return (
    <Page>
      <Page.Header title="Floating icon" />
      <Page.Body>
        <YStack p="$5">
          <XStack ai="center" jc="space-between">
            <SizableText size="$bodyLgMedium">Always display</SizableText>
            <Switch
              size={ESwitchSize.large}
              value={settings.isFloatingIconAlwaysDisplay}
              onChange={(value) => {
                setSettings((prev) => ({
                  ...prev,
                  isFloatingIconAlwaysDisplay: value,
                }));
              }}
            />
          </XStack>
          <SizableText size="$bodySm" color="$textSubdued" mt="$3">
            When enabled, OneKey will activate a floating icon in the bottom
            right corner of the webpage, which can help you check the security
            information of dApps.
          </SizableText>
        </YStack>
      </Page.Body>
    </Page>
  );
}

export default FloatingIconModal;
