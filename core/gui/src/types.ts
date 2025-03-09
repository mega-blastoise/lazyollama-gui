import { type ServeOptions, type RouterTypes, type Server } from 'bun';

export type BunRoutes = { [k: string]: RouterTypes.RouteValue<string> };

export type BunServerConfig<R = BunRoutes> = Omit<
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
