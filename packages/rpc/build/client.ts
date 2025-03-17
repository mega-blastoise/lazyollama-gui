import { type BuildConfig } from 'bun';

export default {
  entrypoints: ['lib/client.ts'],
  outdir: './out',
  target: 'browser',
  format: 'esm',
  splitting: false,
  sourcemap: 'linked',
  minify: true,
  root: '.',
  external: [],
  packages: 'bundle'
} as BuildConfig;
