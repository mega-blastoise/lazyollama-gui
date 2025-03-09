Bun.build({
  entrypoints: ['public/dashboard.html', 'public/404.html'],
  outdir: './out/web/static',
  minify: {
    identifiers: true,
    syntax: true,
    whitespace: true
  },
  root: process.cwd()
});
