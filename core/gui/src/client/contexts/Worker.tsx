import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeWorker } from '@/gui/workers';
import { useApplicationStore } from '../store';

import { getComprehensiveModelsList } from '../components/DashboardModelsView/DashboardModelsView.utils';
import { useToast } from '@lazyollama-gui/typescript-react-components';

type WorkerContext = {
  state: {
    listeners: 'ready' | 'not-ready';
  };
  ref: ReturnType<typeof initializeWorker>;
};

const defaultContext: WorkerContext = {
  state: {
    listeners: 'not-ready'
  },
  ref: undefined
};

const WorkerContext = createContext<WorkerContext>(defaultContext);

export function useWorker() {
  return useContext(WorkerContext);
}

export function WorkerProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [setupListeners, setSetupListeners] = useState(false);
  const [worker, setWorker] = useState<ReturnType<typeof initializeWorker>>();

  const {
    state: { apiQueues },
    updateAppSharedState,
    api,
    updateApiState
  } = useApplicationStore();

  const { showToast } = useToast();

  useEffect(() => {
    console.log('Worker Context has mounted to the DOM');
    setMounted(true);
    const $worker = initializeWorker();
    console.log('Worker ref: %o', $worker);
    if ($worker) {
      console.log('Setting up listeners on worker ref');
      setMounted(true);
      $worker.onmessage = (event) => {
        console.info('Worker (web-main-thread) received message');
        const eventType = event?.data?.type || 'unknown';
        const data = event?.data || {};
        console.info(event, data);
        switch (eventType) {
          case 'model-pull-resolved': {
            /**
             * We want to update our local state with a new field that says this model was downloaded in this session
             */

            const { model: modelSpec, pulled, prestarted } = data;

            const model = getComprehensiveModelsList(api).find(
              ({ model_spec }) => modelSpec === model_spec
            );

            const modelTags = api.models.remote.find(
              ({ model: rmodel }) => rmodel === modelSpec
            )?.tags;

            if (pulled && model && modelTags) {
              /**
               * Remove the model from the pullQueued queue
               */
              updateAppSharedState({
                apiQueues: {
                  ...apiQueues,
                  pullQueued: apiQueues.pullQueued.filter(
                    (queueItem) => queueItem !== modelSpec
                  )
                }
              });

              /** 
               * Add the model to the current session available
               */
              updateApiState({
                ...api,
                session: {
                  ...api.session,
                  available: [...api.session.available, { ...model, tags: [] }]
                }
              });
            }

            showToast({
              variant: 'success',
              content: `${modelSpec} was pulled successfully! You dog!`,
              duration: 15000
            });

            break;
          }
          default: {
            console.log('Unknown message type: %s', eventType);
            console.log('Data sent: %o', data);
            console.warn('Doing nothing.');
          }
        }
      };
      setWorker($worker);
      setSetupListeners(true);
      console.log('Finshed setting up listeners on worker ref');
    } else {
      /**
       * We should alert that we have failed to connect to the worker
       * And we should intelligently re-try and dispatch an alert
       * if we are able to connect
       * or ultimately if we timeout and are unable
       */
      console.warn(
        'Context Component [WorkerProvider]: Failed to connect to $worker reference. Re-trying...'
      );
      const intTime = 500;
      const interval = setInterval(() => {
        if (mounted && worker && setupListeners) {
          clearInterval(interval);
          console.log('Worker Context has attached to the worker reference');
        } else {
        }
      }, intTime);
      const maxTime = 20000;
      const timeout = setTimeout(() => clearInterval(interval), maxTime);
    }
  }, []);

  return (
    <WorkerContext.Provider
      value={{ state: { listeners: setupListeners ? 'ready' : 'not-ready' }, ref: worker }}
    >
      {children}
    </WorkerContext.Provider>
  );
}
