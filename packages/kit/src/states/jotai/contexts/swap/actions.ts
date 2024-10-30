import { useRef } from 'react';

import BigNumber from 'bignumber.js';
import { debounce, isNil } from 'lodash';

import backgroundApiProxy from '@onekeyhq/kit/src/background/instance/backgroundApiProxy';
import type { useSwapAddressInfo } from '@onekeyhq/kit/src/views/Swap/hooks/useSwapAccount';
import { moveNetworkToFirst } from '@onekeyhq/kit/src/views/Swap/utils/utils';
import { getNetworkIdsMap } from '@onekeyhq/shared/src/config/networkIds';
import { dangerAllNetworkRepresent } from '@onekeyhq/shared/src/config/presetNetworks';
import {
  EAppEventBusNames,
  appEventBus,
} from '@onekeyhq/shared/src/eventBus/appEventBus';
import type { IEventSourceMessageEvent } from '@onekeyhq/shared/src/eventSource';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import { appLocale } from '@onekeyhq/shared/src/locale/appLocale';
import accountUtils from '@onekeyhq/shared/src/utils/accountUtils';
import { memoFn } from '@onekeyhq/shared/src/utils/cacheUtils';
import { numberFormat } from '@onekeyhq/shared/src/utils/numberUtils';
import { equalTokenNoCaseSensitive } from '@onekeyhq/shared/src/utils/tokenUtils';
import {
  ESwapProviderSort,
  swapApprovingStateFetchInterval,
  swapBridgeDefaultTokenConfigs,
  swapBridgeDefaultTokenExtraConfigs,
  swapDefaultSetTokens,
  swapHistoryStateFetchRiceIntervalCount,
  swapQuoteFetchInterval,
  swapQuoteIntervalMaxCount,
  swapRateDifferenceMax,
  swapRateDifferenceMin,
  swapSlippageAutoValue,
  swapTokenCatchMapMaxCount,
} from '@onekeyhq/shared/types/swap/SwapProvider.constants';
import type {
  IFetchQuoteResult,
  IFetchQuotesParams,
  IFetchTokensParams,
  ISwapAlertActionData,
  ISwapAlertState,
  ISwapApproveTransaction,
  ISwapAutoSlippageSuggestedValue,
  ISwapNetwork,
  ISwapQuoteEvent,
  ISwapQuoteEventAutoSlippage,
  ISwapQuoteEventData,
  ISwapQuoteEventInfo,
  ISwapQuoteEventQuoteResult,
  ISwapToken,
} from '@onekeyhq/shared/types/swap/types';
import {
  ESwapAlertActionType,
  ESwapAlertLevel,
  ESwapApproveTransactionStatus,
  ESwapDirectionType,
  ESwapFetchCancelCause,
  ESwapRateDifferenceUnit,
  ESwapSlippageSegmentKey,
  ESwapTabSwitchType,
  ESwapTxHistoryStatus,
} from '@onekeyhq/shared/types/swap/types';

import { ContextJotaiActionsBase } from '../../utils/ContextJotaiActionsBase';

import {
  contextAtomMethod,
  rateBridgeDifferenceAtom,
  rateSwapDifferenceAtom,
  swapAllNetworkActionLockAtom,
  swapAllNetworkTokenListMapAtom,
  swapBridgeAlertsAtom,
  swapBridgeApproveAllowanceSelectOpenAtom,
  swapBridgeAutoSlippageSuggestedValueAtom,
  swapBridgeBuildTxFetchingAtom,
  swapBridgeFromTokenAmountAtom,
  swapBridgeManualSelectQuoteProvidersAtom,
  swapBridgeProviderSortAtom,
  swapBridgeQuoteActionLockAtom,
  swapBridgeQuoteApproveAllowanceUnLimitAtom,
  swapBridgeQuoteEventTotalCountAtom,
  swapBridgeQuoteFetchingAtom,
  swapBridgeQuoteIntervalCountAtom,
  swapBridgeQuoteListAtom,
  swapBridgeSelectFromTokenAtom,
  swapBridgeSelectToTokenAtom,
  swapBridgeSelectTokenDetailFetchingAtom,
  swapBridgeSelectedFromTokenBalanceAtom,
  swapBridgeSelectedToTokenBalanceAtom,
  swapBridgeShouldRefreshQuoteAtom,
  swapBridgeSilenceQuoteLoading,
  swapBridgeSlippageDialogOpeningAtom,
  swapBridgeSlippagePercentageCustomValueAtom,
  swapBridgeSlippagePercentageModeAtom,
  swapNetworks,
  swapSwapAlertsAtom,
  swapSwapApproveAllowanceSelectOpenAtom,
  swapSwapAutoSlippageSuggestedValueAtom,
  swapSwapBuildTxFetchingAtom,
  swapSwapFromTokenAmountAtom,
  swapSwapManualSelectQuoteProvidersAtom,
  swapSwapProviderSortAtom,
  swapSwapQuoteActionLockAtom,
  swapSwapQuoteApproveAllowanceUnLimitAtom,
  swapSwapQuoteEventTotalCountAtom,
  swapSwapQuoteFetchingAtom,
  swapSwapQuoteIntervalCountAtom,
  swapSwapQuoteListAtom,
  swapSwapSelectFromTokenAtom,
  swapSwapSelectToTokenAtom,
  swapSwapSelectTokenDetailFetchingAtom,
  swapSwapSelectedFromTokenBalanceAtom,
  swapSwapSelectedToTokenBalanceAtom,
  swapSwapShouldRefreshQuoteAtom,
  swapSwapSilenceQuoteLoading,
  swapSwapSlippageDialogOpeningAtom,
  swapSwapSlippagePercentageCustomValueAtom,
  swapSwapSlippagePercentageModeAtom,
  swapTokenFetchingAtom,
  swapTokenMapAtom,
  swapTypeSwitchAtom,
} from './atoms';

class ContentJotaiActionsSwap extends ContextJotaiActionsBase {
  private quoteInterval: ReturnType<typeof setTimeout> | undefined;

  private approvingInterval: ReturnType<typeof setTimeout> | undefined;

  private approvingIntervalCount = 0;

  syncNetworksSort = contextAtomMethod(async (get, set, netWorkId: string) => {
    const networks = get(swapNetworks());
    const sortNetworks = moveNetworkToFirst(networks, netWorkId);
    set(swapNetworks(), sortNetworks);
    await backgroundApiProxy.simpleDb.swapNetworksSort.setRawData({
      data: sortNetworks,
    });
  });

  catchSwapTokensMap = contextAtomMethod(
    async (get, set, key: string, tokens: ISwapToken[]) => {
      const swapTokenMap = get(swapTokenMapAtom());
      const swapNetworksList = get(swapNetworks());
      const catchTokens = swapTokenMap.tokenCatch?.[key];
      const dateNow = Date.now();
      let catchCount = 0;
      const newTokens = tokens.map((token) => {
        const network = swapNetworksList.find(
          (n) => n.networkId === token.networkId,
        );
        if (network) {
          token.networkLogoURI = network.logoURI;
        }
        return token;
      });
      if (swapTokenMap.tokenCatch && catchTokens?.data) {
        // have catch
        if (JSON.stringify(catchTokens.data) !== JSON.stringify(newTokens)) {
          // catch data not equal
          const newTokenCatch = { ...swapTokenMap.tokenCatch };
          newTokenCatch[key] = {
            data: newTokens,
            updatedAt: dateNow,
          };
          swapTokenMap.tokenCatch = { ...newTokenCatch };
        }
        catchCount = Object.keys(swapTokenMap.tokenCatch).length;
      } else {
        // no catch
        swapTokenMap.tokenCatch = {
          ...(swapTokenMap.tokenCatch ?? {}),
          [key]: { data: newTokens, updatedAt: dateNow },
        };
        catchCount = Object.keys(swapTokenMap.tokenCatch).length;
      }
      if (swapTokenMap.tokenCatch && catchCount > swapTokenCatchMapMaxCount) {
        // clean old catch
        const oldUpdatedAtKey = Object.entries(swapTokenMap.tokenCatch).reduce(
          (min, [mapKey, obj]) =>
            obj.updatedAt < (swapTokenMap.tokenCatch?.[min]?.updatedAt ?? 0)
              ? mapKey
              : min,
          Object.keys(swapTokenMap.tokenCatch)[0],
        );
        if (oldUpdatedAtKey) {
          delete swapTokenMap.tokenCatch[oldUpdatedAtKey];
        }
      }
      set(swapTokenMapAtom(), { ...swapTokenMap, updatedAt: dateNow });
    },
  );

