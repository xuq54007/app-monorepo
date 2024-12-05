import { useCallback, useRef } from 'react';

import useAppNavigation from '@onekeyhq/kit/src/hooks/useAppNavigation';
import type { IAccountSelectorActiveAccountInfo } from '@onekeyhq/kit/src/states/jotai/contexts/accountSelector';
import {
  EModalRoutes,
  EModalWalletAddressRoutes,
} from '@onekeyhq/shared/src/routes';
import networkUtils from '@onekeyhq/shared/src/utils/networkUtils';

export const useAllNetworkCopyAddressHandler = ({
  activeAccount,
}: {
  activeAccount: IAccountSelectorActiveAccountInfo;
}) => {
  const { account, indexedAccount, network, wallet } = activeAccount;
  const activeAccountRef = useRef(activeAccount);
  activeAccountRef.current = activeAccount;

  const appNavigation = useAppNavigation();
  const isAllNetworkEnabled =
    network &&
    networkUtils.isAllNetwork({ networkId: network.id }) &&
    indexedAccount !== undefined;

  const handleAllNetworkCopyAddress = useCallback(async () => {
    console.log(activeAccountRef.current);
    if (!indexedAccount) {
      return;
    }
    const accountId = account?.id;
    // if (!accountId) {
    //   const allNetworkMockedAccount =
    //     await backgroundApiProxy.serviceAccount.getMockedAllNetworkAccount({
    //       indexedAccountId: indexedAccount.id,
    //     });
    //   accountId = allNetworkMockedAccount.id;
    // }
    appNavigation.pushModal(EModalRoutes.WalletAddress, {
      screen: EModalWalletAddressRoutes.WalletAddress,
      params: {
        accountId,
        indexedAccountId: indexedAccount.id,
        walletId: wallet?.id,
      },
    });
  }, [appNavigation, account, indexedAccount, wallet]);

  return {
    isAllNetworkEnabled,
    handleAllNetworkCopyAddress,
  };
};
