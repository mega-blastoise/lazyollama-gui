import { CORS_HEADERS } from '@/server/cors';
import { getBunServerRef } from '@/server/server';
import { createLogger } from '@lazyollama-gui/typescript-common';
import { BunRoutes } from '@/server/types';

const logger = createLogger('lazyollama:gui:api:model');

export const MODEL_PULL_RESPONSE_ROUTE = '/api/models/pull/response' as const;
/**
 * TODO move this event keying into an enum in types
 */
const MODEL_PULL_EVENT_KEY = 'model-pull-resolved';

export const routes: BunRoutes[string] = {
  POST: async (request) => {
    logger.info('gui:/api/models/pull/response has received a response event.');
    const payload = (await request.json()) || {};
    logger.info('gui:/api/models/pull/response has received a response event with payload %o', payload);
    const server = getBunServerRef();
    logger.info('gui:/api/models/pull/response server reference %o', server?.id);
    
    if (server) {
      /** We need to use a socket to update the Gui Browser App when we receive an update  */
      const model = 'model' in payload ? payload.model : null;
      if (model === null) {
        /**
         * Probably a failure,
         *
         * In this case,
         * we want to update the browser (via ws pub) that the pull for model :model might have failed,
         * then respond back to the API server and log the response
         */
        logger.error('JSON Body Issue: Missing Model Field');
        return new Response('JSON Body Issue: Missing Model Field', { status: 400 });
      }
      const packet = {
        type: MODEL_PULL_EVENT_KEY,
        data: {
          ...payload,
          model
        }
      };
      logger.warn('gui:/api/models/pull/response has received a response event with payload %o', packet);
      server.publish('lazyollama-channel', JSON.stringify(packet));
      logger.info('gui:/api/models/pull/response has sent a response event with payload %o', packet);
      return new Response('', { status: 200, statusText: 'OK' });
    }

    /**
     * If server is a null reference,
     * 
     */
    return new Response('', { status: 200, statusText: 'OK' });
  },
  OPTIONS: () => new Response('', { ...CORS_HEADERS, status: 204 }),
  HEAD: () => new Response('', { status: 200 }),
  GET: () => new Response('Method Not Allowed', { status: 405 }),
  PATCH: () => new Response('Method Not Allowed', { status: 405 }),
  DELETE: () => new Response('Method Not Allowed', { status: 405 }),
  PUT: () => new Response('Method Not Allowed', { status: 405 })
};
