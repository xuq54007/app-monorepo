import { SizableText, XStack, YStack } from '@onekeyhq/components';

import PassCodeProtectionSwitch from '../container/PassCodeProtectionSwitch';

const PassCodeProtectionDialogContent = () => (
  <YStack gap="$2">
    <SizableText size="$bodySm" color="$textSubdued">
      10 failed passcode attempts will reset app, you can change it anytime on
      setting - protection.
    </SizableText>
    <XStack justifyContent="space-between">
      <SizableText size="$bodyMdMedium">
        Reset App after 10 failed attempts
      </SizableText>
      <PassCodeProtectionSwitch />
    </XStack>
  </YStack>
);

export default PassCodeProtectionDialogContent;
