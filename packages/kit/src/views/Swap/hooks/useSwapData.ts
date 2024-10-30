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
  ESwapRateDifferenceUnit,
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
  const [swapAlerts] = useSwapSwapAlertsAtom();
  const [bridgeAlerts] = useSwapBridgeAlertsAtom();
  return useMemo(() => {
    let alert: {
      states: ISwapAlertState[];
      quoteId: string;
    } = { states: [], quoteId: '' };
    if (type === ESwapTabSwitchType.SWAP) {
      alert = swapAlerts;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      alert = bridgeAlerts;
    }
    return alert;
  }, [bridgeAlerts, swapAlerts, type]);
}

export function useSwapFromTokenAmount(type: ESwapTabSwitchType) {
  const [swapAmount] = useSwapSwapFromTokenAmountAtom();
  const [bridgeAmount] = useSwapBridgeFromTokenAmountAtom();
  return useMemo(() => {
    let amount = '';

    if (type === ESwapTabSwitchType.SWAP) {
      amount = swapAmount;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      amount = bridgeAmount;
    }
    return amount;
  }, [bridgeAmount, swapAmount, type]);
}
export function useSwapSelectFromToken(type: ESwapTabSwitchType) {
  const [swapFromToken] = useSwapSwapSelectFromTokenAtom();
  const [bridgeFromToken] = useSwapBridgeSelectFromTokenAtom();
  return useMemo(() => {
    let fromToken: ISwapToken | undefined;
    if (type === ESwapTabSwitchType.SWAP) {
      fromToken = swapFromToken;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      fromToken = bridgeFromToken;
    }
    return fromToken;
  }, [bridgeFromToken, swapFromToken, type]);
}
export function useSwapSelectToToken(type: ESwapTabSwitchType) {
  const [swapToToken] = useSwapSwapSelectToTokenAtom();
  const [bridgeToToken] = useSwapBridgeSelectToTokenAtom();
  return useMemo(() => {
    let toToken: ISwapToken | undefined;

    if (type === ESwapTabSwitchType.SWAP) {
      toToken = swapToToken;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      toToken = bridgeToToken;
    }
    return toToken;
  }, [bridgeToToken, swapToToken, type]);
}

export function useSwapSortType(type: ESwapTabSwitchType) {
  const [swapSortType] = useSwapSwapProviderSortAtom();
  const [bridgeSortType] = useSwapBridgeProviderSortAtom();
  return useMemo(() => {
    let sortType = ESwapProviderSort.RECOMMENDED;
    if (type === ESwapTabSwitchType.SWAP) {
      sortType = swapSortType;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      sortType = bridgeSortType;
    }
    return sortType;
  }, [bridgeSortType, swapSortType, type]);
}

export function useSwapQuoteList(type: ESwapTabSwitchType) {
  const [bridgeList] = useSwapBridgeQuoteListAtom();
  const [swapList] = useSwapSwapQuoteListAtom();
  return useMemo(() => {
    let list: IFetchQuoteResult[] = [];
    if (type === ESwapTabSwitchType.SWAP) {
      list = swapList;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      list = bridgeList;
    }
    return list;
  }, [bridgeList, swapList, type]);
}

export function useSwapManualSelectQuoteProvider(type: ESwapTabSwitchType) {
  const [swapManualSelect] = useSwapSwapManualSelectQuoteProvidersAtom();
  const [bridgeManualSelect] = useSwapBridgeManualSelectQuoteProvidersAtom();
  return useMemo(() => {
    let manualSelectQuoteProviders: IFetchQuoteResult | undefined;
    if (type === ESwapTabSwitchType.SWAP) {
      manualSelectQuoteProviders = swapManualSelect;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      manualSelectQuoteProviders = bridgeManualSelect;
    }
    return manualSelectQuoteProviders;
  }, [bridgeManualSelect, swapManualSelect, type]);
}

