import { memo, useCallback, useEffect, useRef } from 'react';

import { useIntl } from 'react-intl';

import { Tab, XStack } from '@onekeyhq/components';
import {
  useSwapActions,
  useSwapTypeSwitchAtom,
} from '@onekeyhq/kit/src/states/jotai/contexts/swap';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import platformEnv from '@onekeyhq/shared/src/platformEnv';
import {
  ESwapDirectionType,
  ESwapTabSwitchType,
} from '@onekeyhq/shared/types/swap/types';

import { useSwapAddressInfo } from '../../hooks/useSwapAccount';
import { useSwapSelectFromToken } from '../../hooks/useSwapData';

import SwapHeaderRightActionContainer from './SwapHeaderRightActionContainer';

interface ISwapHeaderContainerProps {
  defaultSwapType?: ESwapTabSwitchType;
  swapPage: React.ReactNode;
  bridgePage: React.ReactNode;
}

const SwapHeaderContainer = ({
  defaultSwapType,
  swapPage,
  bridgePage,
}: ISwapHeaderContainerProps) => {
  const intl = useIntl();
  const [swapTypeSwitch] = useSwapTypeSwitchAtom();
  const { swapTypeSwitchAction } = useSwapActions().current;
  const { networkId } = useSwapAddressInfo(ESwapDirectionType.FROM);
  const fromToken = useSwapSelectFromToken(swapTypeSwitch);
  const headerRight = useCallback(() => <SwapHeaderRightActionContainer />, []);
  const networkIdRef = useRef(networkId);
  if (networkIdRef.current !== networkId) {
    networkIdRef.current = networkId;
  }
  if (networkIdRef.current !== fromToken?.networkId) {
    networkIdRef.current = fromToken?.networkId;
  }
  useEffect(() => {
    if (defaultSwapType) {
      // Avoid switching the default toToken before it has been loaded,
      // resulting in the default network toToken across chains
      setTimeout(
        () => {
          void swapTypeSwitchAction(defaultSwapType, networkIdRef.current);
        },
        platformEnv.isExtension ? 100 : 10,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <XStack justifyContent="space-between">
      <Tab.Header
        style={{
          height: '$8',
          borderBottomWidth: 0,
        }}
        data={[
          {
            title: intl.formatMessage({ id: ETranslations.swap_page_swap }),
            page: swapPage,
          },
          {
            title: intl.formatMessage({ id: ETranslations.swap_page_bridge }),
            page: bridgePage,
          },
        ]}
        itemContainerStyle={{
          px: '$2.5',
          mr: '$3',
          cursor: 'default',
        }}
        itemTitleNormalStyle={{
          color: '$textSubdued',
          fontWeight: '600',
        }}
        itemTitleSelectedStyle={{ color: '$text' }}
        cursorStyle={{
          height: '100%',
          bg: '$bgStrong',
          borderRadius: '$3',
          borderCurve: 'continuous',
        }}
        onSelectedPageIndex={(index: number) => {
          void swapTypeSwitchAction(
            index === 0 ? ESwapTabSwitchType.SWAP : ESwapTabSwitchType.BRIDGE,
            networkId,
          );
        }}
      />
      {headerRight()}
    </XStack>
  );
};

export default memo(SwapHeaderContainer);
