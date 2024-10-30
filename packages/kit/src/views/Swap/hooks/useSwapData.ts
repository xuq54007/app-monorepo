import { useMemo } from 'react';

import BigNumber from 'bignumber.js';
import { isNil } from 'lodash';

import { getNetworkIdsMap } from '@onekeyhq/shared/src/config/networkIds';
import { dangerAllNetworkRepresent } from '@onekeyhq/shared/src/config/presetNetworks';
import {
  ESwapProviderSort,
  swapSlippageAutoValue,
} from '@onekeyhq/shared/types/swap/SwapProvider.constants';
import type {
  IFetchQuoteResult,
  ISwapAlertState,
  ISwapToken,
} from '@onekeyhq/shared/types/swap/types';
import {
  ESwapSlippageSegmentKey,
  ESwapTabSwitchType,
} from '@onekeyhq/shared/types/swap/types';

import {
  useBridgeRateDifferenceAtom,
  useSwapBridgeAlertsAtom,
  useSwapBridgeApproveAllowanceSelectOpenAtom,
  useSwapBridgeBuildTxFetchingAtom,
  useSwapBridgeFromTokenAmountAtom,
  useSwapBridgeManualSelectQuoteProvidersAtom,
  useSwapBridgeProviderSortAtom,
  useSwapBridgeQuoteActionLockAtom,
  useSwapBridgeQuoteApproveAllowanceUnLimitAtom,
  useSwapBridgeQuoteEventTotalCountAtom,
  useSwapBridgeQuoteFetchingAtom,
  useSwapBridgeQuoteIntervalCountAtom,
  useSwapBridgeQuoteListAtom,
  useSwapBridgeSelectFromTokenAtom,
  useSwapBridgeSelectToTokenAtom,
  useSwapBridgeSelectTokenDetailFetchingAtom,
  useSwapBridgeSelectedFromTokenBalanceAtom,
  useSwapBridgeSelectedToTokenBalanceAtom,
  useSwapBridgeShouldRefreshQuoteAtom,
  useSwapBridgeSilenceQuoteLoading,
  useSwapBridgeSlippageDialogOpeningAtom,
  useSwapBridgeSlippagePercentageCustomValueAtom,
  useSwapBridgeSlippagePercentageModeAtom,
  useSwapNetworksAtom,
  useSwapRateDifferenceAtom,
  useSwapSwapAlertsAtom,
  useSwapSwapApproveAllowanceSelectOpenAtom,
  useSwapSwapBuildTxFetchingAtom,
  useSwapSwapFromTokenAmountAtom,
  useSwapSwapManualSelectQuoteProvidersAtom,
  useSwapSwapProviderSortAtom,
  useSwapSwapQuoteActionLockAtom,
  useSwapSwapQuoteApproveAllowanceUnLimitAtom,
  useSwapSwapQuoteEventTotalCountAtom,
  useSwapSwapQuoteFetchingAtom,
  useSwapSwapQuoteIntervalCountAtom,
  useSwapSwapQuoteListAtom,
  useSwapSwapSelectFromTokenAtom,
  useSwapSwapSelectToTokenAtom,
  useSwapSwapSelectTokenDetailFetchingAtom,
  useSwapSwapSelectedFromTokenBalanceAtom,
  useSwapSwapSelectedToTokenBalanceAtom,
  useSwapSwapShouldRefreshQuoteAtom,
  useSwapSwapSilenceQuoteLoading,
  useSwapSwapSlippageDialogOpeningAtom,
  useSwapSwapSlippagePercentageCustomValueAtom,
  useSwapSwapSlippagePercentageModeAtom,
} from '../../../states/jotai/contexts/swap';

export function useSwapAlerts(type: ESwapTabSwitchType) {
  let alert: {
    states: ISwapAlertState[];
    quoteId: string;
  } = { states: [], quoteId: '' };
  const [swapAlerts] = useSwapSwapAlertsAtom();
  const [bridgeAlerts] = useSwapBridgeAlertsAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    alert = swapAlerts;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    alert = bridgeAlerts;
  }
  return alert;
}

