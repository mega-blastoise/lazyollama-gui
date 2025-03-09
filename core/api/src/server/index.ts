import getBunServerConfig from './config';

export function createRunningBunServer() {
  return Bun.serve(getBunServerConfig());
}
