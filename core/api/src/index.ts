import { Ollama as LazyOllama } from '@lazyollama-gui/typescript-clients';

import logger from './log';
import { createRunningBunServer } from './server';

/**
 * Populate the model cache with currently running models,
 * since we're sure that LazyOllama is sharing the same OllamaClient instance,
 * our handlers will be able to access the same model cache when an initial request is made,
 * 
 * HOWEVER, in effect since we're preemptively creating an OllamaClient instance to facilitate this call,
 * we get literally zero advantage out of lazily preparing the OllamaClient instance by wrapping it in a LazySingletonFactory,
 * because we're basically eagerly creating the instance anyway.
 * 
 * This is a tradeoff that we have to make for now, but in the future,
 * I'll just generally be better and wiser and know how to patch this.
 */
await LazyOllama.getInstance().init();

const server = createRunningBunServer();
logger.info('Server running @ %s', server.url);
