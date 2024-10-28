import {
  ESwapProviderSort,
  swapSlippageAutoValue,
} from '@onekeyhq/shared/types/swap/SwapProvider.constants';
import type {
  ESwapDirectionType,
  ESwapRateDifferenceUnit,
  IFetchQuoteResult,
  ISwapAlertState,
  ISwapAutoSlippageSuggestedValue,
  ISwapNetwork,
  ISwapToken,
  ISwapTokenCatch,
} from '@onekeyhq/shared/types/swap/types';
import {
  ESwapSlippageSegmentKey,
  ESwapTabSwitchType,
} from '@onekeyhq/shared/types/swap/types';

import { createJotaiContext } from '../../utils/createJotaiContext';

import type { IAccountSelectorActiveAccountInfo } from '../accountSelector';

const {
  Provider: ProviderJotaiContextSwap,
  contextAtom,
  contextAtomMethod,
} = createJotaiContext();
export { ProviderJotaiContextSwap, contextAtomMethod };

// swap bridge limit switch
export const { atom: swapTypeSwitchAtom, use: useSwapTypeSwitchAtom } =
  contextAtom<ESwapTabSwitchType>(ESwapTabSwitchType.SWAP);

// swap networks & tokens
export const { atom: swapNetworks, use: useSwapNetworksAtom } = contextAtom<
  ISwapNetwork[]
>([]);

// export const {
//   atom: swapNetworksIncludeAllNetworkAtom,
//   use: useSwapNetworksIncludeAllNetworkAtom,
// } = contextAtomMethod((get, set, type: ESwapTabSwitchType) => {
//   let networks = get(swapNetworks());
//   networks = networks.filter((net) =>
//     type === ESwapTabSwitchType.BRIDGE
//       ? net.supportCrossChainSwap
//       : net.supportSingleSwap,
//   );
//   const allNetwork = {
//     networkId: getNetworkIdsMap().onekeyall,
//     name: dangerAllNetworkRepresent.name,
//     symbol: dangerAllNetworkRepresent.symbol,
//     logoURI: dangerAllNetworkRepresent.logoURI,
//     shortcode: dangerAllNetworkRepresent.shortcode,
//     isAllNetworks: true,
//   };
//   return [allNetwork, ...networks];
// });

export const { atom: swapTokenMapAtom, use: useSwapTokenMapAtom } =
  contextAtom<{
    updatedAt: number;
    tokenCatch?: Record<string, ISwapTokenCatch>;
  }>({
    updatedAt: 0,
  });

export const { atom: swapTokenFetchingAtom, use: useSwapTokenFetchingAtom } =
  contextAtom<boolean>(false);

// swap account
export const {
  atom: swapToAnotherAccountAddressAtom,
  use: useSwapToAnotherAccountAddressAtom,
} = contextAtom<{
  networkId: string | undefined;
  address: string | undefined;
  accountInfo: IAccountSelectorActiveAccountInfo | undefined;
}>({ networkId: undefined, address: undefined, accountInfo: undefined });

// swap select token

// tab----

export const {
  atom: swapSwapSelectFromTokenAtom,
  use: useSwapSwapSelectFromTokenAtom,
} = contextAtom<ISwapToken | undefined>(undefined);
export const {
  atom: swapBridgeSelectFromTokenAtom,
  use: useSwapBridgeSelectFromTokenAtom,
} = contextAtom<ISwapToken | undefined>(undefined);
export const {
  atom: swapSwapSelectToTokenAtom,
  use: useSwapSwapSelectToTokenAtom,
} = contextAtom<ISwapToken | undefined>(undefined);
export const {
  atom: swapBridgeSelectToTokenAtom,
  use: useSwapBridgeSelectToTokenAtom,
} = contextAtom<ISwapToken | undefined>(undefined);

export const {
  atom: swapSwapFromTokenAmountAtom,
  use: useSwapSwapFromTokenAmountAtom,
} = contextAtom<string>('');
export const {
  atom: swapBridgeFromTokenAmountAtom,
  use: useSwapBridgeFromTokenAmountAtom,
} = contextAtom<string>('');

export const {
  atom: swapSwapSelectedFromTokenBalanceAtom,
  use: useSwapSwapSelectedFromTokenBalanceAtom,
} = contextAtom('');

