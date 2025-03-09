import { type ServeOptions, type RouterTypes, type Server } from 'bun';
import { getApiServerRoutes } from './routes';

type BunServerConfig<R = { [k: string]: RouterTypes.RouteValue<string> }> = Omit<
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

function getBunServerConfig(): BunServerConfig {
  return {
    hostname: process.env.HOSTNAME ?? '127.0.0.1',
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    routes: getApiServerRoutes(),
    fetch(_request, _server) {
      return new Response('Not found', { status: 404 });
    }
  };
}

export default getBunServerConfig;
