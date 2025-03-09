Bun.build({
  entrypoints: ['lib/index.ts'],
  outdir: './out',
  target: 'browser',
  format: 'esm',
  splitting: false,
  sourcemap: 'linked',
  minify: false,
  root: '.',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react-syntax-highlighter', 'sleepydogs', 'classnames']
});