export function useSwapSortedQuoteList(type: ESwapTabSwitchType) {
  const list = useSwapQuoteList(type);
  const fromTokenAmount = useSwapFromTokenAmount(type);
  const sortType = useSwapSortType(type);
  const fromTokenAmountBN = new BigNumber(fromTokenAmount);
  const resetList: IFetchQuoteResult[] = useMemo(
    () =>
      list.map((item: IFetchQuoteResult) => ({
        ...item,
        receivedBest: false,
        isBest: false,
        minGasCost: false,
      })),
    [list],
  );
  const gasFeeSorted = resetList.slice().sort((a, b) => {
    const aBig = new BigNumber(a.fee?.estimatedFeeFiatValue || Infinity);
    const bBig = new BigNumber(b.fee?.estimatedFeeFiatValue || Infinity);
    return aBig.comparedTo(bBig);
  });
  let sortedList = [...resetList];
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
  const list = useSwapSortedQuoteList(type);
  const manualSelectQuoteProvider = useSwapManualSelectQuoteProvider(type);
  return useMemo(() => {
    let res: IFetchQuoteResult | undefined;
    const manualSelectQuoteResult = list.find(
      (item) =>
        item.info.provider === manualSelectQuoteProvider?.info.provider &&
        item.info.providerName === manualSelectQuoteProvider?.info.providerName,
    );
    if (manualSelectQuoteProvider && manualSelectQuoteResult?.toAmount) {
      res = list.find(
        (item) =>
          item.info.provider === manualSelectQuoteProvider.info.provider &&
          item.info.providerName ===
            manualSelectQuoteProvider.info.providerName,
      );
    }
    if (list?.length > 0) {
      res = list[0];
    }
    return res;
  }, [list, manualSelectQuoteProvider]);
}

export function useSwapQuoteFetching(type: ESwapTabSwitchType) {
  const [swapQuoteLoading] = useSwapSwapQuoteFetchingAtom();
  const [bridgeQuoteLoading] = useSwapBridgeQuoteFetchingAtom();
  return useMemo(() => {
    let quoteLoading = false;
    if (type === ESwapTabSwitchType.SWAP) {
      quoteLoading = swapQuoteLoading;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      quoteLoading = bridgeQuoteLoading;
    }
    return quoteLoading;
  }, [bridgeQuoteLoading, swapQuoteLoading, type]);
}

export function useSwapSilenceQuoteLoading(type: ESwapTabSwitchType) {
  const [swapSilenceQuoteLoading] = useSwapSwapSilenceQuoteLoading();
  const [bridgeSilenceQuoteLoading] = useSwapBridgeSilenceQuoteLoading();
  return useMemo(() => {
    let silenceQuoteLoading = false;
    if (type === ESwapTabSwitchType.SWAP) {
      silenceQuoteLoading = swapSilenceQuoteLoading;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      silenceQuoteLoading = bridgeSilenceQuoteLoading;
    }
    return silenceQuoteLoading;
  }, [bridgeSilenceQuoteLoading, swapSilenceQuoteLoading, type]);
}

export function useSwapQuoteEventTotalCount(type: ESwapTabSwitchType) {
  const [swapEventTotalCount] = useSwapSwapQuoteEventTotalCountAtom();
  const [bridgeEventTotalCount] = useSwapBridgeQuoteEventTotalCountAtom();
  return useMemo(() => {
    let quoteEventTotalCount = 0;
    if (type === ESwapTabSwitchType.SWAP) {
      quoteEventTotalCount = swapEventTotalCount;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      quoteEventTotalCount = bridgeEventTotalCount;
    }
    return quoteEventTotalCount;
  }, [bridgeEventTotalCount, swapEventTotalCount, type]);
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
  const [swapFetching] = useSwapSwapSelectTokenDetailFetchingAtom();
  const [bridgeFetching] = useSwapBridgeSelectTokenDetailFetchingAtom();
  return useMemo(() => {
    let tokenDetailFetching = { from: false, to: false };
    if (type === ESwapTabSwitchType.SWAP) {
      tokenDetailFetching = swapFetching;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      tokenDetailFetching = bridgeFetching;
    }
    return tokenDetailFetching;
  }, [bridgeFetching, swapFetching, type]);
}

export function useSwapTokenMetadata(type: ESwapTabSwitchType) {
  const quoteList = useSwapQuoteList(type);
  return useMemo(() => {
    const swapTokenMetadata = quoteList.find(
      (item) => item.tokenMetadata,
    )?.tokenMetadata;
    return {
      swapTokenMetadata,
    };
  }, [quoteList]);
}

export function useSwapProviderSupportReceiveAddress(type: ESwapTabSwitchType) {
  const quoteResult = useSwapQuoteCurrentSelect(type);
  return useMemo(() => {
    if (!quoteResult) {
      return true;
    }
    return (
      !quoteResult.unSupportReceiveAddressDifferent && !quoteResult.isWrapped
    );
  }, [quoteResult]);
}