  needChangeToken = ({
    token,
    toToken,
    swapTypeSwitchValue,
  }: {
    token: ISwapToken;
    swapTypeSwitchValue: ESwapTabSwitchType;
    toToken?: ISwapToken;
  }) => {
    if (
      token.networkId !== toToken?.networkId &&
      swapTypeSwitchValue === ESwapTabSwitchType.SWAP
    ) {
      const defaultTokenSet = swapDefaultSetTokens[token.networkId];
      if (token.isNative && !defaultTokenSet.toToken?.isNative) {
        return defaultTokenSet.toToken;
      }
      if (!token.isNative && defaultTokenSet.fromToken?.isNative) {
        return defaultTokenSet.fromToken;
      }
    }
    if (
      swapTypeSwitchValue === ESwapTabSwitchType.BRIDGE &&
      (token.networkId === toToken?.networkId || !toToken)
    ) {
      let needChangeToToken: ISwapToken | null = null;
      swapBridgeDefaultTokenConfigs.some((config) => {
        const findToken = config.fromTokens.find((t) =>
          equalTokenNoCaseSensitive({
            token1: {
              networkId: t.networkId,
              contractAddress: t.contractAddress,
            },
            token2: {
              networkId: token.networkId,
              contractAddress: token.contractAddress,
            },
          }),
        );
        if (findToken) {
          needChangeToToken = config.toTokenDefaultMatch;
        }
        return !!findToken;
      });
      if (!needChangeToToken) {
        needChangeToToken =
          token.networkId ===
          swapBridgeDefaultTokenExtraConfigs.mainNetDefaultToTokenConfig
            .networkId
            ? swapBridgeDefaultTokenExtraConfigs.mainNetDefaultToTokenConfig
                .defaultToToken
            : swapBridgeDefaultTokenExtraConfigs.defaultToToken;
      }
      return needChangeToToken;
    }

    return null;
  };

  resetSwapTokenData = contextAtomMethod(
    async (
      get,
      set,
      type: ESwapTabSwitchType,
      direction: ESwapDirectionType,
    ) => {
      if (direction === ESwapDirectionType.FROM) {
        this.swapActionsSelectFromToken.call(set, type);
        this.swapActionsSelectedFromTokenBalance.call(set, type, '');
      } else {
        this.swapActionsSelectToToken.call(set, type);
        this.swapActionsSelectedToTokenBalance.call(set, type, '');
      }
      this.swapActionsQuoteList.call(set, type, []);
      this.swapActionsRateDifference.call(set, type);
    },
  );

  selectFromToken = contextAtomMethod(
    (
      get,
      set,
      type: ESwapTabSwitchType,
      token: ISwapToken,
      disableCheckToToken?: boolean,
    ) => {
      const fromTokenPre = this.swapDataSelectFromToken.call(set, type);
      const toToken = this.swapDataSelectToToken.call(set, type);
      if (!equalTokenNoCaseSensitive({ token1: fromTokenPre, token2: token })) {
        this.swapActionsSlippagePercentageMode.call(
          set,
          type,
          ESwapSlippageSegmentKey.AUTO,
        );
        this.swapActionsManualSelectQuoteProviders.call(set, type);
        void this.syncNetworksSort.call(set, token.networkId);
      }
      const needChangeToToken = this.needChangeToken({
        token,
        swapTypeSwitchValue: type,
        toToken,
      });
      if (needChangeToToken && !disableCheckToToken) {
        this.swapActionsSelectToToken.call(set, type);
        this.swapActionsSelectFromToken.call(set, type, token);
        this.swapActionsSelectToToken.call(set, type, needChangeToToken);
      } else {
        if (
          toToken?.networkId !== token.networkId &&
          type === ESwapTabSwitchType.SWAP
        ) {
          void this.resetSwapTokenData.call(set, type, ESwapDirectionType.TO); // TODO
        }
        this.swapActionsSelectFromToken.call(set, type, token);
      }
    },
  );

