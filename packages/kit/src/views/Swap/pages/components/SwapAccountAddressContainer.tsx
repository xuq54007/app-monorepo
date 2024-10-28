import { useMemo } from 'react';

import { useIntl } from 'react-intl';

import {
  AnimatePresence,
  Image,
  SizableText,
  XStack,
} from '@onekeyhq/components';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import {
  ESwapDirectionType,
  ESwapTabSwitchType,
} from '@onekeyhq/shared/types/swap/types';

import {
  useSwapNetworksIncludeAllNetwork,
  useSwapSelectFromToken,
  useSwapSelectToToken,
} from '../../hooks/useSwapData';

interface ISwapAccountAddressContainerProps {
  direction: ESwapDirectionType;
  type: ESwapTabSwitchType;
  onClickNetwork?: (type: ESwapDirectionType) => void;
}
const SwapAccountAddressContainer = ({
  direction,
  type,
  onClickNetwork,
}: ISwapAccountAddressContainerProps) => {
  const intl = useIntl();
  const fromToken = useSwapSelectFromToken(type);
  const swapSupportAllNetwork = useSwapNetworksIncludeAllNetwork(type);
  const toToken = useSwapSelectToToken(type);

  const networkComponent = useMemo(() => {
    const networkInfo = swapSupportAllNetwork.find(
      (net) =>
        net.networkId ===
        (direction === ESwapDirectionType.FROM
          ? fromToken?.networkId
          : toToken?.networkId),
    );

    return (
      <AnimatePresence>
        {type === ESwapTabSwitchType.BRIDGE && networkInfo ? (
          <XStack
            key="network-component"
            animation="quick"
            enterStyle={{
              opacity: 0,
              x: 8,
            }}
            exitStyle={{
              opacity: 0,
              x: 4,
            }}
            gap="$1"
            alignItems="center"
            cursor="pointer"
            onPress={() => {
              onClickNetwork?.(direction);
            }}
          >
            <Image w={18} h={18} source={{ uri: networkInfo.logoURI }} />
            <SizableText size="$bodyMd" color="$text">
              {networkInfo.name}
            </SizableText>
          </XStack>
        ) : null}
      </AnimatePresence>
    );
  }, [
    swapSupportAllNetwork,
    type,
    direction,
    fromToken?.networkId,
    toToken?.networkId,
    onClickNetwork,
  ]);

  return (
    <XStack pb="$2">
      <SizableText
        size="$bodyMd"
        mr="$2"
        userSelect="none"
        color="$textSubdued"
      >
        {intl.formatMessage({
          id:
            direction === ESwapDirectionType.FROM
              ? ETranslations.swap_page_from
              : ETranslations.swap_page_to,
        })}
      </SizableText>
      {networkComponent}
    </XStack>
  );
};

export default SwapAccountAddressContainer;