export function useSwapSlippagePercentageMode(type: ESwapTabSwitchType) {
  const [swapSlippagePercentageMode] = useSwapSwapSlippagePercentageModeAtom();
  const [bridgeSlippagePercentageMode] =
    useSwapBridgeSlippagePercentageModeAtom();
  return useMemo(() => {
    let mode: ESwapSlippageSegmentKey = ESwapSlippageSegmentKey.AUTO;
    if (type === ESwapTabSwitchType.SWAP) {
      mode = swapSlippagePercentageMode;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      mode = bridgeSlippagePercentageMode;
    }
    return mode;
  }, [bridgeSlippagePercentageMode, swapSlippagePercentageMode, type]);
}

export function useSwapSlippagePercentageCustomValue(type: ESwapTabSwitchType) {
  const [swapSlippagePercentageMode] =
    useSwapSwapSlippagePercentageCustomValueAtom();
  const [bridgeSlippagePercentageMode] =
    useSwapBridgeSlippagePercentageCustomValueAtom();
  return useMemo(() => {
    let customValue = swapSlippageAutoValue;
    if (type === ESwapTabSwitchType.SWAP) {
      customValue = swapSlippagePercentageMode;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      customValue = bridgeSlippagePercentageMode;
    }
    return customValue;
  }, [bridgeSlippagePercentageMode, swapSlippagePercentageMode, type]);
}

export function useSwapSlippagePercentage(type: ESwapTabSwitchType) {
  const mode = useSwapSlippagePercentageMode(type);
  const quoteResult = useSwapQuoteCurrentSelect(type);
  const customValue = useSwapSlippagePercentageCustomValue(type);
  const autoValue = useMemo(() => {
    if (!isNil(quoteResult?.autoSuggestedSlippage)) {
      return quoteResult.autoSuggestedSlippage;
    }
    return swapSlippageAutoValue;
  }, [quoteResult]);
  const value = useMemo(() => {
    if (mode === ESwapSlippageSegmentKey.AUTO) {
      return autoValue;
    }
    return customValue;
  }, [autoValue, customValue, mode]);
  return useMemo(
    () => ({
      slippageItem: {
        key: mode,
        value,
      },
      autoValue,
    }),
    [autoValue, mode, value],
  );
}

export function useSwapSlippageDialogOpening(type: ESwapTabSwitchType) {
  const [swapSlippageDialogOpening] = useSwapSwapSlippageDialogOpeningAtom();
  const [bridgeSlippageDialogOpening] =
    useSwapBridgeSlippageDialogOpeningAtom();
  return useMemo(() => {
    let res: { status: boolean; flag?: string } = { status: false };
    if (type === ESwapTabSwitchType.SWAP) {
      res = swapSlippageDialogOpening;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      res = bridgeSlippageDialogOpening;
    }
    return res;
  }, [bridgeSlippageDialogOpening, swapSlippageDialogOpening, type]);
}

export function useSwapSelectedFromTokenBalance(type: ESwapTabSwitchType) {
  const [swapFromBalance] = useSwapSwapSelectedFromTokenBalanceAtom();
  const [bridgeFromBalance] = useSwapBridgeSelectedFromTokenBalanceAtom();
  return useMemo(() => {
    let balance = '';
    if (type === ESwapTabSwitchType.SWAP) {
      balance = swapFromBalance;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      balance = bridgeFromBalance;
    }
    return balance;
  }, [bridgeFromBalance, swapFromBalance, type]);
}
export function useSwapSelectedToTokenBalance(type: ESwapTabSwitchType) {
  const [swapToBalance] = useSwapSwapSelectedToTokenBalanceAtom();
  const [bridgeToBalance] = useSwapBridgeSelectedToTokenBalanceAtom();
  return useMemo(() => {
    let balance = '';
    if (type === ESwapTabSwitchType.SWAP) {
      balance = swapToBalance;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      balance = bridgeToBalance;
    }
    return balance;
  }, [bridgeToBalance, swapToBalance, type]);
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
  const [swapRateDifference] = useSwapRateDifferenceAtom();
  const [bridgeRateDifference] = useBridgeRateDifferenceAtom();
  return useMemo(() => {
    let rateDifference:
      | { value: string; unit: ESwapRateDifferenceUnit }
      | undefined;
    if (type === ESwapTabSwitchType.SWAP) {
      rateDifference = swapRateDifference;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      rateDifference = bridgeRateDifference;
    }
    return rateDifference;
  }, [bridgeRateDifference, swapRateDifference, type]);
}