export const {
  atom: swapSwapSelectedToTokenBalanceAtom,
  use: useSwapSwapSelectedToTokenBalanceAtom,
} = contextAtom('');
export const {
  atom: swapBridgeSelectedFromTokenBalanceAtom,
  use: useSwapBridgeSelectedFromTokenBalanceAtom,
} = contextAtom('');

export const {
  atom: swapBridgeSelectedToTokenBalanceAtom,
  use: useSwapBridgeSelectedToTokenBalanceAtom,
} = contextAtom('');
// tab----

// export const {
//   atom: swapSelectFromTokenAtom,
//   use: useSwapSelectFromTokenAtom,
// } = contextAtom<ISwapToken | undefined>(undefined);

// export const { atom: swapSelectToTokenAtom, use: useSwapSelectToTokenAtom } =
//   contextAtom<ISwapToken | undefined>(undefined);

// export const {
//   atom: swapFromTokenAmountAtom,
//   use: useSwapFromTokenAmountAtom,
// } = contextAtom<string>('');

// export const {
//   atom: swapSelectedFromTokenBalanceAtom,
//   use: useSwapSelectedFromTokenBalanceAtom,
// } = contextAtom('');

// export const {
//   atom: swapSelectedToTokenBalanceAtom,
//   use: useSwapSelectedToTokenBalanceAtom,
// } = contextAtom('');

export const {
  atom: swapAllNetworkTokenListMapAtom,
  use: useSwapAllNetworkTokenListMapAtom,
} = contextAtom<Record<string, ISwapToken[]>>({});

export const {
  atom: swapAllNetworkActionLockAtom,
  use: useSwapAllNetworkActionLockAtom,
} = contextAtom<boolean>(false);

// swap quote

// tab----
export const { atom: swapSwapQuoteListAtom, use: useSwapSwapQuoteListAtom } =
  contextAtom<IFetchQuoteResult[]>([]);
export const {
  atom: swapBridgeQuoteListAtom,
  use: useSwapBridgeQuoteListAtom,
} = contextAtom<IFetchQuoteResult[]>([]);

export const {
  atom: swapSwapProviderSortAtom,
  use: useSwapSwapProviderSortAtom,
} = contextAtom<ESwapProviderSort>(ESwapProviderSort.RECOMMENDED);
export const {
  atom: swapBridgeProviderSortAtom,
  use: useSwapBridgeProviderSortAtom,
} = contextAtom<ESwapProviderSort>(ESwapProviderSort.RECOMMENDED);

export const {
  atom: swapSwapQuoteEventTotalCountAtom,
  use: useSwapSwapQuoteEventTotalCountAtom,
} = contextAtom<number>(0);
export const {
  atom: swapBridgeQuoteEventTotalCountAtom,
  use: useSwapBridgeQuoteEventTotalCountAtom,
} = contextAtom<number>(0);

export const {
  atom: swapSwapShouldRefreshQuoteAtom,
  use: useSwapSwapShouldRefreshQuoteAtom,
} = contextAtom<boolean>(false);
export const {
  atom: swapBridgeShouldRefreshQuoteAtom,
  use: useSwapBridgeShouldRefreshQuoteAtom,
} = contextAtom<boolean>(false);

export const {
  atom: swapSwapQuoteFetchingAtom,
  use: useSwapSwapQuoteFetchingAtom,
} = contextAtom<boolean>(false);
export const {
  atom: swapBridgeQuoteFetchingAtom,
  use: useSwapBridgeQuoteFetchingAtom,
} = contextAtom<boolean>(false);

export const { atom: swapSwapAlertsAtom, use: useSwapSwapAlertsAtom } =
  contextAtom<{
    states: ISwapAlertState[];
    quoteId: string;
  }>({ states: [], quoteId: '' });
export const { atom: swapBridgeAlertsAtom, use: useSwapBridgeAlertsAtom } =
  contextAtom<{
    states: ISwapAlertState[];
    quoteId: string;
  }>({ states: [], quoteId: '' });

export const { atom: rateSwapDifferenceAtom, use: useSwapRateDifferenceAtom } =
  contextAtom<{ value: string; unit: ESwapRateDifferenceUnit } | undefined>(
    undefined,
  );
export const {
  atom: rateBridgeDifferenceAtom,
  use: useBridgeRateDifferenceAtom,
} = contextAtom<{ value: string; unit: ESwapRateDifferenceUnit } | undefined>(
  undefined,
);

