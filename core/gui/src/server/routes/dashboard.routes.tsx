import { Dashboard } from '@/gui/pages/Dashboard';

import { CORS_HEADERS } from '../cors';
import { middleware } from '../middleware';
import { renderIntoReadableStream } from '../render';
import { BunRoutes } from '../types';

export const DASHBOARD_ROUTE_PATH = '/' as const;

export const routes: BunRoutes[string] = {
  GET: async (request) => {
    middleware(request);
    const stream = await renderIntoReadableStream({
      Page: Dashboard,
      props: {},
      assets: ['hydrate']
    });
    return new Response(stream, {
      headers: { 'Content-Type': 'text/html' },
      status: 200,
      statusText: 'OK'
    });
  },
  OPTIONS: () => new Response('', { ...CORS_HEADERS, status: 204 }),
  HEAD: () => new Response('', { status: 200 }),
  POST: () => new Response('Method Not Allowed', { status: 405 }),
  PATCH: () => new Response('Method Not Allowed', { status: 405 }),
  DELETE: () => new Response('Method Not Allowed', { status: 405 }),
  PUT: () => new Response('Method Not Allowed', { status: 405 })
};
