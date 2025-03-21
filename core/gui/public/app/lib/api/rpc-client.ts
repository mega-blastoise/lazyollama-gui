import { createOllamaRPCClient } from '@lazyollama-gui/typescript-clients';
import {
  IOllamaRPCAPI,
  OllamaRPCAPIAction,
  ITypedRPCClient
} from '@lazyollama-gui/typescript-common-types';
import { getDefaultHeaders } from '../headers';

const client: ITypedRPCClient<IOllamaRPCAPI> = createOllamaRPCClient({
  rpcUrl: '/api/rpc/proxy',
  headers: getDefaultHeaders(),
  timeout: 10000
});

const rpc = {
  model: {
    start: {
      fn: client.method(OllamaRPCAPIAction.ModelStart),
      method: OllamaRPCAPIAction.ModelStart,
      key: OllamaRPCAPIAction.ModelStart
    },
    stop: {
      fn: client.method(OllamaRPCAPIAction.ModelStop),
      method: OllamaRPCAPIAction.ModelStop,
      key: OllamaRPCAPIAction.ModelStop
    },
    pull: {
      fn: client.method(OllamaRPCAPIAction.ModelPull),
      method: OllamaRPCAPIAction.ModelPull,
      key: OllamaRPCAPIAction.ModelPull
    },
    preheat: {
      fn: client.method(OllamaRPCAPIAction.ModelPreheat),
      method: OllamaRPCAPIAction.ModelPreheat,
      key: OllamaRPCAPIAction.ModelPreheat
    }
  },
  models: {
    remote: {
      fn: client.method(OllamaRPCAPIAction.RemoteModels),
      method: OllamaRPCAPIAction.RemoteModels,
      key: OllamaRPCAPIAction.RemoteModels
    },
    local: {
      fn: client.method(OllamaRPCAPIAction.Models),
      method: OllamaRPCAPIAction.Models,
      key: OllamaRPCAPIAction.Models
    }
  }
};

export default rpc;
