import path from 'path';

import { CORS_HEADERS, ALLOWED_ORIGINS } from '../cors';
import { middleware } from '../middleware';
import rpcRoutes, { RPC_ROUTE_PATH } from '../rpc/rpc-proxy';
import { BunRoutes, BunServerConfig } from '../types';

import { DASHBOARD_ROUTE_PATH, routes as dashboardRoutes } from './routes/dashboard.routes';
import { getClientScript } from '../lib';

const routes: BunRoutes = {
  [DASHBOARD_ROUTE_PATH]: dashboardRoutes,
  [RPC_ROUTE_PATH]: rpcRoutes
};

export default routes;

const fetchHandler: BunServerConfig['fetch'] = async function (request, server) {
  /**
   * Pass the request through the middleware
   *
   * Middleware can be used to mutate the request object
   * or perform side effects prior to the final handler being called
   */
  middleware(request);

  /**
   * If the request is an OPTIONS request,
   * is is probable that a browser is attempting a preflight request
   *
   * Respond with a 204 status code and the CORS headers
   */
  if (request.method === 'OPTIONS') {
    const origin = request.headers.get('Origin') || request.headers.get('origin');

    if (origin && ALLOWED_ORIGINS.includes(origin as any)) {
      return new Response('', {
        headers: {
          ...CORS_HEADERS.headers,
          'Access-Control-Allow-Origin': origin
        },
        status: 204
      });
    }

    return new Response('Forbidden', { status: 403 });
  }

  const upgrade = request.headers.get('upgrade');
  const isSocketPath = new URL(request.url).pathname === '/api/ws';
  if (isSocketPath && upgrade === 'websocket') {
    const didUpgrade = server.upgrade(request, {
      data: {
        channelId: new URL(request.url).searchParams.get('channelId')
      },
      headers: {
        ...request.headers
      }
    });
    if (didUpgrade) return undefined;
    else return new Response('Upgrade failed', { status: 500 });
  }

  if (request.method === 'GET') {
    const url = new URL(request.url);
    const pathname = url.pathname;

    /**
     * worker.js is bundled into worker.[hash].js,
     * so we need to handle this special case,
     * where we re-map a browser request for a 'worker.js' file
     * to a 'worker.[hash].js' file
     *
     * we use 'worker.js' on the client bc it is deterministic
     */
    const REGEX_WORKER = new RegExp(/\/worker\.js/g);
    if (REGEX_WORKER.test(pathname)) {
      const hashed = await getClientScript('worker');
      if (hashed) {
        const file = Bun.file(path.resolve(process.cwd(), 'out', hashed));
        if (await file.exists()) {
          return new Response(file);
        }
      }

      return new Response('Not found', { status: 404 });
    }

    const REGEX_CSS = new RegExp(/\/css\/(\w)*-?(\w)*.css/g);
    const REGEX_ES6 = new RegExp(/\/gui\/browser\/hydrate.*.js/g);

    let matched = false;
    for (const regex of [REGEX_CSS, REGEX_ES6]) {
      matched = regex.test(pathname);
      if (matched) break;
    }

    if (matched) {
      const resolved = path.resolve(process.cwd(), 'out', pathname.replace('/', ''));
      const file = Bun.file(resolved);
      if (await file.exists()) {
        return new Response(file);
      }
    }

    return new Response('Not found', { status: 404 });
  }

  return new Response('Method Not Allowed', { status: 405 });
} as BunServerConfig['fetch'];

export { fetchHandler };
