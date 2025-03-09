import middleware from './middleware';
import routes from './routes';
import { BunServerConfig } from './types';

export default function createRunningBunServer() {
  const port: BunServerConfig['port'] = parseInt(process.env.PORT ?? '4040', 10);
  const host: BunServerConfig['hostname'] = process.env.HOST ?? '127.0.0.1';
  const fetch: BunServerConfig['fetch'] = (r, _w) => {
    middleware(r);
    return new Response('Not Found', { status: 404 });
  };
  return Bun.serve({ port, routes, fetch, hostname: host } as BunServerConfig);
}