export const {
  atom: swapSwapQuoteApproveAllowanceUnLimitAtom,
  use: useSwapSwapQuoteApproveAllowanceUnLimitAtom,
} = contextAtom<boolean>(false);

export const {
  atom: swapSwapApproveAllowanceSelectOpenAtom,
  use: useSwapSwapApproveAllowanceSelectOpenAtom,
} = contextAtom<boolean>(false);
export const {
  atom: swapBridgeQuoteApproveAllowanceUnLimitAtom,
  use: useSwapBridgeQuoteApproveAllowanceUnLimitAtom,
} = contextAtom<boolean>(false);

export const {
  atom: swapBridgeApproveAllowanceSelectOpenAtom,
  use: useSwapBridgeApproveAllowanceSelectOpenAtom,
} = contextAtom<boolean>(false);

export const {
  atom: swapSwapSlippagePercentageModeAtom,
  use: useSwapSwapSlippagePercentageModeAtom,
} = contextAtom<ESwapSlippageSegmentKey>(ESwapSlippageSegmentKey.AUTO);

export const {
  atom: swapSwapAutoSlippageSuggestedValueAtom,
  use: useSwapSwapAutoSlippageSuggestedValueAtom,
} = contextAtom<ISwapAutoSlippageSuggestedValue | undefined>(undefined);

export const {
  atom: swapSwapSlippagePercentageCustomValueAtom,
  use: useSwapSwapSlippagePercentageCustomValueAtom,
} = contextAtom<number>(swapSlippageAutoValue);

export const {
  atom: swapBridgeSlippagePercentageModeAtom,
  use: useSwapBridgeSlippagePercentageModeAtom,
} = contextAtom<ESwapSlippageSegmentKey>(ESwapSlippageSegmentKey.AUTO);

export const {
  atom: swapBridgeAutoSlippageSuggestedValueAtom,
  use: useSwapBridgeAutoSlippageSuggestedValueAtom,
} = contextAtom<ISwapAutoSlippageSuggestedValue | undefined>(undefined);

export const {
  atom: swapBridgeSlippagePercentageCustomValueAtom,
  use: useSwapBridgeSlippagePercentageCustomValueAtom,
} = contextAtom<number>(swapSlippageAutoValue);

export const {
  atom: swapSwapSlippageDialogOpeningAtom,
  use: useSwapSwapSlippageDialogOpeningAtom,
} = contextAtom<{ status: boolean; flag?: string }>({ status: false });

export const {
  atom: swapBridgeBuildTxFetchingAtom,
  use: useSwapBridgeBuildTxFetchingAtom,
} = contextAtom<boolean>(false);

export const {
  atom: swapBridgeSlippageDialogOpeningAtom,
  use: useSwapBridgeSlippageDialogOpeningAtom,
} = contextAtom<{ status: boolean; flag?: string }>({ status: false });

export const {
  atom: swapSwapBuildTxFetchingAtom,
  use: useSwapSwapBuildTxFetchingAtom,
} = contextAtom<boolean>(false);

export const {
  atom: swapSwapManualSelectQuoteProvidersAtom,
  use: useSwapSwapManualSelectQuoteProvidersAtom,
} = contextAtom<IFetchQuoteResult | undefined>(undefined);

export const {
  atom: swapBridgeManualSelectQuoteProvidersAtom,
  use: useSwapBridgeManualSelectQuoteProvidersAtom,
} = contextAtom<IFetchQuoteResult | undefined>(undefined);

export const {
  atom: swapSwapSelectTokenDetailFetchingAtom,
  use: useSwapSwapSelectTokenDetailFetchingAtom,
} = contextAtom<Record<ESwapDirectionType, boolean>>({
  'from': false,
  'to': false,
});

export const {
  atom: swapBridgeSelectTokenDetailFetchingAtom,
  use: useSwapBridgeSelectTokenDetailFetchingAtom,
} = contextAtom<Record<ESwapDirectionType, boolean>>({
  'from': false,
  'to': false,
});

export const {
  atom: swapSwapSilenceQuoteLoading,
  use: useSwapSwapSilenceQuoteLoading,
} = contextAtom<boolean>(false);

export const {
  atom: swapBridgeSilenceQuoteLoading,
  use: useSwapBridgeSilenceQuoteLoading,
} = contextAtom<boolean>(false);

