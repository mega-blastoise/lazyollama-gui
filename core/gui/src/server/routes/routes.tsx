import path from 'path';

import { CORS_HEADERS } from '../cors';
import { middleware } from '../middleware';
import rpcRoutes from '../rpc/rpc-proxy';
import { BunRoutes, BunServerConfig } from '../types';

import { DASHBOARD_ROUTE_PATH, routes as dashboardRoutes } from './dashboard.routes';

const routes: BunRoutes = {
  [DASHBOARD_ROUTE_PATH]: dashboardRoutes,
  '/api/rpc/proxy': rpcRoutes
};

export default routes;

const fetchHandler: BunServerConfig['fetch'] = async function (request, server) {
  middleware(request);

  if (request.method === 'OPTIONS') {
    return new Response('', { ...CORS_HEADERS, status: 204 });
  }

  if (request.method === 'GET') {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const REGEX_CSS = new RegExp(/\/css\/(\w)*-?(\w)*.css/g);
    const REGEX_ES6 = new RegExp(/\/gui\/browser\/hydrate.*.js/g);

    if (REGEX_CSS.test(pathname) || REGEX_ES6.test(pathname)) {
      const resolved = path.resolve(process.cwd(), 'out', pathname.replace('/', ''));
      const file = Bun.file(resolved);
      if (await file.exists()) {
        return new Response(file);
      }
    }

    return new Response('Not found', { status: 404 });
  }

  return new Response('Method Not Allowed', { status: 405 });
};

export { fetchHandler };
