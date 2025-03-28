import { type BuildConfig } from 'bun';

export default {
  entrypoints: ['lib/server.ts'],
  outdir: './out',
  target: 'bun',
  format: 'esm',
  splitting: false,
  sourcemap: 'linked',
  minify: true,
  root: '.',
  external: ['chalk', 'debug', 'node-emoji', 'node-html-parser', 'sleepydogs']
} as BuildConfig;
