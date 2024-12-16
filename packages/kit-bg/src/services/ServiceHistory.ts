import { isNil, unionBy } from 'lodash';

import type { IEncodedTx } from '@onekeyhq/core/src/types';
import type ILightningVault from '@onekeyhq/kit-bg/src/vaults/impls/lightning/Vault';
import {
  backgroundClass,
  backgroundMethod,
} from '@onekeyhq/shared/src/background/backgroundDecorators';
import { getNetworkIdsMap } from '@onekeyhq/shared/src/config/networkIds';
import type { OneKeyServerApiError } from '@onekeyhq/shared/src/errors';
import accountUtils from '@onekeyhq/shared/src/utils/accountUtils';
import {
  getOnChainHistoryTxStatus,
  isAccountCompatibleWithTx,
} from '@onekeyhq/shared/src/utils/historyUtils';
import networkUtils from '@onekeyhq/shared/src/utils/networkUtils';
import { EServiceEndpointEnum } from '@onekeyhq/shared/types/endpoint';
import type {
  IAccountHistoryTx,
  IAllNetworkHistoryExtraItem,
  IChangedPendingTxInfo,
  IFetchAccountHistoryParams,
  IFetchAccountHistoryResp,
  IFetchHistoryTxDetailsParams,
  IFetchTxDetailsParams,
  IOnChainHistoryTx,
  IOnChainHistoryTxNFT,
  IOnChainHistoryTxToken,
  IServerFetchAccountHistoryDetailParams,
} from '@onekeyhq/shared/types/history';
import { EOnChainHistoryTxStatus } from '@onekeyhq/shared/types/history';
import { ESwapTxHistoryStatus } from '@onekeyhq/shared/types/swap/types';
import type {
  IReplaceTxInfo,
  ISendTxOnSuccessData,
} from '@onekeyhq/shared/types/tx';
import { EDecodedTxStatus, EReplaceTxType } from '@onekeyhq/shared/types/tx';

import simpleDb from '../dbs/simple/simpleDb';
import { vaultFactory } from '../vaults/factory';

import ServiceBase from './ServiceBase';

import type { IAllNetworkAccountInfo } from './ServiceAllNetwork/ServiceAllNetwork';
import type { IDBAccount } from '../dbs/local/types';

@backgroundClass()
class ServiceHistory extends ServiceBase {
  constructor({ backgroundApi }: { backgroundApi: any }) {
    super({ backgroundApi });
  }

