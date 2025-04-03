import { watch } from 'fs';
import { rm, copyFile, mkdir, readdir } from 'fs/promises';
import path from 'path';

import clientBuildConfig from '../build/web';

/** Bundle the client */
import '../build/web';

/** Start the server */
import './index';

/** 
 * Watch for changes in the client and rebuild the client dist on a change event
 */

const distDir = path.resolve(process.cwd(), 'out');
const clientSrcDir = path.resolve(process.cwd(), 'src', 'client');
const clientDistDir = path.resolve(process.cwd(), 'out', 'gui', 'browser');
const clientStylesDistDir = path.resolve(process.cwd(), 'out', 'css');
const clientPublicStylesDir = path.resolve(process.cwd(), 'public');

async function rebuildClientDist() {
  await rm(clientDistDir, { recursive: true, force: true });
  await rm(clientStylesDistDir, { recursive: true, force: true });
  await Bun.build(clientBuildConfig);
  console.warn('Rebuilt client dist');

  await mkdir(clientStylesDistDir, { recursive: true });
  await copyFile(
    path.resolve(distDir, 'index.css'),
    path.resolve(clientStylesDistDir, 'lazyollama-styles.css')
  );
  await copyFile(
    path.resolve(clientPublicStylesDir, 'styles.css'),
    path.resolve(clientPublicStylesDir, 'lazyollama-base.css')
  );

  const hydrateCss = await getBundledHydrateCssFilename();
  if (hydrateCss) {
    await copyFile(
      path.resolve(clientDistDir, hydrateCss),
      path.resolve(clientStylesDistDir, 'lazyollama-variables.css')
    );
  }
}

async function getBundledHydrateCssFilename() {
  const files = await readdir(clientDistDir, {
    withFileTypes: true,
    encoding: 'utf-8',
    recursive: true
  });
  return files.find((f) => f.name.startsWith('hydrate') && f.name.endsWith('.css'))?.name;
}

const clientSrcWatcher = watch(clientSrcDir, { recursive: true }, async (event, filename) => {
  console.warn('A change event occurred in client directory: %s', filename);
  await rebuildClientDist();
  console.warn('Rebuilt client dist');
});
