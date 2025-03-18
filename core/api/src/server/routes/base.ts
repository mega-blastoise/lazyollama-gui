import { pipeline } from '@lazyollama-gui/typescript-common';
import { middleware } from '../middleware';

export function handleMethodNotAllowed(request: Request): Response {
  return new Response('Method Not Allowed', { status: 405 });
}

export type HTTPMethodKey = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
export type HTTPMethodHandler = (request: Request) => Response | Promise<Response>;
export type ResponseHandlerObject = Record<HTTPMethodKey, HTTPMethodHandler>;

export function createHTTPMethodHandlerObject(
  handlers: Partial<ResponseHandlerObject>
): ResponseHandlerObject {
  return {
    GET: pipeline<Request, Response>(middleware, handleMethodNotAllowed),
    POST: pipeline<Request, Response>(middleware, handleMethodNotAllowed),
    PUT: pipeline<Request, Response>(middleware, handleMethodNotAllowed),
    DELETE: pipeline<Request, Response>(middleware, handleMethodNotAllowed),
    PATCH: pipeline<Request, Response>(middleware, handleMethodNotAllowed),
    OPTIONS: pipeline<Request, Response>(middleware, handleMethodNotAllowed),
    ...handlers
  };
}

export const CORS_HEADERS = {
  headers: {
    'Access-Control-Allow-Origin': '*', // Gatekeep this to the client host within Docker
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Accept, X-Request-ID, X-Client-Request-ID'
  }
};

export function handleOPTIONSPreflightRequest(request: Request): Response {
  return new Response('', CORS_HEADERS);
}
