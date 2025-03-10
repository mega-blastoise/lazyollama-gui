import logger from '../../log';
import RPCController, { type RPCControllerMethods } from '../controller';
import { CORS_HEADERS } from './base';

type RPCRequestBody = {
  method: string;
  params: any[];
  [key: string]: any;
};

export async function handlePOSTAPIRPCMethodRequest(r: Request | Response): Promise<Response> {
  if (r instanceof Response) return r;
  else {
    const body: RPCRequestBody = await r.json();
    const { method = '', params = [] } = body;

    const controller = new RPCController();

    if (!controller.hasMethod(method)) {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const fn = controller.getMethod(method as keyof RPCControllerMethods);

    if (!fn) {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const response = await fn.call(controller, ...params);

    logger.debug('response from method %s %o', method, response);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(response).length.toString(),
        ...CORS_HEADERS.headers
      }
    });
  }
}
