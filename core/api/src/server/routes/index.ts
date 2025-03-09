import { type RouterTypes } from 'bun';
import { pipeline } from '@lazyollama-gui/typescript-common';

import { middleware } from '../middleware';
import { createHTTPMethodHandlerObject } from './base';
import { handleGETAPIStatusRequest } from './api-status';
import { handlePOSTAPIRPCMethodRequest } from './api-rpc';

type APIRoutes = {
  [k: string]: RouterTypes.RouteValue<string>;
};

export function getApiServerRoutes(): APIRoutes {
  return {
    '/api/status': createHTTPMethodHandlerObject({
      GET: pipeline<Request, Response>(middleware, handleGETAPIStatusRequest)
    }),
    '/api/rpc/controller': createHTTPMethodHandlerObject({
      POST: pipeline<Request, Response>(
        middleware,
        handlePOSTAPIRPCMethodRequest
      )
    })
  };
}

export default getApiServerRoutes;
