import { useMemo } from 'react';

import { EPageType, ScrollView, YStack } from '@onekeyhq/components';
import { EJotaiContextStoreNames } from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import type { ISwapInitParams } from '@onekeyhq/shared/types/swap/types';
import { ESwapTabSwitchType } from '@onekeyhq/shared/types/swap/types';

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

const SwapMainLand = ({ swapInitParams, pageType }: ISwapMainLoadProps) => {
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
