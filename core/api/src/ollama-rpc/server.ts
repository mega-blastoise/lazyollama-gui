import { default as SuperLazySingletonFactory } from 'sleepydogs/LazySingleton';

import { createLogger } from '@lazyollama-gui/typescript-common';
import { type IOllamaRPCAPI } from '@lazyollama-gui/typescript-common-types';
import { ILazyOllamaRPCServer } from '@lazyollama-gui/typescript-rpc-core/server';

import { pullModel, type PullModelRPCConfiguration } from './procedures/model';

type IOllamaRPCAPIMethod = keyof IOllamaRPCAPI;

class LazyOllamaRPCServer extends ILazyOllamaRPCServer<IOllamaRPCAPI> {
  constructor() {
    super({
      host: process.env.HOSTNAME,
      port: process.env.PORT,
      logger: createLogger('lazyollama-api:rpc:server')
    });

    this.register('model.pull' as PullModelRPCConfiguration['method'], pullModel);

    this.registerMiddleware((request: Request) =>
      this.logger.info('%s %s', request.method, request.url)
    );
  }

  protected getDefaultPort(): number {
    return parseInt(process.env.PORT || '3000', 10);
  }

  protected getDefaultHostname(): string {
    return process.env.HOSTNAME || '127.0.0.1';
  }
}

export default SuperLazySingletonFactory(LazyOllamaRPCServer) as ReturnType<
  typeof SuperLazySingletonFactory<LazyOllamaRPCServer>
>;
