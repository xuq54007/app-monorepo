import { useEffect, useMemo, useRef } from 'react';

import { EPageType, ScrollView, YStack } from '@onekeyhq/components';
import { useSwapActions } from '@onekeyhq/kit/src/states/jotai/contexts/swap';
import { EJotaiContextStoreNames } from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import platformEnv from '@onekeyhq/shared/src/platformEnv';
import type { ISwapInitParams } from '@onekeyhq/shared/types/swap/types';
import {
  ESwapDirectionType,
  ESwapTabSwitchType,
} from '@onekeyhq/shared/types/swap/types';

import { useSwapAddressInfo } from '../../hooks/useSwapAccount';
import { SwapProviderMirror } from '../SwapProviderMirror';

import SwapActionsState from './SwapActionsState';
import SwapHeaderContainer from './SwapHeaderContainer';
import SwapMainLandContent from './SwapMainLandContent';

interface ISwapMainLoadProps {
  children?: React.ReactNode;
  swapInitParams?: ISwapInitParams;
  pageType?: EPageType.modal;
  defaultSwapType?: ESwapTabSwitchType;
}

const SwapMainLand = ({
  swapInitParams,
  pageType,
  defaultSwapType,
}: ISwapMainLoadProps) => {
  console.log('swap__InitParams--', swapInitParams);

  const { swapTypeSwitchAction } = useSwapActions().current;
  const { networkId } = useSwapAddressInfo(ESwapDirectionType.FROM);
  // const headerRight = useCallback(() => <SwapHeaderRightActionContainer />, []);
  const networkIdRef = useRef(networkId);
  if (networkIdRef.current !== networkId) {
    networkIdRef.current = networkId;
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

  const swapPage = useMemo(
    // eslint-disable-next-line react/no-unstable-nested-components, react/display-name
    () => () =>
      (
        <SwapMainLandContent
          swapTabType={ESwapTabSwitchType.SWAP}
          swapInitParams={swapInitParams}
          pageType={pageType}
        />
      ),
    [swapInitParams, pageType],
  );

  const bridgePage = useMemo(
    // eslint-disable-next-line react/no-unstable-nested-components, react/display-name
    () => () =>
      (
        <SwapMainLandContent
          swapTabType={ESwapTabSwitchType.BRIDGE}
          swapInitParams={swapInitParams}
          pageType={pageType}
        />
      ),
    [pageType, swapInitParams],
  );

  return (
    <ScrollView>
      <YStack
        testID="swap-content-container"
        flex={1}
        marginHorizontal="auto"
        width="100%"
        maxWidth={pageType === EPageType.modal ? '100%' : 480}
      >
        <SwapHeaderContainer
          defaultSwapType={swapInitParams?.swapTabSwitchType}
          swapPage={swapPage}
          bridgePage={bridgePage}
        />
        <SwapActionsState />
      </YStack>
    </ScrollView>
  );
};

const SwapMainLandWithPageType = (props: ISwapMainLoadProps) => (
  <SwapProviderMirror
    storeName={
      props?.pageType === EPageType.modal
        ? EJotaiContextStoreNames.swapModal
        : EJotaiContextStoreNames.swap
    }
  >
    <SwapMainLand {...props} />
  </SwapProviderMirror>
);

export default SwapMainLandWithPageType;
