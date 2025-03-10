import { type RouterTypes } from 'bun';
import { pipeline } from '@lazyollama-gui/typescript-common';

import { middleware } from '../middleware';
import { createHTTPMethodHandlerObject, handleOPTIONSPreflightRequest } from './base';
import { handleGETAPIStatusRequest } from './api-status';
import { handlePOSTAPIRPCMethodRequest } from './api-rpc';

type APIRoutes = {
  [k: string]: RouterTypes.RouteValue<string>;
};

export function getApiServerRoutes(): APIRoutes {
  return {
    '/api/status': createHTTPMethodHandlerObject({
      OPTIONS: pipeline<Request, Response>(middleware, handleOPTIONSPreflightRequest),
      GET: pipeline<Request, Response>(middleware, handleGETAPIStatusRequest)
    }),
    '/api/rpc/controller': createHTTPMethodHandlerObject({
      OPTIONS: pipeline<Request, Response>(middleware, handleOPTIONSPreflightRequest),
      POST: pipeline<Request, Response>(middleware, handlePOSTAPIRPCMethodRequest)
    })
  };
}

export default getApiServerRoutes;
