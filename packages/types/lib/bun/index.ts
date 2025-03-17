import {
  type ServeOptions,
  type WebSocketServeOptions,
  type RouterTypes,
  type Server
} from 'bun';

export type BunServerConfig<R = { [k: string]: RouterTypes.RouteValue<string> }> = Omit<
  ServeOptions,
  'fetch'
> & {
  fetch: (this: Server, request: Request, server: Server) => Response | Promise<Response>;
  routes: R;
} & {
  /**
   * @deprecated Use `routes` instead in new code.
   */
  static?: R;
};

export type BunWebsocketConfig<R = { [k: string]: RouterTypes.RouteValue<string> }> = Omit<
  WebSocketServeOptions,
  'fetch'
> & {
  fetch: WebSocketServeOptions['fetch'];
  routes: R;
} & {
  /**
   * @deprecated Use `routes` instead in new code.
   */
  static?: R;
};

export type BunAPIRoutes = {
  [k: string]: RouterTypes.RouteValue<string>;
};

export type HTTPMethodKey = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
export type HTTPMethodHandler = (request: Request) => Response | Promise<Response>;
export type ResponseHandlerObject = Record<HTTPMethodKey, HTTPMethodHandler>;