  @backgroundMethod()
  public async fetchAccountHistory(params: IFetchAccountHistoryParams) {
    const { accountId, networkId, tokenIdOnNetwork } = params;
    let dbAccount;
    try {
      dbAccount = await this.backgroundApi.serviceAccount.getDBAccount({
        accountId,
      });
    } catch (error) {
      dbAccount = undefined;
    }
    const [accountAddress, xpub] = await Promise.all([
      this.backgroundApi.serviceAccount.getAccountAddressForApi({
        dbAccount,
        accountId,
        networkId,
      }),
      this.backgroundApi.serviceAccount.getAccountXpub({
        dbAccount,
        accountId,
        networkId,
      }),
    ]);

    const isAllNetworks = networkUtils.isAllNetwork({ networkId });

    let onChainHistoryTxs: IAccountHistoryTx[] = [];
    let localHistoryConfirmedTxs: IAccountHistoryTx[] = [];
    let localHistoryPendingTxs: IAccountHistoryTx[] = [];
    let accounts: IAllNetworkAccountInfo[] = [];
    let allAccounts: IAllNetworkAccountInfo[] = [];

    if (isAllNetworks) {
      const resp =
        await this.backgroundApi.serviceAllNetwork.getAllNetworkAccountsWithEnabledNetworks(
          {
            accountId,
            networkId,
          },
        );
      accounts = resp.accountsInfo;
      allAccounts = resp.allAccountsInfo;
    }

    // 1. Get the locally pending transactions

    if (isAllNetworks) {
      const allNetworksParams = accounts.map((account) => ({
        networkId: account.networkId,
        accountAddress: account.apiAddress,
        xpub: account.accountXpub,
      }));

      localHistoryPendingTxs = await this.getAccountsLocalHistoryPendingTxs(
        allNetworksParams,
      );
    } else {
      localHistoryPendingTxs = await this.getAccountLocalHistoryPendingTxs({
        networkId,
        accountAddress,
        xpub,
        tokenIdOnNetwork,
      });
    }

    // 2. Check if the locally pending transactions have been confirmed

    // Confirmed transactions
    const confirmedTxs: IAccountHistoryTx[] = [];
    // Transactions still in pending status
    const pendingTxs: IAccountHistoryTx[] = [];

    // Fetch details of locally pending transactions
    const onChainHistoryTxsDetails = await Promise.all(
      localHistoryPendingTxs.map((tx) =>
        this.fetchHistoryTxDetails({
          accountId: tx.decodedTx.accountId,
          networkId: tx.decodedTx.networkId,
          txid: tx.decodedTx.txid,
        }),
      ),
    );

    for (const localHistoryPendingTx of localHistoryPendingTxs) {
      const confirmedTx = onChainHistoryTxsDetails.find(
        (txDetails) =>
          localHistoryPendingTx.decodedTx.txid === txDetails?.data.tx &&
          (txDetails.data.status === EOnChainHistoryTxStatus.Success ||
            txDetails.data.status === EOnChainHistoryTxStatus.Failed),
      );

      if (confirmedTx) {
        const confirmedTxNetworkId = localHistoryPendingTx.decodedTx.networkId;
        const vaultSettings =
          await this.backgroundApi.serviceNetwork.getVaultSettings({
            networkId: confirmedTxNetworkId,
          });
        let fixedLocalHistoryId: string | undefined;
        const remoteTxId = confirmedTx.data.eventId || confirmedTx.data.tx;
        // If the vault uses the remote transaction ID, the local transaction ID needs to be fixed, like Ton
        if (vaultSettings.useRemoteTxId) {
          const confirmedTxAccountAddress =
            await this.backgroundApi.serviceAccount.getAccountAddressForApi({
              accountId: localHistoryPendingTx.decodedTx.accountId,
              networkId: confirmedTxNetworkId,
            });
          fixedLocalHistoryId = accountUtils.buildLocalHistoryId({
            networkId: localHistoryPendingTx.decodedTx.networkId,
            accountAddress: confirmedTxAccountAddress,
            txid: remoteTxId,
          });
        }
        confirmedTxs.push({
          ...localHistoryPendingTx,
          originalId: localHistoryPendingTx.id,
          id: vaultSettings.useRemoteTxId
            ? fixedLocalHistoryId || localHistoryPendingTx.id
            : localHistoryPendingTx.id,
          decodedTx: {
            ...localHistoryPendingTx.decodedTx,
            txid: vaultSettings.useRemoteTxId
              ? remoteTxId
              : localHistoryPendingTx.decodedTx.txid,
            originalTxId: localHistoryPendingTx.decodedTx.originalTxId,
            status:
              confirmedTx?.data.status === EOnChainHistoryTxStatus.Success
                ? EDecodedTxStatus.Confirmed
                : EDecodedTxStatus.Failed,
            totalFeeInNative: isNil(confirmedTx.data.gasFee)
              ? localHistoryPendingTx.decodedTx.totalFeeInNative
              : confirmedTx.data.gasFee,
            totalFeeFiatValue: isNil(confirmedTx.data.gasFeeFiatValue)
              ? localHistoryPendingTx.decodedTx.totalFeeFiatValue
              : confirmedTx.data.gasFeeFiatValue,
            isFinal: true,
          },
        });
      } else {
        pendingTxs.push(localHistoryPendingTx);
      }
    }

    // 3. Get the locally confirmed transactions
    if (isAllNetworks) {
      const allNetworksParams = accounts.map((account) => ({
        networkId: account.networkId,
        accountAddress: account.apiAddress,
        xpub: account.accountXpub,
      }));

      localHistoryConfirmedTxs = await this.getAccountsLocalHistoryConfirmedTxs(
        allNetworksParams,
      );
    } else {
      localHistoryConfirmedTxs = await this.getAccountLocalHistoryConfirmedTxs({
        networkId,
        accountAddress,
        xpub,
        tokenIdOnNetwork,
      });
    }

    // 4. Fetch the on-chain history
    onChainHistoryTxs = await this.fetchAccountOnChainHistory({
      ...params,
      isAllNetworks,
      accountAddress,
      xpub,
    });

    // 5. Merge the just-confirmed transactions, locally confirmed transactions, and on-chain history

    // Merge the locally confirmed transactions and the just-confirmed transactions
    const mergedConfirmedTxs = unionBy(
      [...confirmedTxs, ...localHistoryConfirmedTxs],
      (tx) => tx.id,
    );

    // Merge the merged confirmed transactions with the on-chain history

    let finalPendingTxs: IAccountHistoryTx[] = [];
    let confirmedTxsToSave: IAccountHistoryTx[] = [];

    if (isAllNetworks) {
      const allNetworksParams = accounts.map((account) => ({
        networkId: account.networkId,
        accountAddress: account.apiAddress,
        xpub: account.accountXpub,
        pendingTxs: pendingTxs.filter((tx) =>
          isAccountCompatibleWithTx({ account, tx }),
        ),
        confirmedTxs: mergedConfirmedTxs.filter((tx) =>
          isAccountCompatibleWithTx({ account, tx }),
        ),
        onChainHistoryTxs: onChainHistoryTxs.filter((tx) =>
          isAccountCompatibleWithTx({ account, tx }),
        ),
      }));

      const updateResult = await this.batchUpdateLocalHistoryTxs(
        allNetworksParams,
      );
      finalPendingTxs = updateResult.allFinalPendingTxs;
      confirmedTxsToSave = updateResult.allConfirmedTxsToSave;
    } else {
      const updateResult = await this.batchUpdateLocalHistoryTxs([
        {
          accountAddress,
          xpub,
          networkId,
          pendingTxs,
          confirmedTxs: mergedConfirmedTxs,
          onChainHistoryTxs,
        },
      ]);
      finalPendingTxs = updateResult.allFinalPendingTxs;
      confirmedTxsToSave = updateResult.allConfirmedTxsToSave;
    }

    // Merge the locally pending transactions, confirmed transactions, and on-chain history to return

    const result = unionBy(
      [
        ...finalPendingTxs,
        ...[...confirmedTxsToSave, ...onChainHistoryTxs].sort(
          (b, a) =>
            (a.decodedTx.updatedAt ?? a.decodedTx.createdAt ?? 0) -
            (b.decodedTx.updatedAt ?? b.decodedTx.createdAt ?? 0),
        ),
      ],
      (tx) => tx.id,
    );

    for (let i = 0; i < result.length; i += 1) {
      const tx = result[i];
      const network = await this.backgroundApi.serviceNetwork.getNetwork({
        networkId: tx.decodedTx.networkId,
      });
      tx.decodedTx.networkLogoURI = network.logoURI;
    }

    const accountsWithChangedPendingTxs = new Set<string>(); // accountId_networkId
    const changedPendingTxInfos: IChangedPendingTxInfo[] = [];
    localHistoryPendingTxs.forEach((tx) => {
      const txInResult = finalPendingTxs.find((item) => item.id === tx.id);
      if (!txInResult) {
        accountsWithChangedPendingTxs.add(
          `${tx.decodedTx.accountId}_${tx.decodedTx.networkId}`,
        );
        const confirmedTx = result.find((item) => item.id === tx.id);
        if (confirmedTx) {
          changedPendingTxInfos.push({
            accountId: confirmedTx.decodedTx.accountId,
            networkId: confirmedTx.decodedTx.networkId,
            txId: confirmedTx.decodedTx.txid,
            status: confirmedTx.decodedTx.status,
          });
        }
      }
    });

    if (changedPendingTxInfos.length > 0) {
      // Check if staking transaction status has changed, if so request backend to update order status
      void this.backgroundApi.serviceStaking.updateEarnOrder({
        txs: changedPendingTxInfos,
      });
    }

    return {
      accounts,
      allAccounts,
      txs: result,
      accountsWithChangedPendingTxs: Array.from(
        accountsWithChangedPendingTxs,
      ).map((item) => {
        const [a, n] = item.split('_');
        return {
          accountId: a,
          networkId: n,
        };
      }),
    };
  }

