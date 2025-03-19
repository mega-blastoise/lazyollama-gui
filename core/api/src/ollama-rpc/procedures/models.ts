import { Timer } from 'sleepydogs';
import { Ollama as LazyOllama } from '@lazyollama-gui/typescript-clients';
import {
  type IOllamaRPCAPI,
  OllamaRPCAPIAction
} from '@lazyollama-gui/typescript-common-types';

export type RemoteModelsBulkQuery = {
  method: OllamaRPCAPIAction.RemoteModels;
  params: IOllamaRPCAPI[OllamaRPCAPIAction.RemoteModels]['params'];
  result: IOllamaRPCAPI[OllamaRPCAPIAction.RemoteModels]['result'];
};

export async function getRemoteModels(
  ...params: RemoteModelsBulkQuery['params']
): Promise<RemoteModelsBulkQuery['result']> {
  const requestTimestamp = performance.now();
  const timer = new Timer();
  timer.start();

  const ollama = LazyOllama.getInstance();
  let remoteModels = ollama.getRemoteModelTags();

  if (!remoteModels || remoteModels.length === 0) {
    await ollama.indexRemoteRegistryModels();
    remoteModels = ollama.getRemoteModelTags();
  }

  timer.stop();

  return {
    requested_method: 'getRemoteModels',
    response_data: remoteModels,
    request_accepted: true,
    request_timestamp: requestTimestamp,
    response_timestamp: performance.now(),
    response_time_ms: timer.elapsed() || 0
  };
}

export type LocalModelsBulkQuery = {
  method: OllamaRPCAPIAction.Models;
  params: IOllamaRPCAPI[OllamaRPCAPIAction.Models]['params'];
  result: IOllamaRPCAPI[OllamaRPCAPIAction.Models]['result'];
};

export async function getLocalModels(
  ...params: LocalModelsBulkQuery['params']
): Promise<LocalModelsBulkQuery['result']> {
  const requestTimestamp = performance.now();
  const timer = new Timer();
  timer.start();

  const ollama = LazyOllama.getInstance();
  const localModelState = ollama.getLocalCacheStates();

  timer.stop();

  return {
    requested_method: 'getLocalModels',
    response_data: [localModelState],
    request_accepted: true,
    request_timestamp: requestTimestamp,
    response_timestamp: performance.now(),
    response_time_ms: timer.elapsed() || 0
  };
}
