import routes, { fetchHandler } from './routes/routes';
import { BunServerConfig } from './types';

export default function createRunningBunServer() {
  const port: BunServerConfig['port'] = parseInt(process.env.PORT ?? '4040', 10);
  const host: BunServerConfig['hostname'] = process.env.HOSTNAME ?? '127.0.0.1';
  const bunServer = Bun.serve({
    port,
    routes,
    fetch: fetchHandler,
    hostname: host
  });
  return bunServer;
}
