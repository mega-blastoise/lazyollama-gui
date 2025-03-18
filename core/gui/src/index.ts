import { createLogger } from '@lazyollama-gui/typescript-common';
import createRunningBunServer from './server';
const server = createRunningBunServer();
createLogger('lazyollama-gui:core:web:server').info(
  'Started! Listening @ ',
  'http://' + server.hostname + ':' + server.port + '/'
);
