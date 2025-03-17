import { Timer } from 'sleepydogs';
import { Ollama as LazyOllama, OllamaClientCacheType } from '@lazyollama-gui/typescript-clients';
import { createLogger } from '@lazyollama-gui/typescript-common';
import { type IOllamaRPCAPI } from '@lazyollama-gui/typescript-common-types';
import { ILazyOllamaRPCServer } from '@lazyollama-gui/typescript-rpc-core/server';

type IOllamaRPCAPIMethod = keyof IOllamaRPCAPI;

class LazyOllamaRPCServer extends ILazyOllamaRPCServer<IOllamaRPCAPI> {
  constructor() {
    super({
      host: process.env.HOSTNAME,
      port: process.env.PORT,
      logger: createLogger('lazyollama-api:rpc:server')
    });

    this.register('model.pull', pullModel);
  }

  protected getDefaultPort(): number {
    return parseInt(process.env.PORT || '3000', 10);
  }

  protected getDefaultHostname(): string {
    return process.env.HOSTNAME || '127.0.0.1';
  }
}

type PullModelConf = {
  method: 'model.pull';
  params: IOllamaRPCAPI['model.pull']['params'];
  result: IOllamaRPCAPI['model.pull']['result'];
};

async function pullModel(model: string) {
  const requestTimestamp = performance.now();
  const timer = new Timer();
  timer.start();
  const ollama = LazyOllama.getInstance();
  const state = ollama.checkModelStateInCaches(model);
  /**
   * Model is already running
   */
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
  /**
   * Model is already downloaded, but not running in memory
   */
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
  /**
   * Model is not downloaded yet
   */
  const stream = false;
  const prestart = false;
  /**
   * Offload this to the Bun promise task queue,
   * do not block response on pull
   * */
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