  @backgroundMethod()
  public async getAccountsLocalHistoryTxs({
    accountId,
    networkId,
  }: {
    accountId: string;
    networkId: string;
  }) {
    if (networkUtils.isAllNetwork({ networkId })) {
      const accounts = (
        await this.backgroundApi.serviceAllNetwork.getAllNetworkAccountsWithEnabledNetworks(
          {
            accountId,
            networkId,
          },
        )
      ).accountsInfo;
      const allNetworksParams = accounts.map((account) => ({
        networkId: account.networkId,
        accountAddress: account.apiAddress,
        xpub: account.accountXpub,
      }));
      const localHistoryConfirmedTxs =
        await this.getAccountsLocalHistoryConfirmedTxs(allNetworksParams);

      const localHistoryPendingTxs =
        await this.getAccountsLocalHistoryPendingTxs(allNetworksParams);

      const result = unionBy(
        [
          ...localHistoryPendingTxs,
          ...localHistoryConfirmedTxs.sort(
            (b, a) =>
              (a.decodedTx.updatedAt ?? a.decodedTx.createdAt ?? 0) -
              (b.decodedTx.updatedAt ?? b.decodedTx.createdAt ?? 0),
          ),
        ],
        (tx) => tx.id,
      );

      for (let i = 0; i < result.length; i += 1) {
        const tx = result[i];
        const network = await this.backgroundApi.serviceNetwork.getNetwork({
          networkId: tx.decodedTx.networkId,
        });
        tx.decodedTx.networkLogoURI = network.logoURI;
      }

      return result;
    }
    const [accountAddress, xpub] = await Promise.all([
      this.backgroundApi.serviceAccount.getAccountAddressForApi({
        accountId,
        networkId,
      }),
      this.backgroundApi.serviceAccount.getAccountXpub({
        accountId,
        networkId,
      }),
    ]);

    const localHistoryConfirmedTxs =
      await this.getAccountLocalHistoryPendingTxs({
        networkId,
        accountAddress,
        xpub,
      });
    const localHistoryPendingTxs =
      await this.getAccountLocalHistoryConfirmedTxs({
        networkId,
        accountAddress,
        xpub,
      });

    const result = unionBy(
      [...localHistoryPendingTxs, ...localHistoryConfirmedTxs],
      (tx) => tx.id,
    );

    return result;
  }

