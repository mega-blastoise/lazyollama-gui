import './Dashboard.css';

import React, { useEffect } from 'react';
import _isEqual from 'lodash.isequal';
import { useTheme } from '@lazyollama-gui/typescript-react-components';
import { LazyOllamaDashboardSidebar } from '@/gui/components/DashboardSidebar';
import { LazyOllamaDashboardSectionHeader } from '@/gui/components/DashboardSectionHeader';
import { LazyOllamaDashboardMainContent } from '@/gui/components/DashboardMainContent';
import useGetLocalModelStates from '@/gui/hooks/useGetLocalModelStates';
import useGetRemoteModels from '@/gui/hooks/useGetRemoteModels';
import { useApplicationStore } from '@/gui/store';

const LazyOllamaDashboard = () => {
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

    const all = ((remote as any)?.data as any)?.response_data;

    console.log({ local, remote, all });

    updateApiState({
      models: {
        ...api.models,
        remote: all
      }
    });
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
