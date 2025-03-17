import { Timer } from 'sleepydogs';
import {
  Ollama as LazyOllama,
  OllamaClientCacheType
} from '@lazyollama-gui/typescript-clients';
import {
  type IOllamaRPCAPI,
  OllamaRPCAPIAction
} from '@lazyollama-gui/typescript-common-types';

export type PullModelRPCConfiguration = {
  method: OllamaRPCAPIAction.ModelPull;
  params: IOllamaRPCAPI[OllamaRPCAPIAction.ModelPull]['params'];
  result: IOllamaRPCAPI[OllamaRPCAPIAction.ModelPull]['result'];
};

export async function pullModel(...params: PullModelRPCConfiguration['params']): Promise<PullModelRPCConfiguration['result']> {
  const model = params[0] || arguments[0];
  const requestTimestamp = performance.now();
  const timer = new Timer();
  timer.start();

  const ollama = LazyOllama.getInstance();
  const state = ollama.checkModelStateInCaches(model);

  if (state[model]?.includes(OllamaClientCacheType.Running)) {
    timer.stop();
    return {
      requested_method: 'pullModel',
      response_data: { model, status: 'already-running' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }

  if (state[model]?.includes(OllamaClientCacheType.Available)) {
    timer.stop();
    return {
      requested_method: 'pullModel',
      response_data: { model, status: 'already-pulled' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }

  const stream = false;
  const prestart = false;

  ollama.pullModel(model, stream, prestart);

  timer.stop();

  return {
    requested_method: 'pullModel',
    request_accepted: true,
    request_timestamp: requestTimestamp,
    response_timestamp: performance.now(),
    response_time_ms: timer.elapsed() || 0,
    response_data: { model, status: 'pull-queued' }
  };
}

export type StartModelRPCConfiguration = {
  method: OllamaRPCAPIAction.ModelStart;
  params: IOllamaRPCAPI[OllamaRPCAPIAction.ModelStart]['params'];
  result: IOllamaRPCAPI[OllamaRPCAPIAction.ModelStart]['result'];
};

export async function startModel(...params: StartModelRPCConfiguration['params']): Promise<StartModelRPCConfiguration['result']> {
  const model = params[0] || arguments[0];
  const requestTimestamp = performance.now();
  const timer = new Timer();
  timer.start();

  const ollama = LazyOllama.getInstance();
  const state = ollama.checkModelStateInCaches(model);

  if (state[model]?.includes(OllamaClientCacheType.Running)) {
    timer.stop();
    return {
      requested_method: 'startModel',
      response_data: { model, status: 'already-running' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }

  const modelAlreadyPulled = state[model]?.includes(OllamaClientCacheType.Available);

  if (!modelAlreadyPulled) {
    try {
      await ollama.pullModel(model, false, false);
    } catch (e) {
      timer.stop();
      return {
        requested_method: 'startModel',
        response_data: {
          model,
          status: 'pull-failed',
          error: e instanceof Error ? e.message : String(e)
        },
        request_accepted: true,
        request_timestamp: requestTimestamp,
        response_timestamp: performance.now(),
        response_time_ms: timer.elapsed() || 0
      };
    }
  }

  try {
    await ollama.startModel(model);
    timer.stop();
    return {
      requested_method: 'startModel',
      response_data: { model, status: 'started' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  } catch (e) {
    timer.stop();
    return {
      requested_method: 'startModel',
      response_data: {
        model,
        status: 'start-failed',
        error: e instanceof Error ? e.message : String(e)
      },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }
}