  @backgroundMethod()
  public async getAllNetworksPendingTxs({
    accountId,
    networkId,
    allNetworkAccounts,
  }: {
    accountId: string;
    networkId: string;
    allNetworkAccounts?: IAllNetworkAccountInfo[];
  }) {
    const accounts =
      allNetworkAccounts ||
      (
        await this.backgroundApi.serviceAllNetwork.getAllNetworkAccountsWithEnabledNetworks(
          {
            accountId,
            networkId,
          },
        )
      ).accountsInfo;

    const allNetworksParams = accounts.map((account) => ({
      networkId: account.networkId,
      accountAddress: account.apiAddress,
      xpub: account.accountXpub,
    }));

    const allNetworksPendingTxs = await this.getAccountsLocalHistoryPendingTxs(
      allNetworksParams,
    );

    return allNetworksPendingTxs;
  }

  @backgroundMethod()
  async batchUpdateLocalHistoryTxs(
    params: {
      accountAddress: string;
      xpub?: string;
      networkId: string;
      onChainHistoryTxs: IAccountHistoryTx[];
      confirmedTxs: IAccountHistoryTx[];
      pendingTxs: IAccountHistoryTx[];
    }[],
  ) {
    const allConfirmedTxsToSave: IAccountHistoryTx[] = [];
    const allNonceHasBeenUsedTxs: IAccountHistoryTx[] = [];
    const allFinalPendingTxs: IAccountHistoryTx[] = [];

    const updateQuery: {
      accountAddress: string;
      xpub?: string;
      networkId: string;
      confirmedTxs?: IAccountHistoryTx[];
      confirmedTxsToSave?: IAccountHistoryTx[];
      confirmedTxsToRemove?: IAccountHistoryTx[];
    }[] = [];

    for (const param of params) {
      const {
        accountAddress,
        xpub,
        networkId,
        onChainHistoryTxs,
        confirmedTxs,
        pendingTxs,
      } = param;

      // Find transactions confirmed through history details query but not in on-chain history, these need to be saved
      let confirmedTxsToSave: IAccountHistoryTx[] = [];

      confirmedTxsToSave = confirmedTxs
        .map((tx) => {
          const onChainHistoryTx = onChainHistoryTxs.find(
            (item) => item.id === tx.id,
          );
          if (onChainHistoryTx) {
            return onChainHistoryTx;
          }
          return tx;
        })
        .filter((tx) => tx.decodedTx.status !== EDecodedTxStatus.Pending);

      const resp = unionBy(
        [...onChainHistoryTxs, ...confirmedTxsToSave],
        (tx) => tx.id,
      );

      const finalConfirmedTxs = [];
      const confirmedTxsToRemove = [];

      for (let i = 0; i < resp.length; i += 1) {
        const tx = resp[i];
        if (
          tx.decodedTx.status === EDecodedTxStatus.Pending ||
          (!isNil(xpub) &&
            !isNil(tx.decodedTx.xpub) &&
            xpub !== tx.decodedTx.xpub)
        ) {
          confirmedTxsToRemove.push(tx);
        } else {
          finalConfirmedTxs.push(tx);
        }
      }

      const vaultSettings =
        await this.backgroundApi.serviceNetwork.getVaultSettings({ networkId });

      const nonceHasBeenUsedTxs: IAccountHistoryTx[] = [];
      let finalPendingTxs: IAccountHistoryTx[] = [];
      if (vaultSettings.nonceRequired) {
        pendingTxs.forEach((tx) => {
          if (
            onChainHistoryTxs.find(
              (onChainHistoryTx) =>
                !isNil(onChainHistoryTx.decodedTx.nonce) &&
                !isNil(tx.decodedTx.nonce) &&
                onChainHistoryTx.decodedTx.nonce === tx.decodedTx.nonce,
            )
          ) {
            nonceHasBeenUsedTxs.push(tx);
          } else {
            finalPendingTxs.push(tx);
          }
        });
      } else {
        finalPendingTxs = pendingTxs;
      }

      allNonceHasBeenUsedTxs.push(...nonceHasBeenUsedTxs);
      allFinalPendingTxs.push(...finalPendingTxs);
      allConfirmedTxsToSave.push(...confirmedTxsToSave);

      updateQuery.push({
        networkId,
        accountAddress,
        xpub,
        confirmedTxs: [...confirmedTxs, ...nonceHasBeenUsedTxs],
        confirmedTxsToSave: finalConfirmedTxs,
        confirmedTxsToRemove,
      });
    }

    await this.backgroundApi.simpleDb.localHistory.batchUpdateLocalHistoryTxs(
      updateQuery,
    );

    return {
      allConfirmedTxsToSave,
      allNonceHasBeenUsedTxs,
      allFinalPendingTxs,
    };
  }

