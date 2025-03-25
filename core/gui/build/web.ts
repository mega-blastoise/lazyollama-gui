Bun.build({
  entrypoints: ['src/client/browser/hydrate.tsx'],
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
    entry: '[name].[hash].[ext]',
    chunk: '[name].[hash].[ext]',
    asset: '[name].[ext]'
  }
});