export function useSwapFromTokenAmount(type: ESwapTabSwitchType) {
  let amount = '';
  const [swapAmount] = useSwapSwapFromTokenAmountAtom();
  const [bridgeAmount] = useSwapBridgeFromTokenAmountAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    amount = swapAmount;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    amount = bridgeAmount;
  }
  return amount;
}
export function useSwapSelectFromToken(type: ESwapTabSwitchType) {
  let fromToken: ISwapToken | undefined;
  const [swapFromToken] = useSwapSwapSelectFromTokenAtom();
  const [bridgeFromToken] = useSwapBridgeSelectFromTokenAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    fromToken = swapFromToken;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    fromToken = bridgeFromToken;
  }
  return fromToken;
}
export function useSwapSelectToToken(type: ESwapTabSwitchType) {
  let toToken: ISwapToken | undefined;
  const [swapToToken] = useSwapSwapSelectToTokenAtom();
  const [bridgeToToken] = useSwapBridgeSelectToTokenAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    toToken = swapToToken;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    toToken = bridgeToToken;
  }
  return toToken;
}

export function useSwapSortType(type: ESwapTabSwitchType) {
  let sortType = ESwapProviderSort.RECOMMENDED;
  const [swapSortType] = useSwapSwapProviderSortAtom();
  const [bridgeSortType] = useSwapBridgeProviderSortAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    sortType = swapSortType;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    sortType = bridgeSortType;
  }
  return sortType;
}

export function useSwapQuoteList(type: ESwapTabSwitchType) {
  let list: IFetchQuoteResult[] = [];
  const [bridgeList] = useSwapBridgeQuoteListAtom();
  const [swapList] = useSwapSwapQuoteListAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    list = swapList;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    list = bridgeList;
  }
  return list;
}

export function useSwapManualSelectQuoteProvider(type: ESwapTabSwitchType) {
  let manualSelectQuoteProviders: IFetchQuoteResult | undefined;
  const [swapManualSelect] = useSwapSwapManualSelectQuoteProvidersAtom();
  const [bridgeManualSelect] = useSwapBridgeManualSelectQuoteProvidersAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    manualSelectQuoteProviders = swapManualSelect;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    manualSelectQuoteProviders = bridgeManualSelect;
  }
  return manualSelectQuoteProviders;
}

export function useSwapSortedQuoteList(type: ESwapTabSwitchType) {
  const list = useSwapQuoteList(type);
  const fromTokenAmount = useSwapFromTokenAmount(type);
  const sortType = useSwapSortType(type);
  const fromTokenAmountBN = new BigNumber(fromTokenAmount);
  const resetList: IFetchQuoteResult[] = list.map(
    (item: IFetchQuoteResult) => ({
      ...item,
      receivedBest: false,
      isBest: false,
      minGasCost: false,
    }),
  );
  let sortedList = [...resetList];
  const gasFeeSorted = resetList.slice().sort((a, b) => {
    const aBig = new BigNumber(a.fee?.estimatedFeeFiatValue || Infinity);
    const bBig = new BigNumber(b.fee?.estimatedFeeFiatValue || Infinity);
    return aBig.comparedTo(bBig);
  });
  if (sortType === ESwapProviderSort.GAS_FEE) {
    sortedList = [...gasFeeSorted];
  }
  if (sortType === ESwapProviderSort.SWAP_DURATION) {
    sortedList = resetList.slice().sort((a, b) => {
      const aVal = new BigNumber(a.estimatedTime || Infinity);
      const bVal = new BigNumber(b.estimatedTime || Infinity);
      return aVal.comparedTo(bVal);
    });
  }
  const receivedSorted = resetList.slice().sort((a, b) => {
    const aVal = new BigNumber(a.toAmount || 0);
    const bVal = new BigNumber(b.toAmount || 0);
    // Check if limit exists for a and b
    const aHasLimit = !!a.limit;
    const bHasLimit = !!b.limit;

    if (aVal.isZero() && bVal.isZero() && aHasLimit && !bHasLimit) {
      return -1;
    }

    if (aVal.isZero() && bVal.isZero() && bHasLimit && !aHasLimit) {
      return 1;
    }

    if (
      aVal.isZero() ||
      aVal.isNaN() ||
      fromTokenAmountBN.lt(new BigNumber(a.limit?.min || 0)) ||
      fromTokenAmountBN.gt(new BigNumber(a.limit?.max || Infinity))
    ) {
      return 1;
    }
    if (
      bVal.isZero() ||
      bVal.isNaN() ||
      fromTokenAmountBN.lt(new BigNumber(b.limit?.min || 0)) ||
      fromTokenAmountBN.gt(new BigNumber(b.limit?.max || Infinity))
    ) {
      return -1;
    }
    return bVal.comparedTo(aVal);
  });
  if (
    sortType === ESwapProviderSort.RECOMMENDED ||
    sortType === ESwapProviderSort.RECEIVED
  ) {
    sortedList = [...receivedSorted];
  }
  return sortedList.map((p) => {
    if (
      p.info.provider === receivedSorted?.[0]?.info?.provider &&
      p.info.providerName === receivedSorted?.[0]?.info?.providerName &&
      p.toAmount
    ) {
      p.receivedBest = true;
      p.isBest = true;
    }
    if (
      p.info.provider === gasFeeSorted?.[0]?.info?.provider &&
      p.info.providerName === gasFeeSorted?.[0]?.info?.providerName &&
      p.toAmount
    ) {
      p.minGasCost = true;
    }
    return p;
  });
}