export const {
  atom: swapSwapQuoteActionLockAtom,
  use: useSwapSwapQuoteActionLockAtom,
} = contextAtom<{
  actionLock: boolean;
  fromToken?: ISwapToken;
  toToken?: ISwapToken;
  fromTokenAmount?: string;
  accountId?: string;
  address?: string;
}>({ actionLock: false });
export const {
  atom: swapBridgeQuoteActionLockAtom,
  use: useSwapBridgeQuoteActionLockAtom,
} = contextAtom<{
  actionLock: boolean;
  fromToken?: ISwapToken;
  toToken?: ISwapToken;
  fromTokenAmount?: string;
  accountId?: string;
  address?: string;
}>({ actionLock: false });

export const {
  atom: swapSwapQuoteIntervalCountAtom,
  use: useSwapSwapQuoteIntervalCountAtom,
} = contextAtom<number>(0);

export const {
  atom: swapBridgeQuoteIntervalCountAtom,
  use: useSwapBridgeQuoteIntervalCountAtom,
} = contextAtom<number>(0);

// tab--

// export const {
//   atom: swapManualSelectQuoteProvidersAtom,
//   use: useSwapManualSelectQuoteProvidersAtom,
// } = contextAtom<IFetchQuoteResult | undefined>(undefined);

// export const { atom: swapQuoteListAtom, use: useSwapQuoteListAtom } =
//   contextAtom<IFetchQuoteResult[]>([]);

// export const { atom: swapProviderSortAtom, use: useSwapProviderSortAtom } =
//   contextAtom<ESwapProviderSort>(ESwapProviderSort.RECOMMENDED);

// export const {
//   atom: swapQuoteActionLockAtom,
//   use: useSwapQuoteActionLockAtom,
// } = contextAtom<{
//   actionLock: boolean;
//   fromToken?: ISwapToken;
//   toToken?: ISwapToken;
//   fromTokenAmount?: string;
//   accountId?: string;
//   address?: string;
// }>({ actionLock: false });

// export const {
//   atom: swapQuoteIntervalCountAtom,
//   use: useSwapQuoteIntervalCountAtom,
// } = contextAtom<number>(0);

// export const {
//   atom: swapQuoteEventTotalCountAtom,
//   use: useSwapQuoteEventTotalCountAtom,
// } = contextAtom<number>(0);

// export const {
//   atom: swapShouldRefreshQuoteAtom,
//   use: useSwapShouldRefreshQuoteAtom,
// } = contextAtom<boolean>(false);

// export const {
//   atom: swapSortedQuoteListAtom,
//   use: useSwapSortedQuoteListAtom,
// } = contextAtomComputed<IFetchQuoteResult[]>((get) => {
//   const type = get(swapTypeSwitchAtom());
//   let list: IFetchQuoteResult[] = [];
//   let fromTokenAmount = '';
//   let sortType = ESwapProviderSort.RECOMMENDED;
//   if (type === ESwapTabSwitchType.BRIDGE) {
//     list = get(swapBridgeQuoteListAtom());
//     fromTokenAmount = get(swapBridgeFromTokenAmountAtom());
//     sortType = get(swapBridgeProviderSortAtom());
//   }
//   if (type === ESwapTabSwitchType.SWAP) {
//     list = get(swapSwapQuoteListAtom());
//     fromTokenAmount = get(swapSwapFromTokenAmountAtom());
//     sortType = get(swapSwapProviderSortAtom());
//   }
//   const fromTokenAmountBN = new BigNumber(fromTokenAmount);
//   const resetList: IFetchQuoteResult[] = list.map(
//     (item: IFetchQuoteResult) => ({
//       ...item,
//       receivedBest: false,
//       isBest: false,
//       minGasCost: false,
//     }),
//   );
//   let sortedList = [...resetList];
//   const gasFeeSorted = resetList.slice().sort((a, b) => {
//     const aBig = new BigNumber(a.fee?.estimatedFeeFiatValue || Infinity);
//     const bBig = new BigNumber(b.fee?.estimatedFeeFiatValue || Infinity);
//     return aBig.comparedTo(bBig);
//   });
//   if (sortType === ESwapProviderSort.GAS_FEE) {
//     sortedList = [...gasFeeSorted];
//   }
//   if (sortType === ESwapProviderSort.SWAP_DURATION) {
//     sortedList = resetList.slice().sort((a, b) => {
//       const aVal = new BigNumber(a.estimatedTime || Infinity);
//       const bVal = new BigNumber(b.estimatedTime || Infinity);
//       return aVal.comparedTo(bVal);
//     });
//   }
//   const receivedSorted = resetList.slice().sort((a, b) => {
//     const aVal = new BigNumber(a.toAmount || 0);
//     const bVal = new BigNumber(b.toAmount || 0);
//     // Check if limit exists for a and b
//     const aHasLimit = !!a.limit;
//     const bHasLimit = !!b.limit;