  @backgroundMethod()
  async buildFetchHistoryListParams(params: {
    accountId: string;
    networkId: string;
    accountAddress: string;
  }) {
    const { networkId, accountId } = params;
    const vault = await vaultFactory.getVault({ networkId, accountId });
    return vault.buildFetchHistoryListParams(params);
  }

  @backgroundMethod()
  public async fetchAccountOnChainHistory(
    params: IFetchAccountHistoryParams & {
      accountAddress: string;
      xpub?: string;
    },
  ) {
    const {
      accountId,
      networkId,
      xpub,
      tokenIdOnNetwork,
      accountAddress,
      isManualRefresh,
      isAllNetworks,
    } = params;
    const vault = await vaultFactory.getVault({
      accountId,
      networkId,
    });

    const isCustomNetwork =
      await this.backgroundApi.serviceNetwork.isCustomNetwork({
        networkId,
      });
    if (isCustomNetwork) {
      return [];
    }

    const client = await this.getClient(EServiceEndpointEnum.Wallet);
    let resp;
    let extraParams: any;
    const fetchHistoryFromServer = async () => {
      extraParams = await this.buildFetchHistoryListParams(params);
      let extraRequestParams = extraParams;
      if (networkId === getNetworkIdsMap().onekeyall) {
        extraRequestParams = {
          allNetworkAccounts: (
            extraParams as unknown as {
              allNetworkAccounts: IAllNetworkHistoryExtraItem[];
            }
          ).allNetworkAccounts.map((i) => ({
            networkId: i.networkId,
            accountAddress: i.accountAddress,
            xpub: i.accountXpub,
          })),
        };
      }
      return client.post<{ data: IFetchAccountHistoryResp }>(
        '/wallet/v1/account/history/list',
        {
          networkId,
          accountAddress,
          xpub,
          tokenAddress: tokenIdOnNetwork,
          ...extraRequestParams,
          isForceRefresh: isManualRefresh,
          isAllNetwork: isAllNetworks,
        },
        {
          headers:
            await this.backgroundApi.serviceAccountProfile._getWalletTypeHeader(
              {
                accountId: params.accountId,
              },
            ),
        },
      );
    };
    try {
      resp = await fetchHistoryFromServer();
    } catch (e) {
      const error = e as OneKeyServerApiError;
      // Exchange the token on the first error to ensure subsequent polling requests succeed
      if (error.data?.code === 50_401) {
        // 50401 -> Lightning service special error code
        await (vault as ILightningVault).exchangeToken();
        resp = await fetchHistoryFromServer();
      } else {
        throw e;
      }
    }

    const { data: onChainHistoryTxs, tokens, nfts } = resp.data.data;

    const dbAccountCache: {
      [accountId: string]: IDBAccount;
    } = {};

    const txs = (
      await Promise.all(
        onChainHistoryTxs.map((tx, index) =>
          vault.buildOnChainHistoryTx({
            dbAccountCache,
            accountId,
            networkId,
            accountAddress,
            xpub,
            onChainHistoryTx: tx,
            tokens,
            nfts,
            index,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            allNetworkHistoryExtraItems: extraParams?.allNetworkAccounts,
          }),
        ),
      )
    ).filter(Boolean);

    return txs;
  }

