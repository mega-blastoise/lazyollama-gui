import { Ollama as LazyOllama } from '@lazyollama-gui/typescript-clients';
import { createLogger } from '@lazyollama-gui/typescript-common';

const logger = createLogger('lazyollama-api:ollama:init');

export default async function init() {
  logger.info('Initializing Ollama');
  try {
    await LazyOllama.getInstance().updateInternalIndexes();
    logger.info('Finished initializing Ollama');
  } catch(e) {
    logger.error('Error initializing Ollama');
    logger.error(e);
  }
}