export function useSwapQuoteCurrentSelect(type: ESwapTabSwitchType) {
  let res: IFetchQuoteResult | undefined;
  const list = useSwapSortedQuoteList(type);
  const manualSelectQuoteProvider = useSwapManualSelectQuoteProvider(type);
  const manualSelectQuoteResult = list.find(
    (item) =>
      item.info.provider === manualSelectQuoteProvider?.info.provider &&
      item.info.providerName === manualSelectQuoteProvider?.info.providerName,
  );
  if (manualSelectQuoteProvider && manualSelectQuoteResult?.toAmount) {
    res = list.find(
      (item) =>
        item.info.provider === manualSelectQuoteProvider.info.provider &&
        item.info.providerName === manualSelectQuoteProvider.info.providerName,
    );
  }
  if (list?.length > 0) {
    res = list[0];
  }
  return res;
}

export function useSwapQuoteFetching(type: ESwapTabSwitchType) {
  let quoteLoading = false;
  const [swapQuoteLoading] = useSwapSwapQuoteFetchingAtom();
  const [bridgeQuoteLoading] = useSwapBridgeQuoteFetchingAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    quoteLoading = swapQuoteLoading;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    quoteLoading = bridgeQuoteLoading;
  }
  return quoteLoading;
}

export function useSwapSilenceQuoteLoading(type: ESwapTabSwitchType) {
  let silenceQuoteLoading = false;
  const [swapSilenceQuoteLoading] = useSwapSwapSilenceQuoteLoading();
  const [bridgeSilenceQuoteLoading] = useSwapBridgeSilenceQuoteLoading();
  if (type === ESwapTabSwitchType.SWAP) {
    silenceQuoteLoading = swapSilenceQuoteLoading;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    silenceQuoteLoading = bridgeSilenceQuoteLoading;
  }
  return silenceQuoteLoading;
}

export function useSwapQuoteEventTotalCount(type: ESwapTabSwitchType) {
  let quoteEventTotalCount = 0;
  const [swapEventTotalCount] = useSwapSwapQuoteEventTotalCountAtom();
  const [bridgeEventTotalCount] = useSwapBridgeQuoteEventTotalCountAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    quoteEventTotalCount = swapEventTotalCount;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    quoteEventTotalCount = bridgeEventTotalCount;
  }
  return quoteEventTotalCount;
}

export function useSwapQuoteLoading(type: ESwapTabSwitchType) {
  const quoteFetching = useSwapQuoteFetching(type);
  const silenceQuoteLoading = useSwapSilenceQuoteLoading(type);
  return quoteFetching || silenceQuoteLoading;
}

export function useSwapQuoteEventFetching(type: ESwapTabSwitchType) {
  const quoteEventTotalCount = useSwapQuoteEventTotalCount(type);
  const quoteResult = useSwapQuoteList(type);
  return quoteEventTotalCount > 0 && quoteResult.length < quoteEventTotalCount;
}