export function useSwapQuoteApproveAllowanceUnLimit(type: ESwapTabSwitchType) {
  const [swapQuoteApproveAllowanceUnLimit] =
    useSwapSwapQuoteApproveAllowanceUnLimitAtom();
  const [bridgeQuoteApproveAllowanceUnLimit] =
    useSwapBridgeQuoteApproveAllowanceUnLimitAtom();
  return useMemo(() => {
    let unLimit = false;
    if (type === ESwapTabSwitchType.SWAP) {
      unLimit = swapQuoteApproveAllowanceUnLimit;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      unLimit = bridgeQuoteApproveAllowanceUnLimit;
    }
    return unLimit;
  }, [
    bridgeQuoteApproveAllowanceUnLimit,
    swapQuoteApproveAllowanceUnLimit,
    type,
  ]);
}

export function useSwapApproveAllowanceSelectOpen(type: ESwapTabSwitchType) {
  const [swapApproveAllowanceSelectOpen] =
    useSwapSwapApproveAllowanceSelectOpenAtom();
  const [bridgeApproveAllowanceSelectOpen] =
    useSwapBridgeApproveAllowanceSelectOpenAtom();
  return useMemo(() => {
    let open = false;

    if (type === ESwapTabSwitchType.SWAP) {
      open = swapApproveAllowanceSelectOpen;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      open = bridgeApproveAllowanceSelectOpen;
    }
    return open;
  }, [bridgeApproveAllowanceSelectOpen, swapApproveAllowanceSelectOpen, type]);
}

export function useSwapQuoteActionLock(swapType: ESwapTabSwitchType) {
  const [swapQuoteActionLock] = useSwapSwapQuoteActionLockAtom();
  const [bridgeQuoteActionLock] = useSwapBridgeQuoteActionLockAtom();
  return useMemo(() => {
    let res: {
      actionLock: boolean;
      fromToken?: ISwapToken;
      toToken?: ISwapToken;
      fromTokenAmount?: string;
      accountId?: string;
      address?: string;
    } = { actionLock: false };
    if (swapType === ESwapTabSwitchType.SWAP) {
      res = swapQuoteActionLock;
    }
    if (swapType === ESwapTabSwitchType.BRIDGE) {
      res = bridgeQuoteActionLock;
    }
    return res;
  }, [bridgeQuoteActionLock, swapQuoteActionLock, swapType]);
}

export function useSwapShouldRefreshQuote(type: ESwapTabSwitchType) {
  const [swapShouldRefresh] = useSwapSwapShouldRefreshQuoteAtom();
  const [bridgeShouldRefresh] = useSwapBridgeShouldRefreshQuoteAtom();
  return useMemo(() => {
    if (type === ESwapTabSwitchType.SWAP) {
      return swapShouldRefresh;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      return bridgeShouldRefresh;
    }
    return false;
  }, [bridgeShouldRefresh, swapShouldRefresh, type]);
}

export function useSwapBuildTxFetching(type: ESwapTabSwitchType) {
  const [swapBuildTxFetching] = useSwapSwapBuildTxFetchingAtom();
  const [bridgeBuildTxFetching] = useSwapBridgeBuildTxFetchingAtom();
  return useMemo(() => {
    if (type === ESwapTabSwitchType.SWAP) {
      return swapBuildTxFetching;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      return bridgeBuildTxFetching;
    }
    return false;
  }, [bridgeBuildTxFetching, swapBuildTxFetching, type]);
}

export function useSwapQuoteIntervalCount(type: ESwapTabSwitchType) {
  const [swapQuoteIntervalCount] = useSwapSwapQuoteIntervalCountAtom();
  const [bridgeQuoteIntervalCount] = useSwapBridgeQuoteIntervalCountAtom();
  return useMemo(() => {
    if (type === ESwapTabSwitchType.SWAP) {
      return swapQuoteIntervalCount;
    }
    if (type === ESwapTabSwitchType.BRIDGE) {
      return bridgeQuoteIntervalCount;
    }
    return 0;
  }, [bridgeQuoteIntervalCount, swapQuoteIntervalCount, type]);
}
