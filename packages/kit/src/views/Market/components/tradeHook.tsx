import { useCallback, useMemo, useRef, useState } from 'react';

import { useIntl } from 'react-intl';

import type { IPageNavigationProp } from '@onekeyhq/components';
import { Dialog, SizableText } from '@onekeyhq/components';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import { defaultLogger } from '@onekeyhq/shared/src/logger/logger';
import {
  EModalStakingRoutes,
  type IModalSwapParamList,
} from '@onekeyhq/shared/src/routes';
import { EModalRoutes } from '@onekeyhq/shared/src/routes/modal';
import { EModalSwapRoutes } from '@onekeyhq/shared/src/routes/swap';
import { openUrlExternal } from '@onekeyhq/shared/src/utils/openUrlUtils';
import timerUtils from '@onekeyhq/shared/src/utils/timerUtils';
import { isSupportStaking } from '@onekeyhq/shared/types/earn/earnProvider.constants';
import type { IFiatCryptoType } from '@onekeyhq/shared/types/fiatCrypto';
import type {
  IMarketDetailPlatformNetwork,
  IMarketTokenDetail,
} from '@onekeyhq/shared/types/market';
import { getNetworkIdBySymbol } from '@onekeyhq/shared/types/market/marketProvider.constants';
import { ESwapTabSwitchType } from '@onekeyhq/shared/types/swap/types';

import backgroundApiProxy from '../../../background/instance/backgroundApiProxy';
import useAppNavigation from '../../../hooks/useAppNavigation';
import { useActiveAccount } from '../../../states/jotai/contexts/accountSelector';

export const useMarketTradeNetwork = (token: IMarketTokenDetail | null) => {
  const { detailPlatforms, platforms = {} } = token || {};
  const network = useMemo(() => {
    if (detailPlatforms) {
      const values = Object.values(detailPlatforms);
      const nativePlatform = values.find((i) => i.isNative);
      if (nativePlatform) {
        return nativePlatform;
      }

      const tokenAddress = Object.values(platforms)[0];
      const tokenAddressPlatform = values.find(
        (i) => i.tokenAddress === tokenAddress,
      );
      return tokenAddressPlatform ?? values[0];
    }
  }, [detailPlatforms, platforms]);
  return network;
};

export const useMarketTradeNetworkId = (
  network: IMarketDetailPlatformNetwork | null | undefined,
  symbol: string,
) =>
  useMemo(() => {
    const { onekeyNetworkId } = network || {};
    return onekeyNetworkId ?? getNetworkIdBySymbol(symbol);
  }, [network, symbol]);

