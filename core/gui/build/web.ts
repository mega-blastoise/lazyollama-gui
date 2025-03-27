Bun.build({
  entrypoints: ['src/client/browser/hydrate.tsx', 'src/client/browser/worker.ts'],
  outdir: './out/gui/browser',
  target: 'browser',
  format: 'esm',
  splitting: false,
  sourcemap: 'linked',
  minify: true,
  root: process.cwd(),
  external: [],
  packages: 'bundle',
  publicPath: '/',
  naming: {
    asset: '[name].[hash].[ext]',
    entry: '[name].[hash].[ext]',
    chunk: '[name].[hash].[ext]'
  }
});
