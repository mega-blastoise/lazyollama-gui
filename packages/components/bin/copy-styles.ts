#! /usr/bin/env bun

import path from 'path';
import fs from 'fs';

import { glob } from 'glob';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import { createLogger } from '@lazyollama-gui/typescript-common';

const log = createLogger('lazyollama:components:bin:css-processor');

const root = process.cwd();
const dist = path.resolve(root, 'out', 'css');

const unique = ['variables.css', 'reset.css'];

const makeDistDir = async () => await fs.promises.mkdir(dist, { recursive: true });
const makeComponentsDir = async () => await fs.promises.mkdir(path.resolve(dist, 'components'));
const rmDistDir = () => fs.rmSync(dist, { force: true, recursive: true });

async function main() {
  try {
    if (await fs.promises.exists(dist)) rmDistDir();
    await makeDistDir();
    await makeComponentsDir();

    const files = await glob('./lib/**/*.css', {
      withFileTypes: true,
      cwd: process.cwd(),
      debug: false
    });

    log.info(`Found ${files.length} CSS files to process :sparkle:`);

    const processor = postcss([autoprefixer, cssnano]);

    const promises = files.map(async (file) => {
      const isComponent = (file.parentPath || file.path).includes('components/') && !unique.includes(file.name);
      const from = path.resolve(file.parentPath || file.path, file.name);
      const to = isComponent
        ? path.resolve(dist, 'components', file.name)
        : path.resolve(dist, file.name);

      const css = await Bun.file(from, { type: 'text/css' }).text();

      const result = await processor.process(css, {
        from,
        to,
        map: false
      });

      for (const warning of result.warnings()) {
        log.warn(`:warning: %s`, warning);
      }

      for (const message of result.messages) {
        log.info('Message of type %s from %s', message.type, JSON.stringify(message.plugin));
      }

      await Bun.write(to, result.css, { createPath: true });

      log.info(`Processed: ${from} -> ${to}`);
    });

    await Promise.all(promises);
    log.info('CSS processing completed successfully! :check:');
  } catch (error) {
    log.error('Error processing CSS files:', error);
    rmDistDir();
    process.exit(1);
  }
}

await main();