export const useMarketTradeActions = (token: IMarketTokenDetail | null) => {
  const { symbol = '', name } = token || {};
  const intl = useIntl();
  const network = useMarketTradeNetwork(token);
  const networkId = useMarketTradeNetworkId(network, symbol);

  const navigation =
    useAppNavigation<IPageNavigationProp<IModalSwapParamList>>();

  const { activeAccount } = useActiveAccount({ num: 0 });

  const contractAddress = useMemo(
    () => network?.contract_address ?? '',
    [network],
  );

  const { isNative = false, tokenAddress: realContractAddress = '' } =
    network || {};

  const remindUnsupportedToken = useCallback(
    (action: 'buy' | 'sell' | 'trade', showDialog = true) => {
      defaultLogger.market.token.unsupportedToken({ name: symbol, action });
      if (showDialog) {
        Dialog.confirm({
          title: intl.formatMessage({
            id: ETranslations.earn_unsupported_token,
          }),
          tone: 'warning',
          icon: 'ErrorOutline',
          renderContent: (
            <SizableText size="$bodyLg">
              {intl.formatMessage({
                id: ETranslations.earn_unsupported_token_desc,
              })}
            </SizableText>
          ),
          onConfirmText: intl.formatMessage({
            id: ETranslations.explore_got_it,
          }),
        });
      }
    },
    [intl, symbol],
  );

  const handleBuyOrSell = useCallback(
    async (type: IFiatCryptoType) => {
      if (!activeAccount.account || !networkId) {
        return;
      }

      const isSupported =
        await backgroundApiProxy.serviceFiatCrypto.isTokenSupported({
          networkId,
          tokenAddress: realContractAddress,
          type,
        });

      if (!isSupported) {
        remindUnsupportedToken(type);
        return;
      }

      const deriveType =
        await backgroundApiProxy.serviceNetwork.getGlobalDeriveTypeOfNetwork({
          networkId,
        });
      const dbAccount =
        await backgroundApiProxy.serviceAccount.getNetworkAccount({
          accountId: undefined,
          indexedAccountId: activeAccount.account.indexedAccountId,
          networkId,
          deriveType,
        });
      const { url, build } =
        await backgroundApiProxy.serviceFiatCrypto.generateWidgetUrl({
          networkId,
          tokenAddress: realContractAddress,
          accountId: dbAccount.id,
          type,
        });
      if (!url || !build) {
        remindUnsupportedToken(type);
        return;
      }
      openUrlExternal(url);
    },
    [
      activeAccount.account,
      networkId,
      realContractAddress,
      remindUnsupportedToken,
    ],
  );

  const handleSwap = useCallback(
    async (mode?: 'modal' | 'button') => {
      const navigateToSwapPage = (
        params: IModalSwapParamList[EModalSwapRoutes.SwapMainLand],
      ) => {
        if (mode === 'modal') {
          navigation.replace(EModalSwapRoutes.SwapMainLand, params);
        } else {
          navigation.pushModal(EModalRoutes.SwapModal, {
            screen: EModalSwapRoutes.SwapMainLand,
            params,
          });
        }
      };
      if (!networkId) {
        remindUnsupportedToken('trade', false);
        navigateToSwapPage({
          importNetworkId: 'unknown',
        });
        return;
      }
      const { isSupportSwap, isSupportCrossChain } =
        await backgroundApiProxy.serviceSwap.checkSupportSwap({
          networkId,
          contractAddress: isNative ? realContractAddress : contractAddress,
        });

      if (!isSupportSwap && !isSupportCrossChain) {
        remindUnsupportedToken('trade', false);
        navigateToSwapPage({
          importNetworkId: networkId,
        });
        return;
      }
      const onekeyNetwork = await backgroundApiProxy.serviceNetwork.getNetwork({
        networkId,
      });
      navigateToSwapPage({
        importFromToken: {
          ...onekeyNetwork,
          logoURI: isNative ? onekeyNetwork.logoURI : undefined,
          contractAddress: realContractAddress,
          networkId,
          isNative,
          networkLogoURI: onekeyNetwork.logoURI,
          symbol: symbol.toUpperCase(),
          name,
        },
        swapTabSwitchType: isSupportSwap
          ? ESwapTabSwitchType.SWAP
          : ESwapTabSwitchType.BRIDGE,
      });
    },
    [
      contractAddress,
      isNative,
      name,
      navigation,
      networkId,
      realContractAddress,
      remindUnsupportedToken,
      symbol,
    ],
  );

  const handleStaking = useCallback(() => {
    if (networkId && activeAccount.account) {
      navigation.pushModal(EModalRoutes.StakingModal, {
        screen: EModalStakingRoutes.AssetProtocolList,
        params: {
          networkId,
          accountId: activeAccount.account?.id,
          indexedAccountId: activeAccount.indexedAccount?.id,
          symbol,
        },
      });
    }
  }, [
    activeAccount.account,
    activeAccount.indexedAccount,
    navigation,
    networkId,
    symbol,
  ]);
  const canStaking = useMemo(() => isSupportStaking(symbol), [symbol]);

  return useMemo(
    () => ({
      onSwap: handleSwap,
      onStaking: handleStaking,
      onBuy: () => handleBuyOrSell('buy'),
      onSell: () => handleBuyOrSell('sell'),
      canStaking,
    }),
    [canStaking, handleBuyOrSell, handleStaking, handleSwap],
  );
};

type IActionName = 'onSwap' | 'onStaking' | 'onBuy' | 'onSell';
export const useLazyMarketTradeActions = (coinGeckoId: string) => {
  const [token, setToken] = useState<null | IMarketTokenDetail>(null);
  const fetchMarketTokenDetail = useCallback(async () => {
    const response =
      await backgroundApiProxy.serviceMarket.fetchMarketTokenDetail(
        coinGeckoId,
      );
    setToken(response);
  }, [coinGeckoId]);

  const actions = useMarketTradeActions(token);
  const actionsRef = useRef(actions);
  actionsRef.current = actions;
  const compose = useCallback(
    async (actionName: IActionName) => {
      await fetchMarketTokenDetail();
      // wait for token detail loaded and actionsRef updated
      await timerUtils.wait(80);
      await actionsRef.current[actionName]('modal');
    },
    [fetchMarketTokenDetail],
  );

  const navigation =
    useAppNavigation<IPageNavigationProp<IModalSwapParamList>>();
  const handleSwapLazyModal = useCallback(() => {
    navigation.pushModal(EModalRoutes.SwapModal, {
      screen: EModalSwapRoutes.SwapLazyMarketModal,
      params: {
        coinGeckoId,
      },
    });
  }, [coinGeckoId, navigation]);

  return useMemo(
    () => ({
      onSwap: () => compose('onSwap'),
      onSwapLazyModal: handleSwapLazyModal,
      onStaking: () => compose('onStaking'),
      onBuy: () => compose('onBuy'),
      onSell: () => compose('onSell'),
    }),
    [compose, handleSwapLazyModal],
  );
};
