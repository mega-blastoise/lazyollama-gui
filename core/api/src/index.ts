import { scheduleJob } from 'node-schedule';
import { Ollama as LazyOllama } from '@lazyollama-gui/typescript-clients';

import logger from './log';
import { createRunningBunServer } from './server';

const refresh = scheduleJob('LazyOllama:recurringIndexUpdate', '', async () => {});

const server = createRunningBunServer();
logger.info('Server running @ %s', server.url);
