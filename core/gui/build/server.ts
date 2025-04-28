import { type BuildConfig } from 'bun';
import PackageJson from '../package.json';

const external = Array.from(new Set([...Object.keys(PackageJson.dependencies)]));

const ServerBuildConfig = {
  entrypoints: ['src/index.ts'],
  outdir: './out',
  target: 'bun',
  format: 'esm',
  splitting: false,
  sourcemap: 'linked',
  root: process.cwd() + '/src',
  external
} as BuildConfig;

Bun.build(ServerBuildConfig);

export default ServerBuildConfig;