//     if (aVal.isZero() && bVal.isZero() && aHasLimit && !bHasLimit) {
//       return -1;
//     }

//     if (aVal.isZero() && bVal.isZero() && bHasLimit && !aHasLimit) {
//       return 1;
//     }

//     if (
//       aVal.isZero() ||
//       aVal.isNaN() ||
//       fromTokenAmountBN.lt(new BigNumber(a.limit?.min || 0)) ||
//       fromTokenAmountBN.gt(new BigNumber(a.limit?.max || Infinity))
//     ) {
//       return 1;
//     }
//     if (
//       bVal.isZero() ||
//       bVal.isNaN() ||
//       fromTokenAmountBN.lt(new BigNumber(b.limit?.min || 0)) ||
//       fromTokenAmountBN.gt(new BigNumber(b.limit?.max || Infinity))
//     ) {
//       return -1;
//     }
//     return bVal.comparedTo(aVal);
//   });
//   if (
//     sortType === ESwapProviderSort.RECOMMENDED ||
//     sortType === ESwapProviderSort.RECEIVED
//   ) {
//     sortedList = [...receivedSorted];
//   }
//   return sortedList.map((p) => {
//     if (
//       p.info.provider === receivedSorted?.[0]?.info?.provider &&
//       p.info.providerName === receivedSorted?.[0]?.info?.providerName &&
//       p.toAmount
//     ) {
//       p.receivedBest = true;
//       p.isBest = true;
//     }
//     if (
//       p.info.provider === gasFeeSorted?.[0]?.info?.provider &&
//       p.info.providerName === gasFeeSorted?.[0]?.info?.providerName &&
//       p.toAmount
//     ) {
//       p.minGasCost = true;
//     }
//     return p;
//   });
// });

// export const {
//   atom: swapQuoteCurrentSelectAtom,
//   use: useSwapQuoteCurrentSelectAtom,
// } = contextAtomComputed((get) => {
//   const type = get(swapTypeSwitchAtom());
//   const list = get(swapSortedQuoteListAtom());
//   let manualSelectQuoteProviders: IFetchQuoteResult | undefined;
//   if (type === ESwapTabSwitchType.SWAP) {
//     manualSelectQuoteProviders = get(swapSwapManualSelectQuoteProvidersAtom());
//   }
//   if (type === ESwapTabSwitchType.BRIDGE) {
//     manualSelectQuoteProviders = get(
//       swapBridgeManualSelectQuoteProvidersAtom(),
//     );
//   }
//   const manualSelectQuoteResult = list.find(
//     (item) =>
//       item.info.provider === manualSelectQuoteProviders?.info.provider &&
//       item.info.providerName === manualSelectQuoteProviders?.info.providerName,
//   );
//   if (manualSelectQuoteProviders && manualSelectQuoteResult?.toAmount) {
//     return list.find(
//       (item) =>
//         item.info.provider === manualSelectQuoteProviders.info.provider &&
//         item.info.providerName === manualSelectQuoteProviders.info.providerName,
//     );
//   }
//   if (list?.length > 0) {
//     return list[0];
//   }
//   return undefined;
// });

// export const { atom: swapTokenMetadataAtom, use: useSwapTokenMetadataAtom } =
//   contextAtomComputed<{
//     swapTokenMetadata?: ISwapTokenMetadata;
//   }>((get) => {
//     const type = get(swapTypeSwitchAtom());
//     let quoteList: IFetchQuoteResult[] = [];
//     if (type === ESwapTabSwitchType.BRIDGE) {
//       quoteList = get(swapBridgeQuoteListAtom());
//     }
//     if (type === ESwapTabSwitchType.SWAP) {
//       quoteList = get(swapSwapQuoteListAtom());
//     }
//     const swapTokenMetadata = quoteList.find(
//       (item) => item.tokenMetadata,
//     )?.tokenMetadata;
//     return {
//       swapTokenMetadata,
//     };
//   });

