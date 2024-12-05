import type { IBackgroundApi } from '@onekeyhq/kit-bg/src/apis/IBackgroundApi';

import type {
  BenfenTransport,
  BenfenTransportRequestOptions,
} from '@benfen/bfc.js/client';

export class OneKeyBenfenTransport implements BenfenTransport {
  backgroundApi: IBackgroundApi;

  networkId: string;

  constructor({
    backgroundApi,
    networkId,
  }: {
    backgroundApi: any;
    networkId: string;
  }) {
    this.backgroundApi = backgroundApi;
    this.networkId = networkId;
  }

  async request<T>(input: BenfenTransportRequestOptions): Promise<T> {
    const res: T[] =
      await this.backgroundApi.serviceAccountProfile.sendProxyRequest({
        networkId: this.networkId,
        body: [
          {
            route: 'rpc',
            params: {
              method: input.method,
              params: input.params,
            },
          },
        ],
      });
    const response = res?.[0];
    if (!response) {
      throw new Error('No response received from the proxy');
    }

    return response;
  }

  async subscribe(): Promise<() => Promise<boolean>> {
    throw new Error('Subscription not implemented');
  }
}
