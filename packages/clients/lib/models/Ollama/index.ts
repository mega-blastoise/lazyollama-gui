import { LazySingleton as SuperLazySingletonFactory } from 'sleepydogs';
import { parse as parseHtml } from 'node-html-parser';
import { createLogger } from '@lazyollama-gui/typescript-common';

export enum OllamaClientCacheType {
  PullQueued = 'pull-queued',
  PullCompleted = 'pull-completed',
  Running = 'running',
  Stopped = 'stopped',
  Available = 'available',
  PullCancelled = 'pull-cancelled' /** This currently will be synonymous with failure */
}

export type AdHocJsonSchema = {
  [key: string]: string | Array<string> | AdHocJsonSchema;
};

export type RunningModelConfiguration = {
  name: string;
  model: number;
  size: string;
  digest: string;
  details: Record<string, string | string[]>;
  expires_at: string;
  size_vram: number | BigInt;
};

export type RunningModelResponse = {
  models: RunningModelConfiguration[];
};

export type ChatPromptConfiguration = {
  model: string;
  prompt?: string;
  suffix?: string;
  images?: Array<Base64URLString>;
  /** the format to return a response in. Format can be json or a JSON schema */
  format?: 'json' | AdHocJsonSchema;
  /** additional model parameters listed in the documentation for the Modelfile such as temperature */
  options?: Record<string, any>;
  /** system message to (overrides what is defined in the Modelfile) */
  system?: string;
  /** the prompt template to use (overrides what is defined in the Modelfile) */
  template?: string;
  /** if false the response will be returned as a single response object, rather than a stream of objects */
  stream?: boolean;
  /** if true no formatting will be applied to the prompt. You may choose to use the raw parameter if you are specifying a full templated prompt in your request to the API */
  raw?: boolean;
  /** controls how long the model will stay loaded into memory following the request (default: 5m) */
  keep_alive?: number;
  /** @deprecated the context parameter returned from a previous request to /generate, this can be used to keep a short conversational memory */
  context?: string;
};

export type ChatPromptFinalResponse = {
  model: string;
  created_at?: string;
  done?: boolean;
  /** time spent generating the response */
  total_duration: string | number | BigInt;
  /** time spent in nanoseconds loading the model */
  load_duration: string | number | BigInt;
  /** number of tokens in the prompt */
  prompt_eval_count: number | BigInt;
  /** time spent in nanoseconds evaluating the prompt */
  prompt_eval_duration: number | BigInt;
  /** number of tokens in the response */
  eval_count: number | BigInt;
  /** time in nanoseconds spent generating the response */
  eval_duration: number | BigInt;
  /** an encoding of the conversation used in this response, this can be sent in the next request to keep a conversational memory */
  context: string | Record<string, unknown> | Array<any> | any;
  /** empty if the response was streamed, if not streamed, this will contain the full response */
  response: string;
};

/**
 * What flows do we need to support?
 *
 * - Querying the remote model registry
 * - Pulling a model into memory from the remote model registry
 */

export class OllamaClient {
  private baseUrl = process.env.DOCKER_NETWORK_OLLAMA_API_URL;
  private cache = new Map<string, Set<string>>();
  private logger = createLogger('lazyollama:typescript:common:ollama:client');

  private remote: {
    registry: {
      url: string;
      models: Array<{
        model: string;
        tags: {
          href: string | undefined;
          label: string | undefined;
          description: string;
        }[];
      }>;
    };
  } = {
    registry: {
      url: 'https://ollama.com/library',
      models: []
    }
  };

  constructor() {
    this.cache.set(OllamaClientCacheType.PullQueued, new Set());
    this.cache.set(OllamaClientCacheType.PullCompleted, new Set());
    this.cache.set(OllamaClientCacheType.Running, new Set());
    this.cache.set(OllamaClientCacheType.Stopped, new Set());
    this.cache.set(OllamaClientCacheType.Available, new Set());
    this.cache.set(OllamaClientCacheType.PullCancelled, new Set());
  }

  async init() {
    const ollamaIsRunning = await this.checkOllamaIsRunning();
    if (!ollamaIsRunning) throw new Error('Ollama is not running');

    await this.indexRemoteRegistryModels();
    await this.indexRunningModels();
  }

