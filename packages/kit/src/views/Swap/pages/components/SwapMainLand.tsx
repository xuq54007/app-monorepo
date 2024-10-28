import { useCallback } from 'react';

import { EPageType, ScrollView, YStack } from '@onekeyhq/components';
import { useSwapTypeSwitchAtom } from '@onekeyhq/kit/src/states/jotai/contexts/swap';
import { EJotaiContextStoreNames } from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import { swapApproveResetValue } from '@onekeyhq/shared/types/swap/SwapProvider.constants';
import type { ISwapInitParams } from '@onekeyhq/shared/types/swap/types';
import { ESwapTabSwitchType } from '@onekeyhq/shared/types/swap/types';

import { useSwapBuildTx } from '../../hooks/useSwapBuiltTx';
import { SwapProviderMirror } from '../SwapProviderMirror';

import SwapActionsState from './SwapActionsState';
import SwapHeaderContainer from './SwapHeaderContainer';
import SwapMainLandContent from './SwapMainLandContent';

interface ISwapMainLoadProps {
  children?: React.ReactNode;
  swapInitParams?: ISwapInitParams;
  pageType?: EPageType.modal;
}

const SwapMainLand = ({ swapInitParams, pageType }: ISwapMainLoadProps) => {
  const [swapType] = useSwapTypeSwitchAtom();
  const { buildTx, approveTx, wrappedTx } = useSwapBuildTx(swapType);

  const onBuildTx = useCallback(async () => {
    await buildTx();
  }, [buildTx]);

  const onApprove = useCallback(
    async (amount: string, isMax?: boolean, shoutResetApprove?: boolean) => {
      if (shoutResetApprove) {
        await approveTx(swapApproveResetValue, isMax, amount);
      } else {
        await approveTx(amount, isMax);
      }
    },
    [approveTx],
  );

  const onWrapped = useCallback(async () => {
    await wrappedTx();
  }, [wrappedTx]);

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
          swapPage={
            <SwapMainLandContent
              swapTabType={ESwapTabSwitchType.SWAP}
              swapInitParams={swapInitParams}
              pageType={pageType}
            />
          }
          bridgePage={
            <SwapMainLandContent
              swapTabType={ESwapTabSwitchType.BRIDGE}
              swapInitParams={swapInitParams}
              pageType={pageType}
            />
          }
        />
        <SwapActionsState
          onBuildTx={onBuildTx}
          onApprove={onApprove}
          onWrapped={onWrapped}
        />
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
