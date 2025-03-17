import { LazySingleton as SuperLazySingletonFactory } from 'sleepydogs';
import { parse as parseHtml } from 'node-html-parser';
import { createLogger } from '@lazyollama-gui/typescript-common';
import {
  OllamaClientCacheType,
  type ChatPromptConfiguration,
  type ChatPromptFinalResponse,
  type RunningModelResponse,
  type RemoteModelStub,
  type NodeHtmlParserHTMLElement
} from './types';
/**
 * What flows do we need to support?
 *
 * - Querying the remote model registry
 * - Pulling a model into memory from the remote model registry
 * - Starting a model
 * - Stopping a model
 * - Unloading a model
 * - Prompting a model
 * - Getting usage insights into memory and space usage of a model
 * - Get a state of all local models
 */

export class OllamaClient {
  private baseUrl = process.env.DOCKER_NETWORK_OLLAMA_API_URL;
  private cache = new Map<OllamaClientCacheType, Set<string>>();
  private logger = createLogger('lazyollama:typescript:common:ollama:client');

  private remote: {
    registry: {
      url: string;
      models: Array<RemoteModelStub>;
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

  async updateInternalIndexes() {
    try {
      const ollamaIsRunning = await this.checkOllamaIsRunning();
      if (!ollamaIsRunning) throw new Error('Ollama is not running');

      await this.indexRemoteRegistryModels();
      await this.indexAvailableModels();
      await this.indexRunningModels();
    } catch (e) {
      if (e instanceof Error && e.message === 'Ollama is not running') {
        throw e;
      }

      this.logger.error(e);
      /**
       * @todo: Attempt to remediate
       */
    }
  }

  async checkOllamaIsRunning() {
    return (await this._get<string>(this.baseUrl!, 'text')) === 'Ollama is running';
  }

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
    if (running?.models?.length) {
      const runningModels = running.models.map((m) => m.name!);
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

  async indexAvailableModels(): Promise<void> {
    const available = await this.getAvailableModels();
    if (available?.models?.length) {
      const availableModels = available.models.map((m) => m.name!);
      this.cache.set(OllamaClientCacheType.Available, new Set(availableModels));
    }
  }

  async getAvailableModels(): Promise<RunningModelResponse> {
    return this._get('/api/tags·') as Promise<RunningModelResponse>;
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

      this._post<{ status: string }, typeof payload>('/api/pull', payload)
        .then(this.getPullModelOnSuccessCallback(model, prestart).bind(this))
        .catch(this.getPullModelOnErrorCallback(model).bind(this));
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`Error pulling model ${model}: ${e.message}`);
      } else {
        this.logger.error(`Error pulling model ${model}: ${e}`);
      }
    }
  }

  private getPullModelOnSuccessCallback(
    model: string,
    prestart = true
  ): ({ status }: { status: string }) => void {
    return ({ status }) => {
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
  }

  private getPullModelOnErrorCallback(model: string) {
    return (e: unknown) => {
      if (e instanceof Error) {
        this.logger.error(`Error pulling model ${model}: ${e.message}`);
      } else {
        this.logger.error(`Error pulling model ${model}: ${e}`);
      }

      this.cache.get(OllamaClientCacheType.PullQueued)!.delete(model);
    };
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
      const modelListItems = this.parseModelListItemsFromHtml(html);
      const modelNames = modelListItems
        .map(this.getModelTitleFromListItemMarkup)
        .filter(Boolean);
      const modelPromises = modelNames.map(this.fetchRemoteModelMetadata.bind(this));

      const modelMarkupObjects = await Promise.all(modelPromises).catch((e) => {
        throw e;
      });

      let modelDTOs = modelMarkupObjects
        .map(this.getTagsFromModelPageMarkup.bind(this))
        .flat()
        .filter(Boolean);

      modelDTOs.forEach((dto) => {
        if (!dto) return;
        const { model, description, href, label } = dto;
        const mappedIndex = this.remote.registry.models.find(
          (mapped) => mapped.model === model
        );
        if (!mappedIndex) {
          this.remote.registry.models.push({
            model,
            tags: [
              {
                href,
                label,
                description
              }
            ]
          });
        } else {
          mappedIndex.tags.push({
            description,
            href,
            label
          });
        }
      });
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`Error indexing remote registry models: ${e.message}`);
      }
    }
  }

  private parseModelListItemsFromHtml(
    html: NodeHtmlParserHTMLElement
  ): NodeHtmlParserHTMLElement[] {
    return html.querySelectorAll('li[x-test-model]');
  }

  private getModelTitleFromListItemMarkup(li: NodeHtmlParserHTMLElement): string {
    const titleElement = li.querySelector('[x-test-model-title]');
    return titleElement?.getAttribute('title') || '';
  }

  private async fetchRemoteModelMetadata(modelName: string) {
    const tagsUrl = this.remote.registry.url + `/${modelName}/tags`;
    const tagsResponse = await Bun.fetch(tagsUrl);
    const tagsText = await tagsResponse.text();
    const tagsHtml = parseHtml(tagsText);
    return {
      model: modelName,
      markup: tagsHtml
    };
  }

  private getTagsFromModelPageMarkup({
    model,
    markup
  }: {
    model: string;
    markup: NodeHtmlParserHTMLElement;
  }) {
    const tagListItems = markup.querySelectorAll('div.flex.px-4.py-3');
    return tagListItems.map((div) => {
      const a = div.querySelector('a.group');
      const href = a?.getAttribute('href');
      const label = a?.firstChild?.textContent;
      const span = div.querySelector('span');
      const spanText = span?.firstChild?.textContent + ',' + span?.textContent;

      if (!href || !label || !spanText) return null;

      return {
        model,
        href,
        label,
        description: spanText
      };
    });
  }
}

export default SuperLazySingletonFactory(OllamaClient) as ReturnType<
  typeof SuperLazySingletonFactory<OllamaClient>
>;

export * from './types';
