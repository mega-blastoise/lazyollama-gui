import { type Server } from 'bun';
import { type BunServerConfig } from '../bun';
import { type XDebugger } from '../logger';
import { type RPCMethod } from './index';

export type RPCHandlers = Map<string, RPCMethod>;

export abstract class ILazyOllamaRPCServer {
  protected handlers: RPCHandlers = new Map();
  protected server: Server | null = null;

  protected logger: XDebugger;

  constructor() {}

  protected register(method: string, handler: RPCMethod, replace = false): void {
    if (this.handlers.has(method)) {
        if (replace) this.handlers.set(method, handler);
        else 
    }
  }
}

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
