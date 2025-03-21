import { type Server } from 'bun';
import {
  type BunMiddleware,
  type LazyOllamaRPCServerOptions,
  type MinimalLogger,
  type RPCHandlers,
  type RPCMethod,
  type RPCRequestBody,
  type RPCAPISpec,
  type BunServerConfig
} from '@lazyollama-gui/typescript-common-types';

import { cors } from './server/cors';

export abstract class ILazyOllamaRPCServer<T extends RPCAPISpec> {
  public server: Server | null = null;

  protected handlers: RPCHandlers = new Map();
  protected middlewares: Array<BunMiddleware> = [];
  protected logger: MinimalLogger;

  private port: string | number;
  private host: string;
  private path?: string;
  private healthcheckPath?: string;
  private cors?: string | string[] | ((origin: string) => boolean);

  constructor(options: LazyOllamaRPCServerOptions) {
    this.logger = options.logger;
    this.port = options.port || this.getDefaultPort();
    this.host = options.host || this.getDefaultHostname();
    this.path = options.path || this.getDefaultServerRPCPath();
    this.healthcheckPath = options.healthcheckPath || this.getDefaultHealthCheckPath();
    this.cors = options.cors;
  }

  protected register<M extends keyof T & string>(
    method: M,
    handler: RPCMethod<T[M]['result'], T[M]['params']>,
    replace = false
  ): boolean {
    if (this.handlers.has(method)) {
      if (replace) {
        this.handlers.set(method, handler);
        return true;
      } else {
        this.logger.error('Method %s already registered', method);
        return false;
      }
    }

    this.handlers.set(method, handler);
    return true;
  }

  protected registerMiddleware(middleware: BunMiddleware): () => void {
    this.middlewares.push(middleware);
    return () => this.middlewares.splice(this.middlewares.indexOf(middleware), 1);
  }

  public start(): void {
    this.server = Bun.serve({
      hostname: this.host,
      port: this.port,
      routes: {
        [this.path!]: async (request: Request) => {
          for (const middleware of this.middlewares) {
            try {
              await Promise.resolve(middleware(request));
            } catch (error) {
              this.logger.error('Error in server middleware');
              this.logger.error(error);
              return Response.json(
                { error: ['Internal Server Error', 'Middleware Error', error] },
                { status: 500 }
              );
            }
          }
          return this.handleIncomingRequest(request);
        },
        [this.healthcheckPath!]: (request) => this.handleHealthCheckRequest()
      },
      fetch(request, server) {
        return new Response('Not found', { status: 404 });
      }
    } as BunServerConfig);
  }

  public async stop(): Promise<void> {
    if (this.server) {
      await this.server.stop();
      this.server = null;
    }
  }

  protected getDefaultServerRPCPath(): string {
    return '/api/rpc';
  }

  protected getDefaultHealthCheckPath(): string {
    return '/api/status';
  }

  protected abstract getDefaultPort(): number;
  protected abstract getDefaultHostname(): string;

  private async handleIncomingRequest(request: Request): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return cors({ origin: this.cors })(request);
    }

    if (request.method === 'POST') {
      const body = await request.json();
      try {
        if (!this.validateIncomingRequestBody(body)) {
          throw new Error('Invalid request body');
        }

        const { method, params } = body;

        const handler = this.handlers.get(method);

        if (!handler) {
          throw new Error('Method not found');
        }

        const result: T[typeof method]['result'] = await handler(...params);

        const packet = { data: result };

        return Response.json(packet, { status: 200 });
      } catch (e) {
        this.logger.error('Error handling incoming request');
        this.logger.error(e);
        return Response.json(
          { error: ['Internal Server Error', 'Request Error', e] },
          { status: 500 }
        );
      }
    }

    return new Response('Method Not Allowed', { status: 405 });
  }

  private handleHealthCheckRequest(): Response {
    return Response.json(
      { server: { status: 'OK', endpoints: [this.path, this.healthcheckPath] } },
      { status: 200 }
    );
  }

  private validateIncomingRequestBody(
    body: unknown
  ): body is RPCRequestBody<T, keyof T & string> {
    if (typeof body !== 'object') return false;
    if (body == null) return false;
    if (!('method' in body)) return false;
    if (!('params' in body)) return false;
    return true;
  }
}
