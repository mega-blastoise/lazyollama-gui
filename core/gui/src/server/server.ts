import { type ServerWebSocket, Server, randomUUIDv7 } from 'bun';
import { createLogger } from '@lazyollama-gui/typescript-common';
import routes, { fetchHandler } from './routes/routes';
import { BunServerConfig } from './types';

type LazyOllamaSocket = ServerWebSocket<any>;

let server: Server | null = null;

export function getBunServerRef() {
  return server;
}

export default function createRunningBunServer() {
  const logger = createLogger('lazyollama:core:web:server');
  const port: BunServerConfig['port'] = parseInt(process.env.PORT ?? '4040', 10);
  const host: BunServerConfig['hostname'] = process.env.HOSTNAME ?? '127.0.0.1';

  const socketClients = new Set();

  server = Bun.serve({
    port,
    routes,
    fetch: fetchHandler,
    hostname: host,
    websocket: {
      open(ws: LazyOllamaSocket) {
        ws.data.id = randomUUIDv7();
        logger.info('WebSocket connection opened: %s', ws.data.id);
        socketClients.add(ws);
      },
      close(ws: LazyOllamaSocket, code: number, reason: string) {
        logger.warn('WebSocket connection closed: %s', ws.data.id);
        socketClients.delete(ws);
      },
      message(ws: LazyOllamaSocket, message: any) {
        const data = JSON.parse(
          typeof message === 'string' ? message : JSON.stringify(message)
        );

        // Echo for now
        ws.send(JSON.stringify(data));
      }
    }
  });

  return server;
}
