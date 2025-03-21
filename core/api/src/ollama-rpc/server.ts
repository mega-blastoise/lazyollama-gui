import { default as SuperLazySingletonFactory } from 'sleepydogs/LazySingleton';

import { createLogger } from '@lazyollama-gui/typescript-common';
import {
  type IOllamaRPCAPI,
  OllamaRPCAPIAction
} from '@lazyollama-gui/typescript-common-types';
import { ILazyOllamaRPCServer } from '@lazyollama-gui/typescript-rpc-core/server';
import { preheatModel, pullModel, startModel, stopModel } from './procedures/model';
import { getLocalModels, getRemoteModels } from './procedures/models';

class LazyOllamaRPCServer extends ILazyOllamaRPCServer<IOllamaRPCAPI> {
  constructor() {
    super({
      host: process.env.HOSTNAME,
      port: process.env.PORT,
      logger: createLogger('lazyollama-api:rpc:server'),
      cors(origin) {
        return true;
      },
      path: '/api/rpc/controller',
      healthcheckPath: '/api/status'
    });

    this.register(OllamaRPCAPIAction.ModelPull, pullModel);
    this.register(OllamaRPCAPIAction.ModelStart, startModel);
    this.register(OllamaRPCAPIAction.ModelPreheat, preheatModel);
    this.register(OllamaRPCAPIAction.ModelStop, stopModel);

    this.register(OllamaRPCAPIAction.Models, getLocalModels);
    this.register(OllamaRPCAPIAction.RemoteModels, getRemoteModels);

    this.registerMiddleware((request: Request) =>
      this.logger.info('%s %s', request.method, request.url)
    );
  }

  protected getDefaultPort(): number {
    return parseInt(process.env.PORT || '3000', 10);
  }

  protected getDefaultHostname(): string {
    return process.env.HOSTNAME || '0.0.0.0';
  }
}

export default SuperLazySingletonFactory(LazyOllamaRPCServer) as ReturnType<
  typeof SuperLazySingletonFactory<LazyOllamaRPCServer>
>;
