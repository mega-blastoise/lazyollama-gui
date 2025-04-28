import { Timer } from 'sleepydogs';
import { Ollama as LazyOllama } from '@lazyollama-gui/typescript-clients';
import {
  type IOllamaRPCAPI,
  OllamaRPCAPIAction,
  OllamaClientCacheType
} from '@lazyollama-gui/typescript-common-types';

import logger from '../../log';

export type PullModelRPCConfiguration = {
  method: OllamaRPCAPIAction.ModelPull;
  params: IOllamaRPCAPI[OllamaRPCAPIAction.ModelPull]['params'];
  result: IOllamaRPCAPI[OllamaRPCAPIAction.ModelPull]['result'];
};

export async function pullModel(
  ...params: PullModelRPCConfiguration['params']
): Promise<PullModelRPCConfiguration['result']> {
  const model = params[0] || arguments[0];
  const requestTimestamp = performance.now();
  const timer = new Timer();
  timer.start();

  logger.info('OllamaAPIRPCServer has received a request to pull model %s', model);

  const ollama = LazyOllama.getInstance();
  const state = ollama.getLocalModelState(model);

  if (state[model]?.includes(OllamaClientCacheType.Running)) {
    logger.warn('Model has already been pulled and is currently running.');
    timer.stop();
    return {
      requested_method: 'pullModel',
      response_data: { model, status: 'already-running' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }

  if (state[model]?.includes(OllamaClientCacheType.Available)) {
    logger.warn('Model has already been pulled.');
    timer.stop();
    return {
      requested_method: 'pullModel',
      response_data: { model, status: 'already-pulled' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }

  logger.warn('Attempting clean pull of model %s from <https://ollama.com/library>.', model);

  const stream = false;
  const prestart = false;

  /**
   * SECTION Event Dispatching
   * Okay so, point of contention.
   *
   * We have this ollama client, and it can perform async operations against the ollama rest api
   * They can take a variable amount of time, but in the shortest case for clean pulls they'll be long.
   *
   * This is of those cases where it's likely not easier to block the request response cycle on awaiting promise execution
   *
   * Small models are like 1gb, and larger ones could be 70+gb
   * So the download time is a downhill curve here.
   *
   * It might make the most sense to attach a callback that we want to fire
   * when the download completes, and then handle each case (Success, Error) accordingly.
   *
   * This will force us into a pattern in which we now need to POST the result of this operation back to the requesting scope
   * Which in this case is gui:4040/api
   *
   * This is more akin to an event driven architecture but we're not using a message or event broker.
   * Instead, different parts of the architecture have information pathways to queue up different events for
   * other parts of the system to react/respond to.
   * !SECTION Event Dispatching
   */
  ollama.pullModel(model, stream, prestart).then(async (result) => {
    const { model, pulled, error, prestarted } = result;

    logger.info('The "PullModel" Job has completed.');

    if (error) {
      logger.warn(
        'The "PullModel" Job has completed, but an error was thrown during the operation.'
      );
      logger.warn(error);
    }

    logger.info(
      'Attempting to POST a PullModel update to GUI for model %s, pulled: %s, error: %s, prestarted: %s',
      model,  
      pulled,
      error,
      prestarted
    );

    try {
      const base = process.env.DOCKER_NETWORK_GUI_SERVER_URL;
      if (!base) {
        throw new Error('DOCKER_NETWORK_GUI_SERVER_URL must be set.');
      }
      const url = new URL(`api/models/pull/response`, base);

      logger.info('Attempting to POST a PullModel update to GUI @ URI ', url.href);

      const body = JSON.stringify({ model, pulled, error, prestarted });

      logger.info('Body: %s', body);

      const res = await Bun.fetch(url, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body).toString(),
          'Content-Encoding': 'gzip, br',
          Accept: 'application/json'
        }
      });

      if (res.status === 200) {
        logger.info('Pull Update Post succeded.');
      } else {
        logger.warn(res.statusText);
      }
    } catch (e) {
      logger.warn('An exception was thrown while trying to POST a PullModel update to GUI');
    }
  });

  timer.stop();

  logger.info('"PullModelJob" Queued.');

  return {
    requested_method: 'pullModel',
    request_accepted: true,
    request_timestamp: requestTimestamp,
    response_timestamp: performance.now(),
    response_time_ms: timer.elapsed() || 0,
    response_data: { model, status: 'pull-queued' }
  };
}

export type StartModelRPCConfiguration = {
  method: OllamaRPCAPIAction.ModelStart;
  params: IOllamaRPCAPI[OllamaRPCAPIAction.ModelStart]['params'];
  result: IOllamaRPCAPI[OllamaRPCAPIAction.ModelStart]['result'];
};

export async function startModel(
  ...params: StartModelRPCConfiguration['params']
): Promise<StartModelRPCConfiguration['result']> {
  const model = params[0] || arguments[0];
  const requestTimestamp = performance.now();
  const timer = new Timer();
  timer.start();

  const ollama = LazyOllama.getInstance();
  const state = ollama.getLocalModelState(model);

  if (state[model]?.includes(OllamaClientCacheType.Running)) {
    timer.stop();
    return {
      requested_method: 'startModel',
      response_data: { model, status: 'already-running' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }

  const modelAlreadyPulled = state[model]?.includes(OllamaClientCacheType.Available);

  if (!modelAlreadyPulled) {
    try {
      await ollama.pullModel(model, false, false);
    } catch (e) {
      timer.stop();
      return {
        requested_method: 'startModel',
        response_data: {
          model,
          status: 'pull-failed',
          error: e instanceof Error ? e.message : String(e)
        },
        request_accepted: true,
        request_timestamp: requestTimestamp,
        response_timestamp: performance.now(),
        response_time_ms: timer.elapsed() || 0
      };
    }
  }

  try {
    await ollama.startModel(model);
    timer.stop();
    return {
      requested_method: 'startModel',
      response_data: { model, status: 'started' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  } catch (e) {
    timer.stop();
    return {
      requested_method: 'startModel',
      response_data: {
        model,
        status: 'start-failed',
        error: e instanceof Error ? e.message : String(e)
      },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }
}

export type StopModelRPCConfiguration = {
  method: OllamaRPCAPIAction.ModelStop;
  params: IOllamaRPCAPI[OllamaRPCAPIAction.ModelStop]['params'];
  result: IOllamaRPCAPI[OllamaRPCAPIAction.ModelStop]['result'];
};

export async function stopModel(
  ...params: StopModelRPCConfiguration['params']
): Promise<StopModelRPCConfiguration['result']> {
  const model: string | undefined = params[0] || arguments[0];
  const requestTimestamp = performance.now();
  const timer = new Timer();
  timer.start();

  if (!model) {
    timer.stop();
    return {
      requested_method: 'stopModel',
      response_data: { model: 'undefined', status: 'no-model' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }

  const ollama = LazyOllama.getInstance();
  const state = ollama.getLocalModelState(model!);

  if (!state[model]?.includes(OllamaClientCacheType.Running)) {
    timer.stop();
    return {
      requested_method: 'stopModel',
      response_data: { model, status: 'not-running' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }

  try {
    await ollama.stopModel(model);
    timer.stop();
    return {
      requested_method: 'stopModel',
      response_data: { model, status: 'stopped' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  } catch (e) {
    timer.stop();
    return {
      requested_method: 'stopModel',
      response_data: {
        model,
        status: 'stop-failed',
        error: e instanceof Error ? e.message : String(e)
      },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }
}

export type PreheatModelRPCConfiguration = {
  method: OllamaRPCAPIAction.ModelPreheat;
  params: IOllamaRPCAPI[OllamaRPCAPIAction.ModelPreheat]['params'];
  result: IOllamaRPCAPI[OllamaRPCAPIAction.ModelPreheat]['result'];
};

export async function preheatModel(
  ...params: PreheatModelRPCConfiguration['params']
): Promise<PreheatModelRPCConfiguration['result']> {
  const model: string | undefined = params[0] || arguments[0];
  const requestTimestamp = performance.now();
  const timer = new Timer();
  timer.start();

  if (!model) {
    timer.stop();
    return {
      requested_method: 'preheatModel',
      response_data: { model: 'undefined', status: 'no-model' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }

  const ollama = LazyOllama.getInstance();
  const state = ollama.getLocalModelState(model!);

  if (state[model]?.includes(OllamaClientCacheType.Running)) {
    timer.stop();
    return {
      requested_method: 'preheatModel',
      response_data: { model, status: 'already-running' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }

  if (!state[model]?.includes(OllamaClientCacheType.Available)) {
    // Need to pull model

    try {
      await ollama.pullModel(model);
    } catch (e) {
      timer.stop();
      return {
        requested_method: 'preheatModel',
        response_data: {
          model,
          status: 'pull-failed',
          error: e instanceof Error ? e.message : String(e)
        },
        request_accepted: true,
        request_timestamp: requestTimestamp,
        response_timestamp: performance.now(),
        response_time_ms: timer.elapsed() || 0
      };
    }
  }

  try {
    await ollama.startModel(model);
    timer.stop();
    return {
      requested_method: 'preheatModel',
      response_data: { model, status: 'started' },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  } catch (e) {
    timer.stop();
    return {
      requested_method: 'preheatModel',
      response_data: {
        model,
        status: 'start-failed',
        error: e instanceof Error ? e.message : String(e)
      },
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }
}
