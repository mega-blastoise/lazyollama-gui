import {
  type ITypedRPCClient,
  type IRPCClient,
  type RPCAPISpec
} from '@lazyollama-gui/typescript-common-types';

export class RPCError extends Error {
  constructor(
    message: string,
    public readonly method: string,
    public readonly params: any[],
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = 'RPCError';
  }
}

export type RPCClientConfig = {
  /**
   * The base URL of the RPC server
   */
  baseUrl: string;

  /**
   * The path of the RPC server
   * [Optional] Defaults to '/'
   */
  path?: string;

  /**
   * The timeout in milliseconds for the request
   */
  timeout?: number;

  /**
   * The headers to send with the request
   */
  headers?: HeadersInit;
};

class LazyOllamaRPCCLient<APISpec extends RPCAPISpec>
  implements IRPCClient, ITypedRPCClient<APISpec>
{
  private config;
  constructor(options: RPCClientConfig) {
    this.config = options;

    while (this.config.baseUrl.endsWith('/')) {
      this.config.baseUrl = this.config.baseUrl.slice(0, -1);
    }

    this.config.path ||= '/';
    this.config.timeout ||= 10000;
    this.config.headers ||= { 'Content-Type': 'application/json', Accept: 'application/json' };
  }

  async call<M extends keyof APISpec>(method: M, params: APISpec[M]['params']) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, this.config.timeout);

    try {
      const response = await fetch(this.config.baseUrl, {
        method: 'POST',
        headers: this.config.headers,
        body: JSON.stringify({ method, params }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new RPCError(
          `HTTP error ${response.status}: ${response.statusText}`,
          method as string,
          params,
          response.status
        );
      }

      const data: APISpec[M]['result'] = await response.json();

      if ('error' in data) {
        throw new RPCError(data.error, method as string, params);
      }

      return data;
    } catch (e) {
      clearTimeout(timeoutId);

      if (e instanceof RPCError) {
        throw e;
      } else if (e instanceof DOMException && e?.name === 'AbortError') {
        throw new RPCError(
          `Request timeout after ${this.config.timeout}ms`,
          method as string,
          params
        );
      } else {
        throw new RPCError(
          e instanceof Error ? e.message : String(e),
          method as string,
          params
        );
      }
    }
  }

  method<M extends keyof APISpec>(
    method: M
  ): (params: APISpec[M]['params']) => Promise<APISpec[M]['result']> {
    return (params: APISpec[M]['params']) => this.call.bind(this)(method, params);
  }
}

function createRPCClient<APISpec extends RPCAPISpec>(options: RPCClientConfig) {
  return new LazyOllamaRPCCLient<APISpec>(options);
}

export default createRPCClient;
export { createRPCClient };
