import PackageJson from '../package.json';

const external = Array.from(
  new Set([
    ...Object.keys(PackageJson.dependencies),
    ...Object.keys(PackageJson.peerDependencies)
  ])
);

Bun.build({
  entrypoints: ['src/index.ts'],
  outdir: './out',
  target: 'bun',
  format: 'esm',
  splitting: false,
  sourcemap: 'linked',
  root: process.cwd() + '/src',
  external
});