  selectToToken = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, token: ISwapToken) => {
      const toTokenPre = this.swapDataSelectToToken.call(set, type);
      if (!equalTokenNoCaseSensitive({ token1: token, token2: toTokenPre })) {
        this.swapActionsSlippagePercentageMode.call(
          set,
          type,
          ESwapSlippageSegmentKey.AUTO,
        );
        this.swapActionsManualSelectQuoteProviders.call(set, type);
        void this.syncNetworksSort.call(set, token.networkId);
      }
      this.swapActionsSelectToToken.call(set, type);
    },
  );

  alternationToken = contextAtomMethod((get, set, type: ESwapTabSwitchType) => {
    const fromToken = this.swapDataSelectFromToken.call(set, type);
    const toToken = this.swapDataSelectToToken.call(set, type);
    if (!fromToken && !toToken) {
      return;
    }
    this.swapActionsSelectToToken.call(set, type, fromToken);
    this.swapActionsSelectFromToken.call(set, type, toToken);
    this.swapActionsSlippagePercentageMode.call(
      set,
      type,
      ESwapSlippageSegmentKey.AUTO,
    );
    this.swapActionsManualSelectQuoteProviders.call(set, type);
  });

  tokenListFetchAction = contextAtomMethod(
    async (get, set, params: IFetchTokensParams) => {
      try {
        if (!params.networkId) return;
        set(swapTokenFetchingAtom(), true);
        const result = await backgroundApiProxy.serviceSwap.fetchSwapTokens({
          ...params,
        });
        if (result.length > 0) {
          await this.catchSwapTokensMap.call(
            set,
            JSON.stringify(params),
            result,
          );
        }
        set(swapTokenFetchingAtom(), false);
      } catch (e: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (e?.cause !== ESwapFetchCancelCause.SWAP_TOKENS_CANCEL) {
          set(swapTokenFetchingAtom(), false);
        }
      }
    },
  );

  runQuote = contextAtomMethod(
    async (
      get,
      set,
      type: ESwapTabSwitchType,
      fromToken: ISwapToken,
      toToken: ISwapToken,
      fromTokenAmount: string,
      slippagePercentage: number,
      autoSlippage?: boolean,
      address?: string,
      accountId?: string,
      loadingDelayEnable?: boolean,
      blockNumber?: number,
    ) => {
      const shouldRefreshQuote = this.swapDataShouldRefreshQuote.call(
        set,
        type,
      );
      if (shouldRefreshQuote) {
        this.cleanQuoteInterval();
        const quoteActionsLockPre = this.swapDataQuoteActionLock.call(
          set,
          type,
        );
        this.swapActionsQuoteActionLock.call(set, type, {
          ...quoteActionsLockPre,
          actionLock: false,
        });
        return;
      }
      await backgroundApiProxy.serviceSwap.setApprovingTransaction(undefined);
      let enableInterval = true;
      try {
        if (!loadingDelayEnable) {
          this.swapActionsQuoteFetching.call(set, type, true);
        }
        const res = await backgroundApiProxy.serviceSwap.fetchQuotes({
          fromToken,
          toToken,
          fromTokenAmount,
          userAddress: address,
          slippagePercentage,
          autoSlippage,
          blockNumber,
          accountId,
        });
        if (!loadingDelayEnable) {
          this.swapActionsQuoteFetching.call(set, type, false);
          this.swapActionsQuoteList.call(set, type, res);
          this.swapActionsQuoteEventTotalCount.call(set, type, res.length);
        } else {
          this.swapActionsSilenceQuoteLoading.call(set, type, true);
          setTimeout(() => {
            this.swapActionsSilenceQuoteLoading.call(set, type, false);
            this.swapActionsQuoteList.call(set, type, res);
            this.swapActionsQuoteEventTotalCount.call(set, type, res.length);
          }, 800);
        }
      } catch (e: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (e?.cause !== ESwapFetchCancelCause.SWAP_QUOTE_CANCEL) {
          this.swapActionsQuoteFetching.call(set, type, false);
        } else {
          enableInterval = false;
        }
      } finally {
        const quoteActionsLockPre = this.swapDataQuoteActionLock.call(
          set,
          type,
        );
        this.swapActionsQuoteActionLock.call(set, type, {
          ...quoteActionsLockPre,
          actionLock: false,
        });
        if (enableInterval) {
          const quoteIntervalCount = this.swapDataQuoteIntervalCount.call(
            set,
            type,
          );
          if (quoteIntervalCount <= swapQuoteIntervalMaxCount) {
            void this.recoverQuoteInterval.call(
              set,
              type,
              address,
              accountId,
              true,
            );
          }
          this.swapActionsQuoteIntervalCount.call(
            set,
            type,
            quoteIntervalCount + 1,
          );
        }
      }
    },
  );

  quoteEventHandler = contextAtomMethod(
    (
      get,
      set,
      event: {
        event: ISwapQuoteEvent;
        swapType: ESwapTabSwitchType;
        type: 'done' | 'close' | 'error' | 'message' | 'open';
        params: IFetchQuotesParams;
        tokenPairs: { fromToken: ISwapToken; toToken: ISwapToken };
        accountId?: string;
      },
    ) => {
      const { swapType } = event;
      switch (event.type) {
        case 'open': {
          this.swapActionsQuoteList.call(set, swapType, []);
          this.swapActionsQuoteEventTotalCount.call(set, swapType, 0);
          break;
        }
        case 'message': {
          const { data } = event.event as IEventSourceMessageEvent;
          if (data) {
            const dataJson = JSON.parse(data) as ISwapQuoteEventData;
            const autoSlippageData = dataJson as ISwapQuoteEventAutoSlippage;
            if (autoSlippageData?.autoSuggestedSlippage) {
              const {
                autoSuggestedSlippage,
                fromNetworkId,
                fromTokenAddress,
                toNetworkId,
                toTokenAddress,
              } = autoSlippageData;
              const quoteResult = this.swapDataQuoteList.call(set, swapType);
              const quoteUpdateSlippage = quoteResult.map((quotRes) => {
                if (
                  equalTokenNoCaseSensitive({
                    token1: quotRes.fromTokenInfo,
                    token2: {
                      networkId: fromNetworkId,
                      contractAddress: fromTokenAddress,
                    },
                  }) &&
                  equalTokenNoCaseSensitive({
                    token1: quotRes.toTokenInfo,
                    token2: {
                      networkId: toNetworkId,
                      contractAddress: toTokenAddress,
                    },
                  }) &&
                  !quotRes.autoSuggestedSlippage
                ) {
                  return {
                    ...quotRes,
                    autoSuggestedSlippage,
                  };
                }
                return quotRes;
              });
              this.swapActionsQuoteList.call(set, swapType, [
                ...quoteUpdateSlippage,
              ]);
              this.swapActionsAutoSlippageSuggestedValue.call(set, swapType, {
                value: autoSuggestedSlippage,
                from: `${fromNetworkId}-${fromTokenAddress}`,
                to: `${toNetworkId}-${toTokenAddress}`,
              });
            } else if (
              (dataJson as ISwapQuoteEventInfo).totalQuoteCount ||
              (dataJson as ISwapQuoteEventInfo).totalQuoteCount === 0
            ) {
              const { totalQuoteCount } = dataJson as ISwapQuoteEventInfo;
              this.swapActionsQuoteEventTotalCount.call(
                set,
                swapType,
                totalQuoteCount,
              );
              if (totalQuoteCount === 0) {
                this.swapActionsQuoteList.call(set, swapType, [
                  {
                    info: { provider: '', providerName: '' },
                    fromTokenInfo: event.tokenPairs.fromToken,
                    toTokenInfo: event.tokenPairs.toToken,
                  },
                ]);
              }
            } else {
              const quoteResultData = dataJson as ISwapQuoteEventQuoteResult;
              const swapAutoSlippageSuggestedValue =
                this.swapDataAutoSlippageSuggestedValue.call(set, swapType);
              if (quoteResultData.data?.length) {
                const quoteResultsUpdateSlippage = quoteResultData.data.map(
                  (quote) => {
                    if (
                      `${quote.fromTokenInfo.networkId}-${quote.fromTokenInfo.contractAddress}` ===
                        swapAutoSlippageSuggestedValue?.from &&
                      `${quote.toTokenInfo.networkId}-${quote.toTokenInfo.contractAddress}` ===
                        swapAutoSlippageSuggestedValue?.to &&
                      swapAutoSlippageSuggestedValue.value &&
                      !quote.autoSuggestedSlippage
                    ) {
                      return {
                        ...quote,
                        autoSuggestedSlippage:
                          swapAutoSlippageSuggestedValue.value,
                      };
                    }
                    return quote;
                  },
                );
                const currentQuoteList = this.swapDataQuoteList.call(
                  set,
                  swapType,
                );
                let newQuoteList = currentQuoteList.map((oldQuoteRes) => {
                  const newUpdateQuoteRes = quoteResultsUpdateSlippage.find(
                    (quote) =>
                      quote.info.provider === oldQuoteRes.info.provider &&
                      quote.info.providerName === oldQuoteRes.info.providerName,
                  );
                  if (newUpdateQuoteRes) {
                    return newUpdateQuoteRes;
                  }
                  return oldQuoteRes;
                });
                const newAddQuoteRes = quoteResultsUpdateSlippage.filter(
                  (quote) =>
                    !currentQuoteList.find(
                      (oldQuoteRes) =>
                        quote.info.provider === oldQuoteRes.info.provider &&
                        quote.info.providerName ===
                          oldQuoteRes.info.providerName,
                    ),
                );
                newQuoteList = [...newQuoteList, ...newAddQuoteRes].filter(
                  (quote) => !!quote.info.provider,
                );
                this.swapActionsQuoteList.call(set, swapType, [
                  ...newQuoteList,
                ]);
              }
              this.swapActionsQuoteFetching.call(set, swapType, false);
            }
          }
          break;
        }
        case 'done': {
          const quoteActionLockPre = this.swapDataQuoteActionLock.call(
            set,
            swapType,
          );
          this.swapActionsQuoteActionLock.call(set, swapType, {
            ...quoteActionLockPre,
            actionLock: false,
          });
          const quoteIntervalCount = this.swapDataQuoteIntervalCount.call(
            set,
            swapType,
          );
          if (quoteIntervalCount <= swapQuoteIntervalMaxCount) {
            void this.recoverQuoteInterval.call(
              set,
              swapType,
              event.params.userAddress,
              event.accountId,
              true,
            );
          }
          this.swapActionsQuoteIntervalCount.call(
            set,
            swapType,
            quoteIntervalCount + 1,
          );
          this.closeQuoteEvent();
          break;
        }
        case 'error': {
          this.closeQuoteEvent();
          break;
        }
        case 'close': {
          this.swapActionsQuoteFetching.call(set, swapType, false);
          const quoteActionLockPre = this.swapDataQuoteActionLock.call(
            set,
            swapType,
          );
          this.swapActionsQuoteActionLock.call(set, swapType, {
            ...quoteActionLockPre,
            actionLock: false,
          });
          break;
        }
        default:
      }
    },
  );

  runQuoteEvent = contextAtomMethod(
    async (
      get,
      set,
      type: ESwapTabSwitchType,
      fromToken: ISwapToken,
      toToken: ISwapToken,
      fromTokenAmount: string,
      slippagePercentage: number,
      autoSlippage?: boolean,
      address?: string,
      accountId?: string,
      blockNumber?: number,
    ) => {
      const shouldRefreshQuote = this.swapDataShouldRefreshQuote.call(
        set,
        type,
      );
      if (shouldRefreshQuote) {
        this.cleanQuoteInterval();
        const quoteActionLockPre = this.swapDataQuoteActionLock.call(set, type);
        this.swapActionsQuoteActionLock.call(set, type, {
          ...quoteActionLockPre,
          actionLock: false,
        });
        return;
      }
      await backgroundApiProxy.serviceSwap.setApprovingTransaction(undefined);
      this.swapActionsQuoteFetching.call(set, type, true);
      await backgroundApiProxy.serviceSwap.fetchQuotesEvents({
        swapType: type,
        fromToken,
        toToken,
        fromTokenAmount,
        userAddress: address,
        slippagePercentage,
        autoSlippage,
        blockNumber,
        accountId,
      });
    },
  );

  quoteAction = contextAtomMethod(
    async (
      get,
      set,
      type: ESwapTabSwitchType,
      address?: string,
      accountId?: string,
      blockNumber?: number,
    ) => {
      const fromToken = this.swapDataSelectFromToken.call(set, type);
      const toToken = this.swapDataSelectToToken.call(set, type);
      const fromTokenAmount = this.swapDataFromTokenAmount.call(set, type);
      const quoteActionLockPre = this.swapDataQuoteActionLock.call(set, type);
      this.swapActionsQuoteActionLock.call(set, type, {
        ...quoteActionLockPre,
        actionLock: true,
        fromToken,
        toToken,
        fromTokenAmount,
        accountId,
        address,
      });
      this.cleanQuoteInterval();
      this.closeQuoteEvent();
      this.swapActionsQuoteIntervalCount.call(set, type, 0);
      this.swapActionsBuildTxFetching.call(set, type, false);
      this.swapActionsShouldRefreshQuote.call(set, type, false);
      const { slippageItem } = this.swapDataSlippagePercentage.call(set, type);
      const fromTokenAmountNumber = Number(fromTokenAmount);
      if (
        fromToken &&
        toToken &&
        !Number.isNaN(fromTokenAmountNumber) &&
        fromTokenAmountNumber > 0
      ) {
        void this.runQuoteEvent.call(
          set,
          type,
          fromToken,
          toToken,
          fromTokenAmount,
          slippageItem.value,
          slippageItem.key === ESwapSlippageSegmentKey.AUTO,
          address,
          accountId,
          blockNumber,
        );
      } else {
        this.swapActionsQuoteFetching.call(set, type, false);
        this.swapActionsQuoteEventTotalCount.call(set, type, 0);
        this.swapActionsQuoteList.call(set, type, []);
        const quoteActionLockPreData = this.swapDataQuoteActionLock.call(
          set,
          type,
        );
        this.swapActionsQuoteActionLock.call(set, type, {
          ...quoteActionLockPreData,
          actionLock: false,
        });
      }
    },
  );

  approvingStateRunSync = contextAtomMethod(
    async (
      get,
      set,
      type: ESwapTabSwitchType,
      networkId: string,
      txId: string,
    ) => {
      let enableInterval = true;
      try {
        const txState = await backgroundApiProxy.serviceSwap.fetchTxState({
          txId,
          networkId,
        });
        const preApproveTx =
          await backgroundApiProxy.serviceSwap.getApprovingTransaction();
        if (
          txState.state === ESwapTxHistoryStatus.SUCCESS ||
          txState.state === ESwapTxHistoryStatus.FAILED
        ) {
          enableInterval = false;
          if (preApproveTx) {
            if (
              txState.state === ESwapTxHistoryStatus.SUCCESS ||
              txState.state === ESwapTxHistoryStatus.FAILED
            ) {
              let newApproveTx: ISwapApproveTransaction = {
                ...preApproveTx,
                blockNumber: txState.blockNumber,
                status: ESwapApproveTransactionStatus.SUCCESS,
              };
              if (txState.state === ESwapTxHistoryStatus.FAILED) {
                newApproveTx = {
                  ...preApproveTx,
                  txId: undefined,
                  status: ESwapApproveTransactionStatus.FAILED,
                };
              }
              await backgroundApiProxy.serviceSwap.setApprovingTransaction(
                newApproveTx,
              );
            }
          }
          if (txState.state !== ESwapTxHistoryStatus.SUCCESS) {
            this.swapActionsBuildTxFetching.call(set, type, false);
          }
        } else if (
          preApproveTx &&
          preApproveTx.status !== ESwapApproveTransactionStatus.PENDING
        ) {
          await backgroundApiProxy.serviceSwap.setApprovingTransaction({
            ...preApproveTx,
            status: ESwapApproveTransactionStatus.PENDING,
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (enableInterval) {
          this.approvingIntervalCount += 1;
          void this.approvingStateAction.call(set, type);
        } else {
          this.cleanApprovingInterval();
          this.approvingIntervalCount = 0;
        }
      }
    },
  );

  approvingStateAction = contextAtomMethod(
    async (get, set, type: ESwapTabSwitchType) => {
      this.cleanApprovingInterval();
      const approvingTransaction =
        await backgroundApiProxy.serviceSwap.getApprovingTransaction();
      if (approvingTransaction && approvingTransaction.txId) {
        this.approvingInterval = setTimeout(() => {
          if (approvingTransaction.txId) {
            void this.approvingStateRunSync.call(
              set,
              type,
              approvingTransaction.fromToken.networkId,
              approvingTransaction.txId,
            );
          }
        }, swapApprovingStateFetchInterval * (Math.floor(this.approvingIntervalCount / swapHistoryStateFetchRiceIntervalCount) + 1));
      }
    },
  );

  recoverQuoteInterval = contextAtomMethod(
    async (
      get,
      set,
      type: ESwapTabSwitchType,
      address?: string,
      accountId?: string,
      unResetCount?: boolean,
    ) => {
      const { actionLock: swapQuoteActionLock } =
        this.swapDataQuoteActionLock.call(set, type);
      if (swapQuoteActionLock) {
        return;
      }
      this.cleanQuoteInterval();
      if (!unResetCount) {
        this.swapActionsQuoteIntervalCount.call(set, type, 0);
      }
      this.swapActionsBuildTxFetching.call(set, type, false);
      this.swapActionsQuoteFetching.call(set, type, false);
      const currentApproveTx =
        await backgroundApiProxy.serviceSwap.getApprovingTransaction();
      if (currentApproveTx?.status === ESwapApproveTransactionStatus.PENDING) {
        void backgroundApiProxy.serviceSwap.setApprovingTransaction({
          ...currentApproveTx,
          status: ESwapApproveTransactionStatus.CANCEL,
        });
      }
      const fromToken = this.swapDataSelectFromToken.call(set, type);
      const toToken = this.swapDataSelectToToken.call(set, type);
      const fromTokenAmount = this.swapDataFromTokenAmount.call(set, type);
      const { slippageItem } = this.swapDataSlippagePercentage.call(set, type);
      const fromTokenAmountNumber = Number(fromTokenAmount);
      if (
        fromToken &&
        toToken &&
        !Number.isNaN(fromTokenAmountNumber) &&
        fromTokenAmountNumber > 0
      ) {
        this.quoteInterval = setTimeout(() => {
          void this.runQuote.call(
            set,
            type,
            fromToken,
            toToken,
            fromTokenAmount,
            slippageItem.value,
            slippageItem.key === ESwapSlippageSegmentKey.AUTO,
            address,
            accountId,
            true,
          );
        }, swapQuoteFetchInterval);
      }
    },
  );

  cleanQuoteInterval = () => {
    if (this.quoteInterval) {
      clearTimeout(this.quoteInterval);
      this.quoteInterval = undefined;
    }
    void backgroundApiProxy.serviceSwap.cancelFetchQuotes();
  };

  closeQuoteEvent = () => {
    void backgroundApiProxy.serviceSwap.cancelFetchQuoteEvents();
  };

  cleanApprovingInterval = () => {
    if (this.approvingInterval) {
      clearTimeout(this.approvingInterval);
      this.approvingInterval = undefined;
    }
  };

  checkAddressNeedCreate = (
    swapSupportAllNetworks: ISwapNetwork[],
    fromToken: ISwapToken,
    addressInfo: ReturnType<typeof useSwapAddressInfo>,
  ) => {
    const netInfo = swapSupportAllNetworks.find(
      (net) => net.networkId === fromToken.networkId,
    );
    const networkId = addressInfo.accountInfo?.network?.id;
    const walletId = addressInfo.accountInfo?.wallet?.id;
    const indexedAccountId = addressInfo.accountInfo?.indexedAccount?.id;
    const deriveType = addressInfo.accountInfo?.deriveType;
    const account = {
      walletId,
      indexedAccountId,
      deriveType,
      networkId,
    };
    const key =
      networkId && walletId && (deriveType || indexedAccountId)
        ? [networkId, deriveType, walletId, indexedAccountId].join('-')
        : Math.random().toString();
    return {
      icon: 'WalletCryptoOutline',
      title: appLocale.intl.formatMessage(
        {
          id: ETranslations.swap_page_no_address,
        },
        { network: netInfo?.name ?? '' },
      ),
      message: appLocale.intl.formatMessage({
        id: ETranslations.swap_page_create_to_enable_network,
      }),
      alertLevel: ESwapAlertLevel.INFO,
      action: {
        actionType: ESwapAlertActionType.CREATE_ADDRESS,
        actionLabel: appLocale.intl.formatMessage({
          id: ETranslations.global_create,
        }),
        actionData: {
          num: 0,
          key,
          account,
        } as ISwapAlertActionData,
      },
    } as ISwapAlertState;
  };

  checkSwapWarning = contextAtomMethod(
    async (
      get,
      set,
      type: ESwapTabSwitchType,
      swapFromAddressInfo: ReturnType<typeof useSwapAddressInfo>,
      swapToAddressInfo: ReturnType<typeof useSwapAddressInfo>,
    ) => {
      const fromToken = this.swapDataSelectFromToken.call(set, type);
      const toToken = this.swapDataSelectToToken.call(set, type);
      const networks = get(swapNetworks());
      const swapSupportAllNetworks =
        this.swapDataNetworksIncludeAllNetwork.call(set, type);
      const quoteResult = this.swapDataQuoteCurrentSelect.call(set, type);
      const tokenMetadata = this.swapDataTokenMetaData.call(set, type);
      const quoteResultList = this.swapDataQuoteList.call(set, type);
      const quoteEventTotalCount = this.swapDataQuoteEventTotalCount.call(
        set,
        type,
      );
      const fromTokenAmount = this.swapDataFromTokenAmount.call(set, type);
      let alertsRes: ISwapAlertState[] = [];
      let rateDifferenceRes:
        | { value: string; unit: ESwapRateDifferenceUnit }
        | undefined;

      // current quote result  current token  not match
      if (
        quoteResult &&
        fromToken &&
        toToken &&
        (quoteResult?.fromTokenInfo?.networkId !== fromToken?.networkId ||
          quoteResult?.toTokenInfo?.networkId !== toToken?.networkId ||
          quoteResult?.fromTokenInfo?.contractAddress !==
            fromToken?.contractAddress ||
          quoteResult?.toTokenInfo?.contractAddress !==
            toToken?.contractAddress)
      ) {
        return;
      }

      if (
        !networks.length ||
        !swapFromAddressInfo.accountInfo?.ready ||
        (quoteEventTotalCount > 0 &&
          quoteResultList.length < quoteEventTotalCount)
      ) {
        return;
      }
      // check account
      if (!swapFromAddressInfo.accountInfo?.wallet) {
        alertsRes = [
          ...alertsRes,
          {
            message: appLocale.intl.formatMessage({
              id: ETranslations.swap_page_button_no_connected_wallet,
            }),
            alertLevel: ESwapAlertLevel.ERROR,
          },
        ];
        this.swapActionsAlerts.call(set, type, {
          states: alertsRes,
          quoteId: quoteResult?.quoteId ?? '',
        });
        return;
      }

      if (
        fromToken &&
        ((!swapFromAddressInfo.address &&
          !accountUtils.isHdWallet({
            walletId: swapFromAddressInfo.accountInfo?.wallet?.id,
          }) &&
          !accountUtils.isHwWallet({
            walletId: swapFromAddressInfo.accountInfo?.wallet?.id,
          })) ||
          accountUtils.isWatchingWallet({
            walletId: swapFromAddressInfo.accountInfo.wallet.id,
          }))
      ) {
        alertsRes = [
          ...alertsRes,
          {
            message: appLocale.intl.formatMessage({
              id: ETranslations.swap_page_alert_account_does_not_support_swap,
            }),
            alertLevel: ESwapAlertLevel.ERROR,
          },
        ];
      }

      // check from address
      if (
        fromToken &&
        !swapFromAddressInfo.address &&
        (accountUtils.isHdWallet({
          walletId: swapFromAddressInfo.accountInfo?.wallet?.id,
        }) ||
          accountUtils.isHwWallet({
            walletId: swapFromAddressInfo.accountInfo?.wallet?.id,
          }) ||
          accountUtils.isQrWallet({
            walletId: swapFromAddressInfo.accountInfo?.wallet?.id,
          }))
      ) {
        const alertAction: ISwapAlertState = this.checkAddressNeedCreate(
          swapSupportAllNetworks,
          fromToken,
          swapFromAddressInfo,
        );
        alertsRes = [...alertsRes, alertAction];
      }
      // check to address
      if (
        toToken &&
        !swapToAddressInfo.address &&
        (accountUtils.isHdWallet({
          walletId: swapToAddressInfo.accountInfo?.wallet?.id,
        }) ||
          accountUtils.isHwWallet({
            walletId: swapToAddressInfo.accountInfo?.wallet?.id,
          }) ||
          accountUtils.isQrWallet({
            walletId: swapToAddressInfo.accountInfo?.wallet?.id,
          }))
      ) {
        if (!(fromToken && fromToken.networkId === toToken.networkId)) {
          const alertAction = this.checkAddressNeedCreate(
            swapSupportAllNetworks,
            toToken,
            swapToAddressInfo,
          );
          alertsRes = [...alertsRes, alertAction];
        }
      }

      // if (quoteResult?.toAmount && !quoteResult.isBest) {
      //   // provider best check
      //   alertsRes = [
      //     ...alertsRes,
      //     {
      //       message: appLocale.intl.formatMessage({
      //         id: ETranslations.swap_page_alert_not_best_rate,
      //       }),
      //       alertLevel: ESwapAlertLevel.WARNING,
      //     },
      //   ];
      // }

      // market rate check
      if (fromToken?.price && toToken?.price && quoteResult?.instantRate) {
        const fromTokenPrice = new BigNumber(fromToken.price);
        const toTokenPrice = new BigNumber(toToken.price);
        if (!fromTokenPrice.isZero() && !toTokenPrice.isZero()) {
          const marketingRate = fromTokenPrice.dividedBy(toTokenPrice);
          const quoteRateBN = new BigNumber(quoteResult.instantRate);
          const difference = quoteRateBN
            .dividedBy(marketingRate)
            .minus(1)
            .multipliedBy(100);
          if (difference.absoluteValue().gte(swapRateDifferenceMin)) {
            let unit = ESwapRateDifferenceUnit.POSITIVE;
            if (difference.isNegative()) {
              if (difference.lte(swapRateDifferenceMax)) {
                unit = ESwapRateDifferenceUnit.NEGATIVE;
              } else {
                unit = ESwapRateDifferenceUnit.DEFAULT;
              }
            }
            rateDifferenceRes = {
              value: `(${difference.isPositive() ? '+' : ''}${
                numberFormat(difference.toFixed(), {
                  formatter: 'priceChange',
                }) as string
              })`,
              unit,
            };
          }
          if (quoteRateBN.isZero()) {
            alertsRes = [
              ...alertsRes,
              {
                title: appLocale.intl.formatMessage(
                  { id: ETranslations.swap_page_alert_value_drop_title },
                  { number: '100%' },
                ),
                message: appLocale.intl.formatMessage({
                  id: ETranslations.swap_page_alert_value_drop,
                }),
                alertLevel: ESwapAlertLevel.WARNING,
                icon: 'ActivityOutline',
                action: {
                  actionType: ESwapAlertActionType.TOKEN_DETAIL_FETCHING,
                },
              },
            ];
          } else if (difference.lt(swapRateDifferenceMax)) {
            alertsRes = [
              ...alertsRes,
              {
                title: appLocale.intl.formatMessage(
                  {
                    id: ETranslations.swap_page_alert_value_drop_title,
                  },
                  {
                    number: numberFormat(difference.absoluteValue().toFixed(), {
                      formatter: 'priceChange',
                    }) as string,
                  },
                ),
                message: appLocale.intl.formatMessage({
                  id: ETranslations.swap_page_alert_value_drop,
                }),
                alertLevel: ESwapAlertLevel.WARNING,
                icon: 'ActivityOutline',
                action: {
                  actionType: ESwapAlertActionType.TOKEN_DETAIL_FETCHING,
                },
              },
            ];
          }
        }
      }

      const fromTokenAmountBN = new BigNumber(fromTokenAmount);
      // check min max amount
      if (quoteResult && quoteResult.limit?.min) {
        const minAmountBN = new BigNumber(quoteResult.limit.min);
        if (fromTokenAmountBN.lt(minAmountBN)) {
          alertsRes = [
            ...alertsRes,
            {
              message: appLocale.intl.formatMessage(
                {
                  id: ETranslations.swap_page_alert_minimum_amount,
                },
                {
                  number: minAmountBN.toFixed(),
                  symbol: fromToken?.symbol ?? 'unknown',
                },
              ),
              alertLevel: ESwapAlertLevel.ERROR,
              inputShowError: true,
            },
          ];
        }
      }
      if (quoteResult && quoteResult.limit?.max) {
        const maxAmountBN = new BigNumber(quoteResult.limit.max);
        if (fromTokenAmountBN.gt(maxAmountBN)) {
          alertsRes = [
            ...alertsRes,
            {
              message: appLocale.intl.formatMessage(
                {
                  id: ETranslations.swap_page_alert_maximum_amount,
                },
                {
                  number: maxAmountBN.toFixed(),
                  symbol: fromToken?.symbol ?? 'unknown',
                },
              ),
              alertLevel: ESwapAlertLevel.ERROR,
              inputShowError: true,
            },
          ];
        }
      }

      const fromTokenPriceBN = new BigNumber(fromToken?.price ?? 0);
      const tokenFiatValueBN = fromTokenAmountBN.multipliedBy(fromTokenPriceBN);

      // check network fee
      const gasFeeBN = new BigNumber(
        quoteResult?.fee?.estimatedFeeFiatValue ?? 0,
      );
      if (
        !(tokenFiatValueBN.isNaN() || tokenFiatValueBN.isZero()) &&
        gasFeeBN.gt(tokenFiatValueBN)
      ) {
        alertsRes = [
          ...alertsRes,
          {
            icon: 'GasOutline',
            title: appLocale.intl.formatMessage({
              id: ETranslations.swap_page_alert_fee_exceeds_amount_title,
            }),
            message: appLocale.intl.formatMessage({
              id: ETranslations.swap_page_alert_fee_exceeds_amount,
            }),
            alertLevel: ESwapAlertLevel.WARNING,
            action: {
              actionType: ESwapAlertActionType.TOKEN_DETAIL_FETCHING,
            },
          },
        ];
      }

      if (tokenMetadata?.swapTokenMetadata) {
        const { buyToken, sellToken } = tokenMetadata.swapTokenMetadata;
        const buyTokenBuyTaxBN = new BigNumber(
          buyToken?.buyTaxBps ? buyToken?.buyTaxBps : 0,
        );
        const buyTokenSellTaxBN = new BigNumber(
          buyToken?.sellTaxBps ? buyToken?.sellTaxBps : 0,
        );
        const sellTokenBuyTaxBN = new BigNumber(
          sellToken?.buyTaxBps ? sellToken?.buyTaxBps : 0,
        );
        const sellTokenSellTaxBN = new BigNumber(
          sellToken?.sellTaxBps ? sellToken?.sellTaxBps : 0,
        );
        if (buyTokenBuyTaxBN.gt(0) || buyTokenSellTaxBN.gt(0)) {
          const actionLabel = appLocale.intl.formatMessage({
            id: buyTokenSellTaxBN.gt(buyTokenBuyTaxBN)
              ? ETranslations.swap_page_alert_tax_detected_sell
              : ETranslations.swap_page_alert_tax_detected_buy,
          });

          const showTax = BigNumber.maximum(
            buyTokenSellTaxBN,
            buyTokenBuyTaxBN,
          );
          alertsRes = [
            ...alertsRes,
            {
              icon: 'HandCoinsOutline',
              title: appLocale.intl.formatMessage(
                {
                  id: ETranslations.swap_page_alert_tax_detected_title,
                },
                {
                  percentage: `${showTax.dividedBy(100).toNumber()}%`,
                  token: `${toToken?.symbol ?? ''}`,
                  action: `${actionLabel}`,
                },
              ),
              message: appLocale.intl.formatMessage({
                id: ETranslations.swap_page_alert_tax_detected,
              }),
              alertLevel: ESwapAlertLevel.INFO,
            },
          ];
        }
        if (sellTokenBuyTaxBN.gt(0) || sellTokenSellTaxBN.gt(0)) {
          const actionLabel = appLocale.intl.formatMessage({
            id: sellTokenSellTaxBN.gt(sellTokenBuyTaxBN)
              ? ETranslations.swap_page_alert_tax_detected_sell
              : ETranslations.swap_page_alert_tax_detected_buy,
          });
          const showTax = BigNumber.maximum(
            sellTokenBuyTaxBN,
            sellTokenSellTaxBN,
          );
          alertsRes = [
            ...alertsRes,
            {
              icon: 'HandCoinsOutline',
              title: appLocale.intl.formatMessage(
                {
                  id: ETranslations.swap_page_alert_tax_detected_title,
                },
                {
                  percentage: `${showTax.dividedBy(100).toNumber()}%`,
                  token: `${fromToken?.symbol ?? ''}`,
                  action: `${actionLabel}`,
                },
              ),
              message: appLocale.intl.formatMessage({
                id: ETranslations.swap_page_alert_tax_detected,
              }),
              alertLevel: ESwapAlertLevel.INFO,
            },
          ];
        }
      }

      this.swapActionsAlerts.call(set, type, {
        states: alertsRes,
        quoteId: quoteResult?.quoteId ?? '',
      });
      this.swapActionsRateDifference.call(set, type, rateDifferenceRes);
    },
  );

  loadSwapSelectTokenDetail = contextAtomMethod(
    async (
      get,
      set,
      swapType: ESwapTabSwitchType,
      type: ESwapDirectionType,
      swapAddressInfo: ReturnType<typeof useSwapAddressInfo>,
      fetchBalance?: boolean,
    ) => {
      const token =
        type === ESwapDirectionType.FROM
          ? this.swapDataSelectFromToken.call(set, swapType)
          : this.swapDataSelectToToken.call(set, swapType);
      const accountAddress = swapAddressInfo.address;
      const accountNetworkId = swapAddressInfo.networkId;
      const accountId = swapAddressInfo.accountInfo?.account?.id;
      let balanceDisplay;
      if (
        token &&
        accountAddress &&
        accountNetworkId &&
        accountNetworkId === token?.networkId
      ) {
        if (
          token.accountAddress === accountAddress &&
          accountNetworkId === token.networkId &&
          token.balanceParsed &&
          !fetchBalance
        ) {
          const balanceParsedBN = new BigNumber(token.balanceParsed ?? 0);
          balanceDisplay = balanceParsedBN.isNaN()
            ? '0.0'
            : balanceParsedBN.toFixed();
        } else {
          try {
            const swapSelectTokenDetailFetchingPre =
              this.swapDataSelectTokenDetailFetching.call(set, swapType);
            this.swapActionsSelectTokenDetailFetching.call(set, swapType, {
              ...swapSelectTokenDetailFetchingPre,
              [type]: true,
            });
            // reset balance
            if (type === ESwapDirectionType.FROM) {
              this.swapActionsSelectedFromTokenBalance.call(set, swapType, '');
            } else {
              this.swapActionsSelectedToTokenBalance.call(set, swapType, '');
            }
            const detailInfo =
              await backgroundApiProxy.serviceSwap.fetchSwapTokenDetails({
                networkId: token.networkId,
                accountAddress,
                accountId,
                contractAddress: token.contractAddress,
                direction: type,
              });
            if (detailInfo?.[0]) {
              const balanceParsedBN = new BigNumber(
                detailInfo[0].balanceParsed ?? 0,
              );
              balanceDisplay = balanceParsedBN.isNaN()
                ? '0.0'
                : balanceParsedBN.toFixed();
              if (
                detailInfo[0].price &&
                detailInfo[0].fiatValue &&
                detailInfo[0].balanceParsed
              ) {
                if (type === ESwapDirectionType.FROM) {
                  const swapSelectFromTokenPre =
                    this.swapDataSelectFromToken.call(set, swapType);
                  if (swapSelectFromTokenPre) {
                    this.swapActionsSelectFromToken.call(set, swapType, {
                      ...swapSelectFromTokenPre,
                      price: detailInfo[0].price,
                      fiatValue: detailInfo[0].fiatValue,
                      balanceParsed: detailInfo[0].balanceParsed,
                      reservationValue: detailInfo[0].reservationValue,
                      accountAddress,
                    });
                  }
                } else {
                  const swapSelectToTokenPre = this.swapDataSelectToToken.call(
                    set,
                    swapType,
                  );
                  if (swapSelectToTokenPre) {
                    this.swapActionsSelectToToken.call(set, swapType, {
                      ...swapSelectToTokenPre,
                      price: detailInfo[0].price,
                      fiatValue: detailInfo[0].fiatValue,
                      balanceParsed: detailInfo[0].balanceParsed,
                      reservationValue: detailInfo[0].reservationValue,
                      accountAddress,
                    });
                  }
                }
              }
            }
          } catch (e: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (e?.cause !== ESwapFetchCancelCause.SWAP_TOKENS_CANCEL) {
              balanceDisplay = '0.0';
            }
          } finally {
            const swapSelectTokenDetailFetchingPre =
              this.swapDataSelectTokenDetailFetching.call(set, swapType);
            this.swapActionsSelectTokenDetailFetching.call(set, swapType, {
              ...swapSelectTokenDetailFetchingPre,
              [type]: false,
            });
          }
        }
      }
      const newToken =
        type === ESwapDirectionType.FROM
          ? this.swapDataSelectFromToken.call(set, swapType)
          : this.swapDataSelectToToken.call(set, swapType);
      if (equalTokenNoCaseSensitive({ token1: newToken, token2: token })) {
        if (type === ESwapDirectionType.FROM) {
          this.swapActionsSelectedFromTokenBalance.call(
            set,
            swapType,
            balanceDisplay ?? '',
          );
        } else {
          this.swapActionsSelectedToTokenBalance.call(
            set,
            swapType,
            balanceDisplay ?? '',
          );
        }
      }
    },
  );

  updateAllNetworkTokenList = contextAtomMethod(
    async (
      get,
      set,
      accountNetworkId: string,
      accountId?: string,
      accountAddress?: string,
      isFirstFetch?: boolean,
      allNetAccountId?: string,
    ) => {
      const result = await backgroundApiProxy.serviceSwap.fetchSwapTokens({
        networkId: accountNetworkId,
        accountNetworkId,
        accountAddress,
        accountId,
        onlyAccountTokens: true,
        isAllNetworkFetchAccountTokens: true,
      });
      if (result?.length) {
        if (isFirstFetch && allNetAccountId) {
          set(swapAllNetworkTokenListMapAtom(), (v) => {
            const oldTokens = v[allNetAccountId] ?? [];
            const newTokens =
              result.filter(
                (t) =>
                  !oldTokens?.find((tk) =>
                    equalTokenNoCaseSensitive({
                      token1: tk,
                      token2: t,
                    }),
                  ),
              ) ?? [];
            const needUpdateTokens =
              result.filter(
                (t) =>
                  !newTokens.find((tk) =>
                    equalTokenNoCaseSensitive({
                      token1: tk,
                      token2: t,
                    }),
                  ),
              ) ?? [];
            const filterTokens =
              oldTokens?.filter(
                (tk) =>
                  !needUpdateTokens.find((t) =>
                    equalTokenNoCaseSensitive({
                      token1: tk,
                      token2: t,
                    }),
                  ),
              ) ?? [];
            return {
              ...v,
              [allNetAccountId]: [
                ...filterTokens,
                ...needUpdateTokens,
                ...newTokens,
              ],
            };
          });
        } else {
          return result;
        }
      }
    },
  );

  swapLoadAllNetworkTokenList = contextAtomMethod(
    async (
      get,
      set,
      indexedAccountId?: string,
      otherWalletTypeAccountId?: string,
    ) => {
      const swapAllNetworkActionLock = get(swapAllNetworkActionLockAtom());
      if (swapAllNetworkActionLock) {
        return;
      }
      const swapSupportNetworks = get(swapNetworks());
      const { accountIdKey, swapSupportAccounts } =
        await backgroundApiProxy.serviceSwap.getSupportSwapAllAccounts({
          indexedAccountId,
          otherWalletTypeAccountId,
          swapSupportNetworks,
        });
      if (swapSupportAccounts.length > 0) {
        set(swapAllNetworkActionLockAtom(), true);
        const currentSwapAllNetworkTokenList = get(
          swapAllNetworkTokenListMapAtom(),
        )[accountIdKey];
        const accountAddressList = swapSupportAccounts.filter(
          (item) => item.apiAddress,
        );
        const requests = accountAddressList.map((networkDataString) => {
          const {
            apiAddress,
            networkId: accountNetworkId,
            accountId,
          } = networkDataString;
          return this.updateAllNetworkTokenList.call(
            set,
            accountNetworkId,
            accountId,
            apiAddress,
            !currentSwapAllNetworkTokenList,
            indexedAccountId ?? otherWalletTypeAccountId ?? '',
          );
        });

        if (!currentSwapAllNetworkTokenList) {
          await Promise.all(requests);
        } else {
          const result = await Promise.all(requests);
          const allTokensResult = (result.filter(Boolean) ?? []).flat();
          set(swapAllNetworkTokenListMapAtom(), (v) => ({
            ...v,
            [accountIdKey]: allTokensResult,
          }));
        }
        set(swapAllNetworkActionLockAtom(), false);
      } else {
        set(swapAllNetworkTokenListMapAtom(), (v) => ({
          ...v,
          [accountIdKey]: [],
        }));
      }
    },
  );

  swapTypeSwitchAction = contextAtomMethod(
    async (
      get,
      set,
      type: ESwapTabSwitchType,
      shouldEmitEvent?: boolean,
      swapAccountNetworkId?: string,
    ) => {
      console.log('swap__swapTypeSwitchAction', type);
      console.log('swap__shouldEmitEvent', shouldEmitEvent);
      set(swapTypeSwitchAtom(), type);
      if (shouldEmitEvent) {
        appEventBus.emit(EAppEventBusNames.SwapTypeSwitch, {
          type,
        });
      }
      this.swapActionsSlippagePercentageMode.call(
        set,
        type,
        ESwapSlippageSegmentKey.AUTO,
      );
      this.swapActionsManualSelectQuoteProviders.call(set, type);
      const swapSupportNetworks = this.swapDataNetworksIncludeAllNetwork.call(
        set,
        type,
      );
      let accountNetworkId = swapAccountNetworkId;
      const fromToken = this.swapDataSelectFromToken.call(set, type);
      if (fromToken?.networkId !== accountNetworkId) {
        accountNetworkId = fromToken?.networkId;
      }
      const toToken = this.swapDataSelectToToken.call(set, type);
      const fromNetworkDefault = swapDefaultSetTokens[accountNetworkId ?? ''];
      if (
        fromToken &&
        !swapSupportNetworks.some(
          (net) => net.networkId === fromToken?.networkId,
        )
      ) {
        void this.resetSwapTokenData.call(set, type, ESwapDirectionType.FROM);
      }
      if (
        toToken &&
        !swapSupportNetworks.some((net) => net.networkId === toToken?.networkId)
      ) {
        void this.resetSwapTokenData.call(set, type, ESwapDirectionType.TO);
      }
      if (
        swapSupportNetworks.some((net) => net.networkId === accountNetworkId)
      ) {
        if (type === ESwapTabSwitchType.BRIDGE) {
          let shouldSetFromToken = null;
          if (fromToken) {
            shouldSetFromToken = fromToken;
          }
          if (!fromToken && toToken?.networkId !== accountNetworkId) {
            if (fromNetworkDefault?.fromToken?.isNative) {
              shouldSetFromToken = fromNetworkDefault?.fromToken;
              this.swapActionsSelectFromToken.call(
                set,
                type,
                fromNetworkDefault?.fromToken,
              );
            }
          }
          console.log('swap__shouldSetFromToken', shouldSetFromToken);
          console.log('swap__toToken', toToken);
          console.log('swap__type', type);
          if (shouldSetFromToken) {
            const needChangeToToken = this.needChangeToken({
              token: shouldSetFromToken,
              toToken,
              swapTypeSwitchValue: type,
            });
            console.log('swap__needChangeToToken', needChangeToToken);
            if (needChangeToToken) {
              this.swapActionsSelectToToken.call(set, type, needChangeToToken);
              void this.syncNetworksSort.call(set, needChangeToToken.networkId);
            }
          }
        } else if (type === ESwapTabSwitchType.SWAP) {
          if (
            !fromToken &&
            fromNetworkDefault?.fromToken?.isNative &&
            !toToken?.isNative
          ) {
            this.swapActionsSelectFromToken.call(
              set,
              type,
              fromNetworkDefault?.fromToken,
            );
          }
          if (toToken?.networkId !== fromToken?.networkId) {
            if (
              !fromToken?.isNative &&
              fromNetworkDefault?.fromToken &&
              fromNetworkDefault?.fromToken?.isNative
            ) {
              this.swapActionsSelectToToken.call(
                set,
                type,
                fromNetworkDefault?.fromToken,
              );
              void this.syncNetworksSort.call(
                set,
                fromNetworkDefault.fromToken?.networkId,
              );
            } else if (
              fromToken?.isNative &&
              fromNetworkDefault.toToken &&
              !fromNetworkDefault.toToken.isNative
            ) {
              this.swapActionsSelectToToken.call(
                set,
                type,
                fromNetworkDefault?.toToken,
              );
              void this.syncNetworksSort.call(
                set,
                fromNetworkDefault?.toToken?.networkId,
              );
            } else {
              void this.resetSwapTokenData.call(
                set,
                type,
                ESwapDirectionType.TO,
              );
            }
          }
        }
      }
    },
  );

  // data---
  swapDataSelectFromToken = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data: ISwapToken | undefined;
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapSelectFromTokenAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeSelectFromTokenAtom());
      }
      return data;
    },
  );

  swapDataSelectToToken = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data: ISwapToken | undefined;
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapSelectToTokenAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeSelectToTokenAtom());
      }
      return data;
    },
  );

  swapDataShouldRefreshQuote = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data = false;
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapShouldRefreshQuoteAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeShouldRefreshQuoteAtom());
      }
      return data;
    },
  );

  swapDataQuoteActionLock = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data = { actionLock: false };
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapQuoteActionLockAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeQuoteActionLockAtom());
      }
      return data;
    },
  );

  swapDataQuoteIntervalCount = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data = 0;
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapQuoteIntervalCountAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeQuoteIntervalCountAtom());
      }
      return data;
    },
  );

  swapDataQuoteList = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data: IFetchQuoteResult[] = [];
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapQuoteListAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeQuoteListAtom());
      }
      return data;
    },
  );

  swapDataSortedQuoteList = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      const list = this.swapDataQuoteList.call(set, type);
      const sortType = this.swapDataProviderSortType.call(set, type);
      const fromTokenAmount = this.swapDataFromTokenAmount.call(set, type);
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
    },
  );

  swapDataQuoteCurrentSelect = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let res: IFetchQuoteResult | undefined;
      const list = this.swapDataSortedQuoteList.call(set, type);
      const manualSelectQuoteProvider =
        this.swapDataManualSelectQuoteProvider.call(set, type);
      const manualSelectQuoteResult = list.find(
        (item) =>
          item.info.provider === manualSelectQuoteProvider?.info.provider &&
          item.info.providerName ===
            manualSelectQuoteProvider?.info.providerName,
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
    },
  );

  swapDataAutoSlippageSuggestedValue = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data: ISwapAutoSlippageSuggestedValue | undefined;
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapAutoSlippageSuggestedValueAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeAutoSlippageSuggestedValueAtom());
      }
      return data;
    },
  );

  swapDataFromTokenAmount = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data = '';
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapFromTokenAmountAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeFromTokenAmountAtom());
      }
      return data;
    },
  );

  swapDataManualSelectQuoteProvider = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data: IFetchQuoteResult | undefined;
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapManualSelectQuoteProvidersAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeManualSelectQuoteProvidersAtom());
      }
      return data;
    },
  );

  swapDataProviderSortType = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data = ESwapProviderSort.RECOMMENDED;
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapProviderSortAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeProviderSortAtom());
      }
      return data;
    },
  );

  swapDataSlippagePercentageMode = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data = ESwapSlippageSegmentKey.AUTO;
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapSlippagePercentageModeAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeSlippagePercentageModeAtom());
      }
      return data;
    },
  );

  swapDataSlippagePercentageCustomValue = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data = swapSlippageAutoValue;
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapSlippagePercentageCustomValueAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapSwapSlippagePercentageCustomValueAtom());
      }
      return data;
    },
  );

  swapDataSlippagePercentage = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      const mode = this.swapDataSlippagePercentageMode.call(set, type);
      const customValue = this.swapDataSlippagePercentageCustomValue.call(
        set,
        type,
      );
      const quoteResult = this.swapDataQuoteCurrentSelect.call(set, type);
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
    },
  );

  swapDataTokenMetaData = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      const quoteList = this.swapDataQuoteList.call(set, type);
      const swapTokenMetadata = quoteList.find(
        (item) => item.tokenMetadata,
      )?.tokenMetadata;

      return { swapTokenMetadata };
    },
  );

  swapDataQuoteEventTotalCount = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data = 0;
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapQuoteEventTotalCountAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeQuoteEventTotalCountAtom());
      }
      return data;
    },
  );

  swapDataNetworksIncludeAllNetwork = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      const networks = get(swapNetworks());
      const typeNetworks = networks.filter((net) =>
        type === ESwapTabSwitchType.BRIDGE
          ? net.supportCrossChainSwap
          : net.supportSingleSwap,
      );
      const allNetwork = {
        networkId: getNetworkIdsMap().onekeyall,
        name: dangerAllNetworkRepresent.name,
        symbol: dangerAllNetworkRepresent.symbol,
        logoURI: dangerAllNetworkRepresent.logoURI,
        shortcode: dangerAllNetworkRepresent.shortcode,
        isAllNetworks: true,
      };
      return [allNetwork, ...typeNetworks];
    },
  );

  swapDataSelectTokenDetailFetching = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType) => {
      let data = { from: false, to: false };
      if (type === ESwapTabSwitchType.SWAP) {
        data = get(swapSwapSelectTokenDetailFetchingAtom());
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        data = get(swapBridgeSelectTokenDetailFetchingAtom());
      }
      return data;
    },
  );

  // actions---
  swapActionsSlippageDialogOpening = contextAtomMethod(
    (
      get,
      set,
      type: ESwapTabSwitchType,
      data: { status: boolean; flag?: string | undefined },
    ) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapSlippageDialogOpeningAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeSlippageDialogOpeningAtom(), data);
      }
    },
  );

  swapActionsSlippagePercentageCustomValue = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: number) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapSlippagePercentageCustomValueAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeSlippagePercentageCustomValueAtom(), data);
      }
    },
  );

  swapActionsSlippagePercentageMode = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: ESwapSlippageSegmentKey) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapSlippagePercentageModeAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeSlippagePercentageModeAtom(), data);
      }
    },
  );

  swapActionsManualSelectQuoteProviders = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data?: IFetchQuoteResult) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapManualSelectQuoteProvidersAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeManualSelectQuoteProvidersAtom(), data);
      }
    },
  );

  swapActionsFromTokenAmount = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: string) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapFromTokenAmountAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeFromTokenAmountAtom(), data);
      }
    },
  );

  swapActionsSelectFromToken = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data?: ISwapToken) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapSelectFromTokenAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeSelectFromTokenAtom(), data);
      }
    },
  );

  swapActionsSelectToToken = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data?: ISwapToken) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapSelectToTokenAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeSelectToTokenAtom(), data);
      }
    },
  );

  swapActionsSelectedFromTokenBalance = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: string) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapSelectedFromTokenBalanceAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeSelectedFromTokenBalanceAtom(), data);
      }
    },
  );

  swapActionsSelectedToTokenBalance = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: string) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapSelectedToTokenBalanceAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeSelectedToTokenBalanceAtom(), data);
      }
    },
  );

  swapActionsQuoteList = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: IFetchQuoteResult[]) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapQuoteListAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeQuoteListAtom(), data);
      }
    },
  );

  swapActionsRateDifference = contextAtomMethod(
    (
      get,
      set,
      type: ESwapTabSwitchType,
      data?: {
        value: string;
        unit: ESwapRateDifferenceUnit;
      },
    ) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(rateSwapDifferenceAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(rateBridgeDifferenceAtom(), data);
      }
    },
  );

  swapActionsQuoteActionLock = contextAtomMethod(
    (
      get,
      set,
      type: ESwapTabSwitchType,
      data: {
        actionLock: boolean;
        fromToken?: ISwapToken;
        toToken?: ISwapToken;
        fromTokenAmount?: string;
        accountId?: string;
        address?: string;
      },
    ) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapQuoteActionLockAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeQuoteActionLockAtom(), data);
      }
    },
  );

  swapActionsQuoteFetching = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: boolean) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapQuoteFetchingAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeQuoteFetchingAtom(), data);
      }
    },
  );

  swapActionsQuoteEventTotalCount = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: number) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapQuoteEventTotalCountAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeQuoteEventTotalCountAtom(), data);
      }
    },
  );

  swapActionsSilenceQuoteLoading = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: boolean) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapSilenceQuoteLoading(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeSilenceQuoteLoading(), data);
      }
    },
  );

  swapActionsQuoteIntervalCount = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: number) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapQuoteIntervalCountAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeQuoteIntervalCountAtom(), data);
      }
    },
  );

  swapActionsAutoSlippageSuggestedValue = contextAtomMethod(
    (
      get,
      set,
      type: ESwapTabSwitchType,
      data?: ISwapAutoSlippageSuggestedValue,
    ) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapAutoSlippageSuggestedValueAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeAutoSlippageSuggestedValueAtom(), data);
      }
    },
  );

  swapActionsBuildTxFetching = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: boolean) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapBuildTxFetchingAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeBuildTxFetchingAtom(), data);
      }
    },
  );

  swapActionsShouldRefreshQuote = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: boolean) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapShouldRefreshQuoteAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeShouldRefreshQuoteAtom(), data);
      }
    },
  );

  swapActionsAlerts = contextAtomMethod(
    (
      get,
      set,
      type: ESwapTabSwitchType,
      data: {
        states: ISwapAlertState[];
        quoteId: string;
      },
    ) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapAlertsAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeAlertsAtom(), data);
      }
    },
  );

  swapActionsSelectTokenDetailFetching = contextAtomMethod(
    (
      get,
      set,
      type: ESwapTabSwitchType,
      data: { from: boolean; to: boolean },
    ) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapSelectTokenDetailFetchingAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeSelectTokenDetailFetchingAtom(), data);
      }
    },
  );

  swapActionsQuoteApproveAllowanceUnLimit = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: boolean) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapQuoteApproveAllowanceUnLimitAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeQuoteApproveAllowanceUnLimitAtom(), data);
      }
    },
  );

  swapActionsApproveAllowanceSelectOpen = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: boolean) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapApproveAllowanceSelectOpenAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeApproveAllowanceSelectOpenAtom(), data);
      }
    },
  );

  swapActionsProviderSort = contextAtomMethod(
    (get, set, type: ESwapTabSwitchType, data: ESwapProviderSort) => {
      if (type === ESwapTabSwitchType.SWAP) {
        set(swapSwapProviderSortAtom(), data);
      }
      if (type === ESwapTabSwitchType.BRIDGE) {
        set(swapBridgeProviderSortAtom(), data);
      }
    },
  );
}

