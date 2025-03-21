import initOllama from './init';
import setupRecurringOllamaIndexUpdate from './refresh';

import logger from './log';
import LazyOllamaRPCServerProvider from './ollama-rpc/server';

await initOllama();

setupRecurringOllamaIndexUpdate();

const rpc = LazyOllamaRPCServerProvider.getInstance();

rpc.start();

logger.info('Server running @ %s', rpc.server!.url);
