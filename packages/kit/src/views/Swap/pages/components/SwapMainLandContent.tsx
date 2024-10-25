import { useCallback } from 'react';

import type { IPageNavigationProp } from '@onekeyhq/components';
import { EPageType, YStack } from '@onekeyhq/components';
import useAppNavigation from '@onekeyhq/kit/src/hooks/useAppNavigation';
import {
  useSwapActions,
  useSwapQuoteCurrentSelectAtom,
} from '@onekeyhq/kit/src/states/jotai/contexts/swap';
import {
  EJotaiContextStoreNames,
  useInAppNotificationAtom,
} from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import { EModalRoutes } from '@onekeyhq/shared/src/routes';
import {
  EModalSwapRoutes,
  type IModalSwapParamList,
} from '@onekeyhq/shared/src/routes/swap';
import type {
  ESwapTabSwitchType,
  ISwapInitParams,
  ISwapToken,
} from '@onekeyhq/shared/types/swap/types';
import { ESwapDirectionType } from '@onekeyhq/shared/types/swap/types';

import SwapRecentTokenPairsGroup from '../../components/SwapRecentTokenPairsGroup';
import { useSwapAddressInfo } from '../../hooks/useSwapAccount';
import {
  useSwapAlerts,
  useSwapFromTokenAmount,
  useSwapQuoteCurrentSelect,
  useSwapQuoteEventFetching,
  useSwapQuoteLoading,
  useSwapSelectTokenDetailFetching,
} from '../../hooks/useSwapData';
import { useSwapInit } from '../../hooks/useSwapTokens';

import SwapAlertContainer from './SwapAlertContainer';
import SwapQuoteInput from './SwapQuoteInput';
import SwapQuoteResult from './SwapQuoteResult';

interface ISwapMainLandContentProps {
  swapInitParams?: ISwapInitParams;
  pageType?: EPageType.modal;
  swapTabType: ESwapTabSwitchType;
}

const SwapMainLandContent = ({
  swapInitParams,
  pageType,
  swapTabType,
}: ISwapMainLandContentProps) => {
  const { fetchLoading } = useSwapInit(swapInitParams);
  const navigation =
    useAppNavigation<IPageNavigationProp<IModalSwapParamList>>();
  const quoteResult = useSwapQuoteCurrentSelect(swapTabType);
  const alerts = useSwapAlerts(swapTabType);
  const toAddressInfo = useSwapAddressInfo(ESwapDirectionType.TO);
  const quoteLoading = useSwapQuoteLoading(swapTabType);
  const quoteEventFetching = useSwapQuoteEventFetching(swapTabType);
  const [{ swapRecentTokenPairs }] = useInAppNotificationAtom();
  const fromTokenAmount = useSwapFromTokenAmount(swapTabType);
  const selectTokenDetailLoading =
    useSwapSelectTokenDetailFetching(swapTabType);
  const { selectFromToken, selectToToken } = useSwapActions().current;
  const onSelectToken = useCallback(
    (type: ESwapDirectionType) => {
      navigation.pushModal(EModalRoutes.SwapModal, {
        screen: EModalSwapRoutes.SwapTokenSelect,
        params: {
          type,
          storeName:
            pageType === EPageType.modal
              ? EJotaiContextStoreNames.swapModal
              : EJotaiContextStoreNames.swap,
        },
      });
    },
    [navigation, pageType],
  );
  const onSelectRecentTokenPairs = useCallback(
    ({
      fromToken,
      toToken,
    }: {
      fromToken: ISwapToken;
      toToken: ISwapToken;
    }) => {
      void selectFromToken(fromToken, true);
      void selectToToken(toToken);
    },
    [selectFromToken, selectToToken],
  );
  const onOpenProviderList = useCallback(() => {
    navigation.pushModal(EModalRoutes.SwapModal, {
      screen: EModalSwapRoutes.SwapProviderSelect,
      params: {
        storeName:
          pageType === EPageType.modal
            ? EJotaiContextStoreNames.swapModal
            : EJotaiContextStoreNames.swap,
      },
    });
  }, [navigation, pageType]);

  const onToAnotherAddressModal = useCallback(() => {
    navigation.pushModal(EModalRoutes.SwapModal, {
      screen: EModalSwapRoutes.SwapToAnotherAddress,
      params: {
        address: toAddressInfo.address,
        storeName:
          pageType === EPageType.modal
            ? EJotaiContextStoreNames.swapModal
            : EJotaiContextStoreNames.swap,
      },
    });
  }, [navigation, pageType, toAddressInfo.address]);

  return (
    <YStack
      pt="$2.5"
      px="$5"
      pb="$5"
      gap="$5"
      flex={1}
      $gtMd={{
        flex: 'unset',
        pt: pageType === EPageType.modal ? '$2.5' : '$5',
      }}
    >
      <SwapQuoteInput
        onSelectToken={onSelectToken}
        selectLoading={fetchLoading}
        swapTabType={swapTabType}
      />
      <SwapQuoteResult
        onOpenProviderList={onOpenProviderList}
        quoteResult={quoteResult}
        onOpenRecipient={onToAnotherAddressModal}
        swapTabType={swapTabType}
      />
      {alerts.states.length > 0 &&
      !quoteLoading &&
      !quoteEventFetching &&
      alerts.quoteId === (quoteResult?.quoteId ?? '') ? (
        <SwapAlertContainer
          alerts={alerts.states}
          selectTokenDetailLoading={selectTokenDetailLoading}
        />
      ) : null}
      <SwapRecentTokenPairsGroup
        onSelectTokenPairs={onSelectRecentTokenPairs}
        tokenPairs={swapRecentTokenPairs}
        fromTokenAmount={fromTokenAmount}
        swapTabType={swapTabType}
      />
    </YStack>
  );
};

export default SwapMainLandContent;
