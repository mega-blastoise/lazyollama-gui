import { type ServerWebSocket } from 'bun';
import { CORS_HEADERS } from './cors';
import { middleware } from './middleware';
import { BunServerConfig } from './types';

type WebsocketData = {
  channelId: string;
  authToken: string;
};

export default function createRunningBunWebsocketServer() {
  const port: BunServerConfig['port'] = parseInt(process.env.PORT ?? '4040', 10) + 1;
  const host: BunServerConfig['hostname'] = process.env.HOSTNAME ?? '127.0.0.1';
  const websocket = Bun.serve<WebsocketData, {}>({
    port,
    hostname: host,
    fetch(request, server) {
      middleware(request);

      if (
        server.upgrade(request, {
          data: {
            channelId: new URL(request.url).searchParams.get('channelId')
          }
        })
      ) {
        return;
      }

      return new Response('Upgrade failed', { status: 500 });
    },
    websocket: {
      message(ws: ServerWebSocket<WebsocketData>, message: any) {
        const data = JSON.parse(
          typeof message === 'string' ? message : JSON.stringify(message)
        );
      }
    }
  });

  return websocket;
}