// export const { atom: swapQuoteFetchingAtom, use: useSwapQuoteFetchingAtom } =
//   contextAtom<boolean>(false);

// export const {
//   atom: swapSelectTokenDetailFetchingAtom,
//   use: useSwapSelectTokenDetailFetchingAtom,
// } = contextAtom<Record<ESwapDirectionType, boolean>>({
//   'from': false,
//   'to': false,
// });

// export const {
//   atom: swapSilenceQuoteLoading,
//   use: useSwapSilenceQuoteLoading,
// } = contextAtom<boolean>(false);

// export const {
//   atom: swapProviderSupportReceiveAddressAtom,
//   use: useSwapProviderSupportReceiveAddressAtom,
// } = contextAtomComputed((get) => {
//   const quoteResult = get(swapQuoteCurrentSelectAtom());
//   if (!quoteResult) {
//     return true;
//   }
//   return (
//     !quoteResult.unSupportReceiveAddressDifferent && !quoteResult.isWrapped
//   );
// });

// swap state
// export const { atom: swapAlertsAtom, use: useSwapAlertsAtom } = contextAtom<{
//   states: ISwapAlertState[];
//   quoteId: string;
// }>({ states: [], quoteId: '' });

// export const { atom: rateDifferenceAtom, use: useRateDifferenceAtom } =
//   contextAtom<{ value: string; unit: ESwapRateDifferenceUnit } | undefined>(
//     undefined,
//   );

// swap approve
// export const {
//   atom: swapQuoteApproveAllowanceUnLimitAtom,
//   use: useSwapQuoteApproveAllowanceUnLimitAtom,
// } = contextAtom<boolean>(false);

// export const {
//   atom: swapApproveAllowanceSelectOpenAtom,
//   use: useSwapApproveAllowanceSelectOpenAtom,
// } = contextAtom<boolean>(false);

// swap slippage

// export const {
//   atom: swapSlippagePercentageModeAtom,
//   use: useSwapSlippagePercentageModeAtom,
// } = contextAtom<ESwapSlippageSegmentKey>(ESwapSlippageSegmentKey.AUTO);

// export const {
//   atom: swapAutoSlippageSuggestedValueAtom,
//   use: useSwapAutoSlippageSuggestedValueAtom,
// } = contextAtom<ISwapAutoSlippageSuggestedValue | undefined>(undefined);

// export const {
//   atom: swapSlippagePercentageCustomValueAtom,
//   use: useSwapSlippagePercentageCustomValueAtom,
// } = contextAtom<number>(swapSlippageAutoValue);

// export const {
//   atom: swapSlippagePercentageAtom,
//   use: useSwapSlippagePercentageAtom,
// } = contextAtomComputed<{
//   slippageItem: ISwapSlippageSegmentItem;
//   autoValue: number;
// }>((get) => {
//   const type = get(swapTypeSwitchAtom());
//   let mode: ESwapSlippageSegmentKey = ESwapSlippageSegmentKey.AUTO;
//   if (type === ESwapTabSwitchType.SWAP) {
//     mode = get(swapSwapSlippagePercentageModeAtom());
//   }
//   if (type === ESwapTabSwitchType.BRIDGE) {
//     mode = get(swapBridgeSlippagePercentageModeAtom());
//   }
//   const quoteResult = get(swapQuoteCurrentSelectAtom());
//   let autoValue = swapSlippageAutoValue;
//   let value = swapSlippageAutoValue;
//   if (!isNil(quoteResult?.autoSuggestedSlippage)) {
//     autoValue = quoteResult.autoSuggestedSlippage;
//   }
//   if (mode === ESwapSlippageSegmentKey.AUTO) {
//     value = autoValue;
//   } else {
//     value =
//       type === ESwapTabSwitchType.BRIDGE
//         ? get(swapBridgeSlippagePercentageCustomValueAtom())
//         : get(swapSwapSlippagePercentageCustomValueAtom());
//   }
//   return {
//     slippageItem: {
//       key: mode,
//       value,
//     },
//     autoValue,
//   };
// });

// export const {
//   atom: swapSlippageDialogOpeningAtom,
//   use: useSwapSlippageDialogOpeningAtom,
// } = contextAtom<{ status: boolean; flag?: string }>({ status: false });

// swap build_tx
// export const {
//   atom: swapBuildTxFetchingAtom,
//   use: useSwapBuildTxFetchingAtom,
// } = contextAtom<boolean>(false);
