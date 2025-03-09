import { Timer } from 'sleepydogs';
import { Ollama as LazyOllama, OllamaClientCacheType } from '@lazyollama-gui/typescript-clients';

/**
 * Represents the structure of an RPC API response.
 * @template T - The type of the response data.
 */
export type RPCAPIResponse<T> = {
  requested_method: keyof RPCController;
  request_timestamp?: number;
  request_accepted?: boolean;
  response_data?: T;
  response_timestamp?: number;
  response_time_ms?: number;
};

/**
 * Utility type to exclude specific methods from a type.
 * @template T - The type to exclude methods from.
 * @template OmitKeys - The keys of the methods to exclude.
 */
export type ExcludeMethods<T, OmitKeys extends keyof T> = {
  [K in keyof T as K extends OmitKeys ? never : K]: T[K];
};

/**
 * Type representing the methods of RPCController excluding 'hasMethod' and 'getMethod'.
 */
export type RPCControllerMethods = ExcludeMethods<RPCController, 'hasMethod' | 'getMethod'>;

export class RPCController {
  /**
   * Checks if a method exists in the controller.
   * @param {string} name - The name of the method.
   * @returns {boolean} - True if the method exists, false otherwise.
   */
  hasMethod(name: string): boolean {
    return name in this;
  }

  /**
   * Retrieves a method from the controller.
   * @param {keyof RPCControllerMethods} name - The name of the method to retrieve.
   * @returns {RPCControllerMethods[keyof RPCControllerMethods]} - The method from the controller.
   */
  getMethod(
    name: keyof RPCControllerMethods
  ): RPCControllerMethods[keyof RPCControllerMethods] {
    return this[name].bind(this);
  }

  async pullModel(model: string): Promise<RPCAPIResponse<any>> {
    const requestTimestamp = performance.now();
    const timer = new Timer();
    timer.start();
    const ollama = LazyOllama.getInstance();
    const state = ollama.checkModelStateInCaches(model);
    /**
     * Model is already running
     */
    if (state[model]?.includes(OllamaClientCacheType.Running)) {
      timer.stop();
      return {
        requested_method: 'pullModel',
        response_data: { model, status: 'already-running' },
        request_accepted: true,
        request_timestamp: requestTimestamp,
        response_timestamp: performance.now(),
        response_time_ms: timer.elapsed() || 0
      };
    }
    /**
     * Model is already downloaded, but not running in memory
     */
    if (state[model]?.includes(OllamaClientCacheType.Available)) {
      timer.stop();
      return {
        requested_method: 'pullModel',
        response_data: { model, status: 'already-pulled' },
        request_accepted: true,
        request_timestamp: requestTimestamp,
        response_timestamp: performance.now(),
        response_time_ms: timer.elapsed() || 0
      };
    }
    /**
     * Model is not downloaded yet
     */
    const stream = false;
    const prestart = false;
    /**
     * Offload this to the Bun promise task queue,
     * do not block response on pull
     * */
    ollama.pullModel(model, stream, prestart);
    timer.stop();

    return {
      requested_method: 'pullModel',
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0,
      response_data: { model, status: 'pull-queued' }
    };
  }

  async preheatModel(model: string): Promise<RPCAPIResponse<any>> {
    const requestTimestamp = performance.now();
    const timer = new Timer();
    timer.start();

    const ollama = LazyOllama.getInstance();
    const state = ollama.checkModelStateInCaches(model);

    /**
     * Model is already running
     */
    if (state[model]?.includes(OllamaClientCacheType.Running)) {
      timer.stop();
      return {
        requested_method: 'preheatModel',
        request_accepted: true,
        request_timestamp: requestTimestamp,
        response_timestamp: performance.now(),
        response_time_ms: timer.elapsed() || 0,
        response_data: { model, status: 'already-running' }
      };
    }

    /**
     * Model is already downloaded, but not running in memory
     */
    if (state[model]?.includes(OllamaClientCacheType.Available)) {
      await ollama.startModel(model);
      timer.stop();
      return {
        requested_method: 'preheatModel',
        request_accepted: true,
        request_timestamp: requestTimestamp,
        response_timestamp: performance.now(),
        response_time_ms: timer.elapsed() || 0,
        response_data: { model, status: 'running' }
      };
    }

    /**
     * Model is not downloaded yet
     */
    const stream = false;
    const prestart = true;

    await ollama.pullModel(model, stream, prestart);

    timer.stop();

    return {
      requested_method: 'preheatModel',
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0,
      response_data: { model, status: 'running' }
    };
  }

  async showModelStates(): Promise<RPCAPIResponse<any>> {
    const requestTimestamp = performance.now();
    const timer = new Timer();
    timer.start();

    const ollama = LazyOllama.getInstance();
    const state = ollama.getStateOfCaches();

    timer.stop();

    return {
      requested_method: 'showModelStates',
      response_data: state,
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }
}

export default RPCController;
