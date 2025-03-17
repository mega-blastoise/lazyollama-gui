import { rm } from 'fs/promises';
import path from 'path';

import { createLogger } from '@lazyollama-gui/typescript-common';

import ClientConfig from './build/client';
import ServerConfig from './build/server';

const log = createLogger('lazyollama:rpc:build');

async function build() {
  try {
    log.info('Building...');
    log.info('Building client...');
    await Bun.build(ClientConfig);
    log.info('Building server...');
    await Bun.build(ServerConfig);
    log.info('Done! :rocket:');
  } catch (e1) {
    try {
      log.warn(e1);
      await rm(path.resolve(process.cwd(), 'out'));
    } catch (e2) {
      log.error(e2);
    }
  }
}

build();
