import { createLogger  } from '@lazyollama-gui/typescript-common';
import { CORS_HEADERS } from '../../../cors';

export const RPC_ROUTE_PATH = '/api/rpc/proxy' as const;
const logger = createLogger('lazyollama:gui:api:rpc:proxy');

export default async (request: Request): Promise<Response> => {

  if (request.method === 'OPTIONS') {
    return new Response('', CORS_HEADERS);
  }

  logger.info('gui:/api/rpc/proxy has received a proxy event.');

  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const payload = await request.json();
  const { method = '', params = [] } = payload;

  if (method == '' || !params) {
    return new Response('Missing API RPC Payload', { status: 400 });
  }

  logger.info('gui:browser has requested the method %s be proxied, with params %o', method, params);

  const RPC_API_URL = process.env.LAZYOLLAMA_API_URL;

  if (RPC_API_URL == null) return new Response('Internal Server Error', { status: 500 });

  const proxied = await Bun.fetch(RPC_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ method, params })
  });

  logger.info('Boomerang: Proxy request has returned.');
  logger.warn('Proxy Response Status %d, %s', proxied.status, proxied.statusText);

  if (proxied.ok) return proxied;

  return new Response(proxied.statusText, { status: proxied.status });
};
