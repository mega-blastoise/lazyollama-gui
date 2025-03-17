import { type BunServerConfig, type BunMiddleware } from '../bun';
import { type MinimalLogger } from '../logger';

import { type RPCMethod, type RPCRequestBody } from './index';

export type RPCHandlers = Map<string, RPCMethod>;

export type LazyOllamaRPCServerOptions = {
  logger: MinimalLogger;
  port: BunServerConfig['port'];
  host: BunServerConfig['hostname'];
  path?: string;
  middlewares?: Array<BunMiddleware>;
  healthcheckPath?: string;
  cors?: string | string[] | ((origin: string) => boolean);
} & Omit<Partial<BunServerConfig>, 'port' | 'hostname' | 'fetch' | 'routes' | 'websocket'>;

/**
 * Represents the structure of an RPC API response.
 * @template T - The type of the response data.
 */
export type RPCAPIResponse<T, RPCController> = {
  requested_method: keyof RPCController;
  request_timestamp?: number;
  request_accepted?: boolean;
  response_data?: T;
  response_timestamp?: number;
  response_time_ms?: number;
};