const createActions = memoFn(() => new ContentJotaiActionsSwap());

export const useSwapActions = () => {
  const actions = createActions();
  const selectFromToken = actions.selectFromToken.use();
  const selectToToken = actions.selectToToken.use();
  const alternationToken = actions.alternationToken.use();
  const syncNetworksSort = actions.syncNetworksSort.use();
  const catchSwapTokensMap = actions.catchSwapTokensMap.use();
  const recoverQuoteInterval = actions.recoverQuoteInterval.use();
  const quoteAction = actions.quoteAction.use();
  const approvingStateAction = actions.approvingStateAction.use();
  const checkSwapWarning = debounce(actions.checkSwapWarning.use(), 300, {
    leading: true,
  });
  const tokenListFetchAction = actions.tokenListFetchAction.use();
  const quoteEventHandler = actions.quoteEventHandler.use();
  const loadSwapSelectTokenDetail = debounce(
    actions.loadSwapSelectTokenDetail.use(),
    200,
    {
      leading: true,
    },
  );
  const swapLoadAllNetworkTokenList = actions.swapLoadAllNetworkTokenList.use();
  const swapTypeSwitchAction = actions.swapTypeSwitchAction.use();
  const {
    cleanQuoteInterval,
    cleanApprovingInterval,
    closeQuoteEvent,
    needChangeToken,
  } = actions;

  // data
  const swapDataSelectFromToken = actions.swapDataSelectFromToken.use();
  const swapDataSelectToToken = actions.swapDataSelectToToken.use();

  // actions
  const swapActionsSlippageDialogOpening =
    actions.swapActionsSlippageDialogOpening.use();

  const swapActionsSlippagePercentageCustomValue =
    actions.swapActionsSlippagePercentageCustomValue.use();
  const swapActionsSlippagePercentageMode =
    actions.swapActionsSlippagePercentageMode.use();

  const swapActionsFromTokenAmount = actions.swapActionsFromTokenAmount.use();

  const swapActionsQuoteApproveAllowanceUnLimit =
    actions.swapActionsQuoteApproveAllowanceUnLimit.use();
  const swapActionsApproveAllowanceSelectOpen =
    actions.swapActionsApproveAllowanceSelectOpen.use();

  const swapActionsManualSelectQuoteProviders =
    actions.swapActionsManualSelectQuoteProviders.use();

  const swapActionsProviderSort = actions.swapActionsProviderSort.use();

  const swapActionsQuoteList = actions.swapActionsQuoteList.use();

  const swapActionsQuoteEventTotalCount =
    actions.swapActionsQuoteEventTotalCount.use();

  const swapActionsBuildTxFetching = actions.swapActionsBuildTxFetching.use();

  const swapActionsShouldRefreshQuote =
    actions.swapActionsShouldRefreshQuote.use();

  const swapActionsSelectFromToken = actions.swapActionsSelectFromToken.use();
  const swapActionsSelectToToken = actions.swapActionsSelectToToken.use();

  return useRef({
    selectFromToken,
    quoteAction,
    selectToToken,
    alternationToken,
    syncNetworksSort,
    catchSwapTokensMap,
    cleanQuoteInterval,
    cleanApprovingInterval,
    approvingStateAction,
    tokenListFetchAction,
    recoverQuoteInterval,
    checkSwapWarning,
    loadSwapSelectTokenDetail,
    quoteEventHandler,
    swapLoadAllNetworkTokenList,
    closeQuoteEvent,
    swapTypeSwitchAction,
    swapActionsSlippageDialogOpening,
    swapActionsSlippagePercentageCustomValue,
    swapActionsSlippagePercentageMode,
    swapActionsFromTokenAmount,
    swapDataSelectFromToken,
    swapDataSelectToToken,
    swapActionsQuoteApproveAllowanceUnLimit,
    swapActionsApproveAllowanceSelectOpen,
    swapActionsManualSelectQuoteProviders,
    swapActionsProviderSort,
    swapActionsQuoteList,
    swapActionsQuoteEventTotalCount,
    swapActionsBuildTxFetching,
    swapActionsShouldRefreshQuote,
    swapActionsSelectFromToken,
    swapActionsSelectToToken,
    needChangeToken,
  });
};