export function useSwapSelectTokenDetailFetching(type: ESwapTabSwitchType) {
  let tokenDetailFetching = { from: false, to: false };
  const [swapFetching] = useSwapSwapSelectTokenDetailFetchingAtom();
  const [bridgeFetching] = useSwapBridgeSelectTokenDetailFetchingAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    tokenDetailFetching = swapFetching;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    tokenDetailFetching = bridgeFetching;
  }
  return tokenDetailFetching;
}

export function useSwapTokenMetadata(type: ESwapTabSwitchType) {
  const quoteList = useSwapQuoteList(type);
  const swapTokenMetadata = quoteList.find(
    (item) => item.tokenMetadata,
  )?.tokenMetadata;
  return {
    swapTokenMetadata,
  };
}

export function useSwapProviderSupportReceiveAddress(type: ESwapTabSwitchType) {
  const quoteResult = useSwapQuoteCurrentSelect(type);
  if (!quoteResult) {
    return true;
  }
  return (
    !quoteResult.unSupportReceiveAddressDifferent && !quoteResult.isWrapped
  );
}

export function useSwapSlippagePercentageMode(type: ESwapTabSwitchType) {
  let mode: ESwapSlippageSegmentKey = ESwapSlippageSegmentKey.AUTO;
  const [swapSlippagePercentageMode] = useSwapSwapSlippagePercentageModeAtom();
  const [bridgeSlippagePercentageMode] =
    useSwapBridgeSlippagePercentageModeAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    mode = swapSlippagePercentageMode;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    mode = bridgeSlippagePercentageMode;
  }
  return mode;
}

export function useSwapSlippagePercentageCustomValue(type: ESwapTabSwitchType) {
  let customValue = swapSlippageAutoValue;
  const [swapSlippagePercentageMode] =
    useSwapSwapSlippagePercentageCustomValueAtom();
  const [bridgeSlippagePercentageMode] =
    useSwapBridgeSlippagePercentageCustomValueAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    customValue = swapSlippagePercentageMode;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    customValue = bridgeSlippagePercentageMode;
  }
  return customValue;
}

export function useSwapSlippagePercentage(type: ESwapTabSwitchType) {
  const mode = useSwapSlippagePercentageMode(type);
  const quoteResult = useSwapQuoteCurrentSelect(type);
  const customValue = useSwapSlippagePercentageCustomValue(type);
  let autoValue = swapSlippageAutoValue;
  let value = swapSlippageAutoValue;
  if (!isNil(quoteResult?.autoSuggestedSlippage)) {
    autoValue = quoteResult.autoSuggestedSlippage;
  }
  if (mode === ESwapSlippageSegmentKey.AUTO) {
    value = autoValue;
  } else {
    value = customValue;
  }
  return {
    slippageItem: {
      key: mode,
      value,
    },
    autoValue,
  };
}

export function useSwapSlippageDialogOpening(type: ESwapTabSwitchType) {
  let res: { status: boolean; flag?: string } = { status: false };
  const [swapSlippageDialogOpening] = useSwapSwapSlippageDialogOpeningAtom();
  const [bridgeSlippageDialogOpening] =
    useSwapBridgeSlippageDialogOpeningAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    res = swapSlippageDialogOpening;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    res = bridgeSlippageDialogOpening;
  }
  return res;
}

export function useSwapSelectedFromTokenBalance(type: ESwapTabSwitchType) {
  let balance = '';
  const [swapFromBalance] = useSwapSwapSelectedFromTokenBalanceAtom();
  const [bridgeFromBalance] = useSwapBridgeSelectedFromTokenBalanceAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    balance = swapFromBalance;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    balance = bridgeFromBalance;
  }
  return balance;
}
export function useSwapSelectedToTokenBalance(type: ESwapTabSwitchType) {
  let balance = '';
  const [swapToBalance] = useSwapSwapSelectedToTokenBalanceAtom();
  const [bridgeToBalance] = useSwapBridgeSelectedToTokenBalanceAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    balance = swapToBalance;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    balance = bridgeToBalance;
  }
  return balance;
}

