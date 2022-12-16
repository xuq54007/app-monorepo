import { FC } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { useIntl } from 'react-intl';

import { Box, Center, Image, Modal, Typography } from '@onekeyhq/components';
import RecoveryPhrase from '@onekeyhq/kit/assets/3d_recovery_phrase.png';
import {
  HardwareUpdateModalRoutes,
  HardwareUpdateRoutesParams,
} from '@onekeyhq/kit/src/routes/Modal/HardwareUpdate';
import { ModalScreenProps } from '@onekeyhq/kit/src/routes/types';

type NavigationProps = ModalScreenProps<HardwareUpdateRoutesParams>;
type RouteProps = RouteProp<
  HardwareUpdateRoutesParams,
  HardwareUpdateModalRoutes.HardwareUpdateWarningModal
>;

const UpdateWarningModal: FC = () => {
  const navigation = useNavigation<NavigationProps['navigation']>();
  const intl = useIntl();
  const { device, onSuccess } = useRoute<RouteProps>().params;

  return (
    <Modal
      maxHeight={560}
      hideSecondaryAction
      primaryActionTranslationId="action__yes_i_have"
      onPrimaryActionPress={() => {
        navigation.popToTop();
        navigation.replace(HardwareUpdateModalRoutes.HardwareUpdatingModal, {
          device,
          onSuccess,
        });
      }}
    >
      <Center flex={1} paddingX={4}>
        <Box alignItems="center">
          <Image size={112} source={RecoveryPhrase} />

          <Typography.DisplayMedium mt={8}>
            {intl.formatMessage({ id: 'modal__do_you_have_your_phrase' })}
          </Typography.DisplayMedium>
          <Typography.Body1 color="text-subdued" mt={3}>
            {intl.formatMessage({
              id: 'modal__do_you_have_your_phrase_desc',
            })}
          </Typography.Body1>
        </Box>
      </Center>
    </Modal>
  );
};

export default UpdateWarningModal;
