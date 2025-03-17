import { Timer } from 'sleepydogs';
import {
  Ollama as LazyOllama,
  OllamaClientCacheType,
  type RemoteModelStub,
} from '@lazyollama-gui/typescript-clients';
import { type IOllamaRPCAPI, OllamaRPCAPIAction } from '@lazyollama-gui/typescript-common-types';

export type RemoteModelsBulkQuery = {
  method: OllamaRPCAPIAction.RemoteModels;
  params: IOllamaRPCAPI[OllamaRPCAPIAction.RemoteModels]['params'];
  result: IOllamaRPCAPI[OllamaRPCAPIAction.RemoteModels]['result'];
};

export async function 