export function useSwapNetworksIncludeAllNetwork(type: ESwapTabSwitchType) {
  const [networks] = useSwapNetworksAtom();
  const typeNetworks = useMemo(
    () =>
      networks.filter((net) =>
        type === ESwapTabSwitchType.BRIDGE
          ? net.supportCrossChainSwap
          : net.supportSingleSwap,
      ),
    [networks, type],
  );
  const allNetwork = useMemo(
    () => ({
      networkId: getNetworkIdsMap().onekeyall,
      name: dangerAllNetworkRepresent.name,
      symbol: dangerAllNetworkRepresent.symbol,
      logoURI: dangerAllNetworkRepresent.logoURI,
      shortcode: dangerAllNetworkRepresent.shortcode,
      isAllNetworks: true,
    }),
    [],
  );

  return useMemo(
    () => [allNetwork, ...typeNetworks],
    [allNetwork, typeNetworks],
  );
}

export function useRateDifference(type: ESwapTabSwitchType) {
  let rateDifference;
  const [swapRateDifference] = useSwapRateDifferenceAtom();
  const [bridgeRateDifference] = useBridgeRateDifferenceAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    rateDifference = swapRateDifference;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    rateDifference = bridgeRateDifference;
  }
  return rateDifference;
}

export function useSwapQuoteApproveAllowanceUnLimit(type: ESwapTabSwitchType) {
  let unLimit = false;
  const [swapQuoteApproveAllowanceUnLimit] =
    useSwapSwapQuoteApproveAllowanceUnLimitAtom();
  const [bridgeQuoteApproveAllowanceUnLimit] =
    useSwapBridgeQuoteApproveAllowanceUnLimitAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    unLimit = swapQuoteApproveAllowanceUnLimit;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    unLimit = bridgeQuoteApproveAllowanceUnLimit;
  }
  return unLimit;
}

export function useSwapApproveAllowanceSelectOpen(type: ESwapTabSwitchType) {
  let open = false;
  const [swapApproveAllowanceSelectOpen] =
    useSwapSwapApproveAllowanceSelectOpenAtom();
  const [bridgeApproveAllowanceSelectOpen] =
    useSwapBridgeApproveAllowanceSelectOpenAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    open = swapApproveAllowanceSelectOpen;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    open = bridgeApproveAllowanceSelectOpen;
  }
  return open;
}

export function useSwapQuoteActionLock(swapType: ESwapTabSwitchType) {
  let res: {
    actionLock: boolean;
    fromToken?: ISwapToken;
    toToken?: ISwapToken;
    fromTokenAmount?: string;
    accountId?: string;
    address?: string;
  } = { actionLock: false };
  const [swapQuoteActionLock] = useSwapSwapQuoteActionLockAtom();
  const [bridgeQuoteActionLock] = useSwapBridgeQuoteActionLockAtom();
  if (swapType === ESwapTabSwitchType.SWAP) {
    res = swapQuoteActionLock;
  }
  if (swapType === ESwapTabSwitchType.BRIDGE) {
    res = bridgeQuoteActionLock;
  }
  return res;
}

export function useSwapShouldRefreshQuote(type: ESwapTabSwitchType) {
  const [swapShouldRefresh] = useSwapSwapShouldRefreshQuoteAtom();
  const [bridgeShouldRefresh] = useSwapBridgeShouldRefreshQuoteAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    return swapShouldRefresh;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    return bridgeShouldRefresh;
  }
  return false;
}

export function useSwapBuildTxFetching(type: ESwapTabSwitchType) {
  const [swapBuildTxFetching] = useSwapSwapBuildTxFetchingAtom();
  const [bridgeBuildTxFetching] = useSwapBridgeBuildTxFetchingAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    return swapBuildTxFetching;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    return bridgeBuildTxFetching;
  }
  return false;
}

export function useSwapQuoteIntervalCount(type: ESwapTabSwitchType) {
  const [swapQuoteIntervalCount] = useSwapSwapQuoteIntervalCountAtom();
  const [bridgeQuoteIntervalCount] = useSwapBridgeQuoteIntervalCountAtom();
  if (type === ESwapTabSwitchType.SWAP) {
    return swapQuoteIntervalCount;
  }
  if (type === ESwapTabSwitchType.BRIDGE) {
    return bridgeQuoteIntervalCount;
  }
  return 0;
}