  async checkOllamaIsRunning() {
    return (await this._get<string>(this.baseUrl!, 'text')) === 'Ollama is running';
  }

  /**
   * Check the state of the model in the cache.
   * @param model The model to check.
   * @returns A map from the model to an array of cache types it belongs to.
   */
  checkModelStateInCaches(model: string) {
    const state: Record<string, Array<string>> = {};
    for (const [key, value] of this.cache) {
      if (value.has(model)) {
        if (!state[model]) state[model] = [];
        state[model].push(key);
      }
    }

    return state;
  }

  getStateOfCaches() {
    const state: Record<string, Array<string>> = {};
    for (const [key, value] of this.cache) {
      for (const model of value) {
        if (!state[model]) {
          state[model] = [];
        }
        state[model].push(key);
      }
    }
    return state;
  }

  /**
   * Performs a POST request to the Ollama API at the given endpoint,
   * with the given payload.
   * @param endpoint The endpoint to POST to.
   * @param payload The payload to send with the request.
   * @returns The response from the API, parsed as JSON.
   */
  private async _post<T, P>(endpoint: string, payload: P): Promise<T> {
    try {
      const body = JSON.stringify(payload);
      const response = await Bun.fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Content-Length': body.length.toString()
        },
        body
      });
      return response.json() as T;
    } catch (error) {
      this.logger.error(`Error in POST request to ${endpoint}: ${error}`);
      throw error;
    }
  }

  /**
   * Performs a GET request to the Ollama API at the specified endpoint.
   * @param endpoint The endpoint to send the GET request to.
   * @returns The response from the API, parsed as JSON.
   */
  private async _get<T>(endpoint: string, responseType: 'json' | 'text' = 'json') {
    try {
      const response = await Bun.fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      return responseType === 'json'
        ? (response.json() as Promise<T>)
        : (response.text() as Promise<string>);
    } catch (error) {
      this.logger.error(`Error in GET request to ${endpoint}: ${error}`);
      throw error;
    }
  }

  async indexRunningModels(): Promise<void> {
    const running = await this.getRunningModels();
    if (running && running?.models && Array.isArray(running)) {
      const runningModels = running.models.map((m) => m.name);
      this.cache.set(OllamaClientCacheType.Running, new Set(runningModels));
    }
  }

  /**
   * Get a list of all running models.
   * @returns A list of running models.
   */
  async getRunningModels(): Promise<RunningModelResponse> {
    return this._get('/api/ps') as Promise<RunningModelResponse>;
  }

  /**
   * Pull a model from the Ollama library.
   * @param model The name of the model to pull.
   * @param stream Whether to stream the response.
   */
  async pullModel(model: string, stream = false, prestart = true): Promise<void> {
    try {
      const payload = { model, stream };
      const cache = this.cache.get(OllamaClientCacheType.PullQueued)!;
      const cached = cache.has(model);

      if (cached) {
        return;
      }

      const onSuccess = ({ status }: { status: string }) => {
        if (status === 'success') {
          this.cache.get(OllamaClientCacheType.PullQueued)!.delete(model);
          this.cache.get(OllamaClientCacheType.PullCompleted)!.add(model);
          this.cache.get(OllamaClientCacheType.Available)!.add(model);
          this.logger.info(`Pulled model ${model}`);

          /** Preload the model into memory pre-emptively */
          if (prestart) this.startModel(model);
        } else {
          this.logger.error(`Error pulling model ${model}: ${status}`);
          this.cache.get(OllamaClientCacheType.PullCancelled)!.add(model);
          setTimeout(
            () => {
              this.cache.get(OllamaClientCacheType.PullCancelled)!.delete(model);
            },
            60 * 60 * 1000
          ); // 1 hour
          this.cache.get(OllamaClientCacheType.PullQueued)!.delete(model);
        }
      };

      const onError = (e: unknown) => {
        if (e instanceof Error) {
          this.logger.error(`Error pulling model ${model}: ${e.message}`);
        } else {
          this.logger.error(`Error pulling model ${model}: ${e}`);
        }

        this.cache.get(OllamaClientCacheType.PullQueued)!.delete(model);
      };

      this._post<{ status: string }, typeof payload>('/api/pull', payload)
        .then(onSuccess)
        .catch(onError);
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`Error pulling model ${model}: ${e.message}`);
      } else {
        this.logger.error(`Error pulling model ${model}: ${e}`);
      }
    }
  }

  /**
   * Start a model by loading it into memory (empty prompt).
   * @param model The model name to load.
   */
  async startModel(model: string): Promise<any> {
    if (this.cache.get(OllamaClientCacheType.Running)!.has(model)) {
      return;
    }

    // Sending an empty prompt loads the model into memory.
    const stream = false;
    const payload = { model, stream } as ChatPromptConfiguration;

    const onSuccess = ({ done }: ChatPromptFinalResponse) => {
      if (done) this.cache.get(OllamaClientCacheType.Running)!.add(model);
    };

    const onError = (e: unknown) => {
      if (e instanceof Error) {
        this.logger.error(`Error starting model ${model}: ${e.message}`);
      } else {
        this.logger.error(`Error starting model ${model}: ${e}`);
      }
      this.cache.get(OllamaClientCacheType.Running)!.delete(model);
    };

    return this._post<ChatPromptFinalResponse, ChatPromptConfiguration>(
      '/api/generate',
      payload
    )
      .then(onSuccess)
      .catch(onError);
  }

  /**
   * Prompt a model to generate a response.
   * @param model The model name.
   * @param prompt The prompt to be sent.
   * @param stream Whether to use a streaming response.
   */
  async promptModel(prompt: ChatPromptConfiguration): Promise<any> {
    return this._post('/api/generate', { ...prompt, stream: false });
  }

  /**
   * Stop a model by unloading it from memory.
   * @param model The model name to unload.
   */
  async stopModel(model: string): Promise<any> {
    // Setting keep_alive to 0 unloads the model.
    const payload: ChatPromptConfiguration = {
      model,
      keep_alive: 0,
      stream: false
    };
    return this._post<ChatPromptFinalResponse, ChatPromptConfiguration>(
      '/api/generate',
      payload
    );
  }

  /**
   * Cleanup memory by unloading all running models.
   */
  async cleanupMemory(): Promise<any[] | null> {
    /** Could also use the cache here, might be faster */
    const running = await this._get<{ models: { name: string }[] }>('/api/ps');
    if (typeof running !== 'string' && running.models && Array.isArray(running.models)) {
      const unloadPromises = running.models.map((m) => this.stopModel(m.name));
      return Promise.all(unloadPromises);
    }
    return null;
  }

  async indexRemoteRegistryModels(): Promise<void> {
    try {
      const response = await Bun.fetch(this.remote.registry.url);
      const text = await response.text();
      const html = parseHtml(text);
      const modelListItems = html.querySelectorAll('li[x-test-model]');
      let modelDtos = modelListItems.map(async (item) => {
        const titleElement = item.querySelector('[x-test-model-title]');
        const title = titleElement?.getAttribute('title');

        if (!title) return null;
        const tagsUrl = this.remote.registry.url + `/${title}/tags`;
        const tagsResponse = await Bun.fetch(tagsUrl);
        const tagsText = await tagsResponse.text();
        const tagsHtml = parseHtml(tagsText);
        const tagListItems = tagsHtml.querySelectorAll('div.flex.px-4.py-3');
        let tagDtos = tagListItems.map((div) => {
          const a = div.querySelector('a.group');
          const href = a?.getAttribute('href');
          const label = a?.firstChild?.textContent;
          const span = div.querySelector('span');
          const spanText = span?.firstChild?.textContent + ',' + span?.textContent;
          return {
            href,
            label,
            description: spanText
          };
        });

        if (!tagDtos || tagDtos.length === 0) return null;

        return {
          model: title,
          tags: tagDtos
        };
      });

      const resolved = await Promise.all([...modelDtos]);
      const filtered = resolved.filter((dto) => dto !== null);

      this.remote.registry.models = filtered as {
        model: string;
        tags: {
          href: string | undefined;
          label: string | undefined;
          description: string;
        }[];
      }[];
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`Error indexing remote registry models: ${e.message}`);
      }
    }
  }

  getRemoteRegistryModels(): {
    model: string;
    tags: {
      href: string | undefined;
      label: string | undefined;
      description: string;
    }[];
  }[] {
    return this.remote.registry.models;
  }
}

export default SuperLazySingletonFactory(OllamaClient) as ReturnType<
  typeof SuperLazySingletonFactory<OllamaClient>
>;