  @backgroundMethod()
  public async fetchHistoryTxDetails(params: IFetchHistoryTxDetailsParams) {
    try {
      const { accountId, networkId, txid, withUTXOs } = params;

      let accountAddress = params.accountAddress;
      let xpub = params.xpub;

      try {
        const [a, x] = await Promise.all([
          this.backgroundApi.serviceAccount.getAccountAddressForApi({
            accountId,
            networkId,
          }),
          this.backgroundApi.serviceAccount.getAccountXpub({
            accountId,
            networkId,
          }),
        ]);
        accountAddress = a;
        xpub = x;
      } catch (e) {
        // pass
      }

      const extraParams = await this.buildFetchHistoryListParams({
        ...params,
        accountAddress: accountAddress || '',
      });

      const requestParams: IServerFetchAccountHistoryDetailParams = withUTXOs
        ? {
            accountId,
            networkId,
            txid,
            ...extraParams,
          }
        : {
            accountId,
            networkId,
            txid,
            xpub,
            accountAddress,
            ...extraParams,
          };
      const vault = await vaultFactory.getVault({ networkId, accountId });
      const resp = await vault.fetchAccountHistoryDetail(requestParams);

      if (params.fixConfirmedTxStatus) {
        void this.updateLocalHistoryConfirmedTxStatus({
          networkId,
          accountAddress,
          xpub,
          txid,
          status: getOnChainHistoryTxStatus(resp.data.data.data.status),
        });
      }

      return resp.data.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  @backgroundMethod()
  public async updateLocalHistoryConfirmedTxStatus(params: {
    networkId: string;
    accountAddress?: string;
    xpub?: string;
    txid: string;
    status: EDecodedTxStatus;
  }) {
    await this.backgroundApi.simpleDb.localHistory.updateLocalHistoryConfirmedTxStatus(
      params,
    );
  }

  @backgroundMethod()
  public async decodeOnChainHistoryTx(params: {
    accountId: string;
    networkId: string;
    tx: IOnChainHistoryTx;
    tokens: Record<string, IOnChainHistoryTxToken>;
    nfts: Record<string, IOnChainHistoryTxNFT>;
    accountAddress?: string;
    xpub?: string;
  }) {
    const { accountId, networkId, tx, tokens, nfts } = params;

    let accountAddress = params.accountAddress;
    let xpub = params.xpub;

    try {
      const [x, a] = await Promise.all([
        this.backgroundApi.serviceAccount.getAccountXpub({
          accountId,
          networkId,
        }),
        this.backgroundApi.serviceAccount.getAccountAddressForApi({
          accountId,
          networkId,
        }),
      ]);
      accountAddress = a;
      xpub = x;
    } catch (e) {
      // pass
    }

    const vault = await vaultFactory.getVault({ networkId, accountId });

    const resp = await vault.buildOnChainHistoryTx({
      accountId,
      networkId,
      accountAddress: accountAddress || '',
      xpub: xpub || '',
      onChainHistoryTx: tx,
      tokens,
      nfts,
    });

    if (resp) return resp;
  }

  @backgroundMethod()
  public async fetchTxDetails({
    accountId,
    networkId,
    txid,
  }: IFetchTxDetailsParams) {
    return this.fetchHistoryTxDetails({
      accountId,
      networkId,
      txid,
    });
  }

  @backgroundMethod()
  public async getAccountLocalHistoryPendingTxs(params: {
    networkId: string;
    accountAddress: string;
    xpub?: string;
    tokenIdOnNetwork?: string;
    limit?: number;
  }) {
    const { accountAddress, xpub, networkId, tokenIdOnNetwork } = params;
    const localHistoryPendingTxs =
      await this.backgroundApi.simpleDb.localHistory.getAccountLocalHistoryPendingTxs(
        {
          networkId,
          accountAddress,
          xpub,
          tokenIdOnNetwork,
        },
      );

    return localHistoryPendingTxs;
  }

  @backgroundMethod()
  public async getAccountsLocalHistoryPendingTxs(
    params: {
      networkId: string;
      accountAddress: string;
      xpub?: string;
      tokenIdOnNetwork?: string;
    }[],
  ) {
    const localHistoryPendingTxs =
      await this.backgroundApi.simpleDb.localHistory.getAccountsLocalHistoryPendingTxs(
        params,
      );

    return localHistoryPendingTxs;
  }

  @backgroundMethod()
  public async getLocalHistoryTxById(params: {
    accountId: string;
    networkId: string;
    historyId: string;
  }) {
    const { accountId, networkId, historyId } = params;
    const [xpub, accountAddress] = await Promise.all([
      this.backgroundApi.serviceAccount.getAccountXpub({
        accountId,
        networkId,
      }),
      this.backgroundApi.serviceAccount.getAccountAddressForApi({
        accountId,
        networkId,
      }),
    ]);

    return this.backgroundApi.simpleDb.localHistory.getLocalHistoryTxById({
      networkId,
      accountAddress,
      xpub,
      historyId,
    });
  }

  @backgroundMethod()
  public async saveLocalHistoryPendingTxs(params: {
    networkId: string;
    accountAddress?: string;
    xpub?: string;
    pendingTxs: IAccountHistoryTx[];
  }) {
    const { networkId, accountAddress, xpub, pendingTxs } = params;

    return this.backgroundApi.simpleDb.localHistory.saveLocalHistoryPendingTxs({
      networkId,
      accountAddress,
      xpub,
      txs: pendingTxs,
    });
  }

  @backgroundMethod()
  public async clearLocalHistoryPendingTxs() {
    return this.backgroundApi.simpleDb.localHistory.clearLocalHistoryPendingTxs();
  }

  @backgroundMethod()
  public async clearLocalHistory() {
    return this.backgroundApi.simpleDb.localHistory.clearLocalHistory();
  }

  @backgroundMethod()
  public async getAccountLocalHistoryConfirmedTxs(params: {
    networkId: string;
    accountAddress: string;
    xpub?: string;
    tokenIdOnNetwork?: string;
    limit?: number;
  }) {
    const { accountAddress, xpub, networkId, tokenIdOnNetwork } = params;
    const localHistoryConfirmedTxs =
      await this.backgroundApi.simpleDb.localHistory.getAccountLocalHistoryConfirmedTxs(
        {
          networkId,
          accountAddress,
          xpub,
          tokenIdOnNetwork,
        },
      );

    return localHistoryConfirmedTxs;
  }

  @backgroundMethod()
  public async getAccountsLocalHistoryConfirmedTxs(
    params: {
      networkId: string;
      accountAddress: string;
      xpub?: string;
      tokenIdOnNetwork?: string;
    }[],
  ) {
    const localHistoryConfirmedTxs =
      await this.backgroundApi.simpleDb.localHistory.getAccountsLocalHistoryConfirmedTxs(
        params,
      );

    return localHistoryConfirmedTxs;
  }

  @backgroundMethod()
  public async getAccountLocalPendingTxsNonceList(params: {
    networkId: string;
    accountId: string;
  }) {
    const { networkId, accountId } = params;
    const [xpub, accountAddress] = await Promise.all([
      this.backgroundApi.serviceAccount.getAccountXpub({
        accountId,
        networkId,
      }),
      this.backgroundApi.serviceAccount.getAccountAddressForApi({
        accountId,
        networkId,
      }),
    ]);
    return this.backgroundApi.simpleDb.localHistory.getPendingNonceList({
      networkId,
      accountAddress,
      xpub,
    });
  }

  @backgroundMethod()
  public async saveSendConfirmHistoryTxs(params: {
    networkId: string;
    accountId: string;
    data: ISendTxOnSuccessData;
    replaceTxInfo?: IReplaceTxInfo;
  }) {
    const { networkId, accountId, data, replaceTxInfo } = params;

    if (!data || !data.decodedTx) {
      return;
    }

    const { decodedTx, signedTx } = data;
    const vaultSettings =
      await this.backgroundApi.serviceNetwork.getVaultSettings({ networkId });

    const vault = await vaultFactory.getVault({ networkId, accountId });
    const newHistoryTx = await vault.buildHistoryTx({
      decodedTx,
      signedTx,
      isSigner: true,
      isLocalCreated: true,
    });

    const [xpub, accountAddress] = await Promise.all([
      this.backgroundApi.serviceAccount.getAccountXpub({
        accountId,
        networkId,
      }),
      this.backgroundApi.serviceAccount.getAccountAddressForApi({
        accountId,
        networkId,
      }),
    ]);

    if (signedTx.stakingInfo) {
      newHistoryTx.stakingInfo = signedTx.stakingInfo;
    }

    if (vaultSettings.replaceTxEnabled) {
      try {
        newHistoryTx.decodedTx.encodedTxEncrypted =
          newHistoryTx.decodedTx.encodedTxEncrypted ||
          (await this.backgroundApi.servicePassword.encryptByInstanceId(
            JSON.stringify(decodedTx.encodedTx),
          ));
      } catch (error) {
        console.error(error);
      }
    }

    let prevTx: IAccountHistoryTx | undefined;
    if (replaceTxInfo && replaceTxInfo.replaceHistoryId) {
      prevTx = await simpleDb.localHistory.getLocalHistoryTxById({
        historyId: replaceTxInfo.replaceHistoryId,
        networkId,
        accountAddress,
        xpub,
      });
      if (prevTx) {
        prevTx.decodedTx.status = EDecodedTxStatus.Dropped;
        prevTx.replacedNextId = newHistoryTx.id;

        newHistoryTx.replacedPrevId = prevTx.id;
        newHistoryTx.replacedType = replaceTxInfo.replaceType;
        newHistoryTx.decodedTx.interactInfo =
          newHistoryTx.decodedTx.interactInfo || prevTx.decodedTx.interactInfo;

        if (replaceTxInfo.replaceType === EReplaceTxType.Cancel) {
          newHistoryTx.decodedTx.actions =
            prevTx.decodedTx.actions || newHistoryTx.decodedTx.actions;
        }

        // if the prev tx is a cancel tx, the new tx should keep canceled status
        if (prevTx.replacedType === EReplaceTxType.Cancel) {
          newHistoryTx.decodedTx.actions =
            prevTx.decodedTx.actions || newHistoryTx.decodedTx.actions;
          newHistoryTx.replacedType = EReplaceTxType.Cancel;
        }

        void this.backgroundApi.serviceSwap.updateSwapHistoryTx({
          oldTxId: prevTx.decodedTx.txid,
          newTxId: newHistoryTx.decodedTx.txid,
          status:
            replaceTxInfo.replaceType === EReplaceTxType.Cancel
              ? ESwapTxHistoryStatus.CANCELING
              : ESwapTxHistoryStatus.PENDING,
        });

        // Listen for staking transaction speed-up changes
        void this.backgroundApi.serviceStaking.updateOrderStatusByTxId({
          currentTxId: prevTx.decodedTx.txid,
          newTxId: newHistoryTx.decodedTx.txid,
          status:
            replaceTxInfo.replaceType === EReplaceTxType.Cancel
              ? EDecodedTxStatus.Removed
              : EDecodedTxStatus.Pending,
        });
      }
    }

    if (prevTx) {
      await this.backgroundApi.simpleDb.localHistory.batchUpdateLocalHistoryTxs(
        [
          {
            networkId,
            accountAddress,
            xpub,
            confirmedTxs: [prevTx],
          },
        ],
      );
    }

    await this.saveLocalHistoryPendingTxs({
      networkId,
      accountAddress,
      xpub,
      pendingTxs: [newHistoryTx],
    });
  }

  @backgroundMethod()
  public async getLocalHistoryMinPendingNonce(params: {
    networkId: string;
    accountAddress: string;
    xpub?: string;
  }) {
    return this.backgroundApi.simpleDb.localHistory.getMinPendingNonce(params);
  }

  @backgroundMethod()
  public async isEarliestLocalPendingTx({
    networkId,
    accountId,
    encodedTx,
  }: {
    networkId: string;
    accountId: string;
    encodedTx: IEncodedTx;
  }) {
    const vault = await vaultFactory.getVault({ networkId, accountId });
    return vault.isEarliestLocalPendingTx({ encodedTx });
  }
}

export default ServiceHistory;
