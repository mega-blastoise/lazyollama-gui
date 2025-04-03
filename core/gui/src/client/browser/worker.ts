import { OllamaRPCAPIAction } from '@lazyollama-gui/typescript-common-types';
import rpc from '@/gui/lib/api/rpc-client';

type PullResult = Awaited<ReturnType<typeof rpc.model.pull.fn>>;

const socket = new WebSocket('ws://0.0.0.0:4040/api/ws');

function setupSocketListeners() {
  socket.onopen = () => {
    console.log('WebSocket connection opened');
  };
  socket.onmessage = (event) => {
    const data = typeof event?.data === 'string' ? JSON.parse(event.data) : event.data;
    const type = data?.type || 'unknown';
    console.info('Message type: %s', type);
    console.info('Message data: %o', data);
    switch (type) {
      case 'model-pull-resolved': {
        console.log('An event of type %s has occurred', type);
        const { model, pulled, error, prestarted } = data;
        if (error || !pulled || !model) {
          postErrorMessage(error, data?.requestId, type);
        } else {
          postMessage({
            type: 'model-pull-resolved',
            data: {
              model,
              pulled,
              prestarted
            }
          });
        }
        break;
      }
      default: {
        console.warn('Unknown message type: %s', type);
        console.warn('Doing nothing.');
      }
    }
  };
  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };
  socket.onerror = (event) => {
    console.error('WebSocket error:', event);
  };
}

function postErrorMessage(error: unknown, reqId?: string, req?: string) {
  postMessage({
    type: 'error',
    metadata: {
      requestInfo: {
        id: reqId,
        requestType: req
      }
    },
    error
  });
}

async function workerPullModelJob(data: any, type: string) {
  const model = 'model' in data.data ? data.data.model : null;
  if (model === null) {
    console.warn(
      "No model in message. What do you want me to just pull every model? I'm not doing that, sorry."
    );
    postErrorMessage('Missing Data Payload (Model)', data?.requestId, type);
    return;
  }

  const result = await rpc.model.pull.fn([model]);

  const { response_data = undefined } =
    ((result as unknown as { data: PullResult })?.data as PullResult) || result || {};

  if (response_data === undefined) {
    postErrorMessage(result, data?.requestId, type);
    return;
  }

  const { status } = response_data;

  if (status.toLowerCase() !== 'success') {
    postErrorMessage(result, data?.requestId, type);
    return;
  }

  postMessage({
    type,
    metadata: {
      requestInfo: {
        id: data?.requestId,
        requestType: type
      }
    },
    data: result
  });
}

onmessage = async (event) => {
  console.info('Worker (web) received message');
  console.info('Event: %o', event);

  const data = event.data;
  const type: string = 'type' in data ? data.type : 'unknown';

  console.info('Message type: %s', type);

  if (type === 'unknown') {
    console.warn('Unknown message type. Be more specific. Doing nothing.');
    postErrorMessage('Missing Message Type', data?.requestId, type);
    return;
  }

  if (!('data' in data)) {
    console.warn('No data in message. Kind of hard to tell what you want me to do.');
    console.warn('  Doing nothing.');
    postErrorMessage('Missing Data Payload (Body)', data?.requestId, type);
    return;
  }

  switch (type) {
    case OllamaRPCAPIAction.ModelPull: {
      console.log('An event of type %s has occurred', type);
      console.warn('Attempting to queue "PullModel" job in lazyollama-api...');
      await workerPullModelJob(data, type);
      console.info('Queued %s!', data?.data?.model);
      break;
    }
    case 'INIT': {
      console.info('Connected to main browser thread!');
      setupSocketListeners();
      break;
    }
    default: {
      console.warn('Unknown message type: %s', type);
      console.warn('Doing nothing.');
    }
  }
};
