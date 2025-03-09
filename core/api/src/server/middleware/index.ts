import logger from '../../log';

export function middleware(request: Request): Request | Response {
  const url = new URL(request.url);
  logger.info('%s %s', request.method, url.pathname);
  return request;
}
