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

/** 
 * A function that has access to the request object for a given (request, response) cycle,
 * and is expected to return a valid Response object.
 * 
 * Can be sync or async.
 */
export type HTTPMethodHandler = (request: Request) => Response | Promise<Response>;

/**
 * An object that maps HTTP method keys to HTTP method handlers
 */
export type ResponseHandlerObject = Record<HTTPMethodKey, HTTPMethodHandler>;

/**
 * A function that has access to the request object for a given (request, response) cycle
 * Which can mutate the request object, or perform side effects,
 * prior to the final handler being called.
 */
export type BunMiddleware = (request: Request) => void | Promise<void>;
