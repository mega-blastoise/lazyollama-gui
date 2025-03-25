import { CORS_HEADERS } from '../cors';

export default async (request: Request): Promise<Response> => {
  if (request.method === 'OPTIONS') {
    return new Response('', CORS_HEADERS);
  }

  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const payload = await request.json();
  const { method = '', params = [] } = payload;

  if (method == '' || !params) {
    return new Response('Missing API RPC Payload', { status: 400 });
  }

  const RPC_API_URL = process.env.LAZYOLLAMA_API_URL;

  if (RPC_API_URL == null) return new Response('Internal Server Error', { status: 500 });

  const proxied = await Bun.fetch(RPC_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ method, params })
  });

  if (proxied.ok) return proxied;

  return new Response(proxied.statusText, { status: proxied.status });
};
