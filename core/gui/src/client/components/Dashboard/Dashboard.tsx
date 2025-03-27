import './Dashboard.css';

import React, { useEffect } from 'react';
import _isEqual from 'lodash.isequal';
import { useTheme, useToast } from '@lazyollama-gui/typescript-react-components';
import {
  type RPCAPIResponse,
  type RemoteModelStub,
  type IOllamaRPCAPI
} from '@lazyollama-gui/typescript-common-types';
import { LazyOllamaDashboardSidebar } from '@/gui/components/DashboardSidebar';
import { LazyOllamaDashboardSectionHeader } from '@/gui/components/DashboardSectionHeader';
import { LazyOllamaDashboardMainContent } from '@/gui/components/DashboardMainContent';
import useGetLocalModelStates from '@/gui/hooks/useGetLocalModelStates';
import useGetRemoteModels from '@/gui/hooks/useGetRemoteModels';
import { useApplicationStore } from '@/gui/store';

const LazyOllamaDashboard = () => {
  const { showToast } = useToast();

  const { theme } = useTheme();
  const darkMode = theme.includes('dark');

  const { api, updateApiState } = useApplicationStore();

  const {
    data: local,
    isLoading: localDataIsLoading,
    isError: localDataIsError,
    error: localDataError
  } = useGetLocalModelStates();

  const {
    data: remote,
    isLoading: remoteDataIsLoading,
    isError: remoteDataIsError,
    error: remoteDataError
  } = useGetRemoteModels();

  useEffect(() => {
    if (localDataIsError) {
      console.warn(
        'Issue fetching local Ollama models state: Missing [Available, Running] models',
        localDataError
      );
    }

    if (remoteDataIsError) {
      console.warn(
        'Issue fetching remote Ollama models state: Missing [Remote] models',
        remoteDataError
      );
    }

    if (localDataIsLoading) {
      console.info('Fetching local Ollama models state...');
    }

    if (remoteDataIsLoading) {
      console.info('Fetching remote Ollama models state...');
    }

    const notLoading = !localDataIsLoading && !remoteDataIsLoading;
    const notInError =
      !localDataIsError && !localDataError && !remoteDataIsError && !remoteDataError;

    if (notLoading && notInError) {
      const all = ((remote as any)?.data as RPCAPIResponse<RemoteModelStub[], IOllamaRPCAPI>)
        ?.response_data;

      if (all === undefined) {
        console.warn('Issue fetching remote Ollama models state: Missing [Remote] models');
        /** Figure out why this always fires */
        // showToast({
        //   variant: 'error',
        //   content:
        //     'Issue fetching remote Ollama models from registry <https://ollama.com/library>, current state: Missing [Remote] models. Please refresh and try again.',
        //   duration: 10000
        // });
      }

      if (all && !_isEqual(all, api.models.remote)) {
        updateApiState({
          models: {
            ...api.models,
            remote: all
          }
        });
      }
    } else {
      console.warn('Queries (Models::[Local, Remote]) Failed.');
      console.warn({ exceptions: [localDataError, remoteDataError] });
      showToast({
        variant: 'error',
        content:
          localDataError?.message ||
          remoteDataError?.message ||
          'Check the logs for a more detailed account of the issue.',
        duration: 10000
      });
    }
  }, [
    local,
    remote,
    localDataIsLoading,
    remoteDataIsLoading,
    localDataIsError,
    remoteDataIsError,
    localDataError,
    remoteDataError
  ]);

  useEffect(() => {
    console.log('API State updated', api);
  }, [api]);

  return (
    <div
      className={`lazyollama-gui ${darkMode ? 'lazyollama-gui--dark' : 'lazyollama-gui--light'}`}
    >
      <LazyOllamaDashboardSidebar />
      <div className="lazyollama-gui__main">
        <LazyOllamaDashboardSectionHeader />
        <LazyOllamaDashboardMainContent />
      </div>
    </div>
  );
};

export default LazyOllamaDashboard;
