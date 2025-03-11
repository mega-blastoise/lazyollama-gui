import './Dashboard.css';

import React, { useEffect } from 'react';
import { useTheme } from '@lazyollama-gui/typescript-react-components';
import { LazyOllamaDashboardSidebar } from '@/gui/components/DashboardSidebar';
import { LazyOllamaDashboardSectionHeader } from '@/gui/components/DashboardSectionHeader';
import { LazyOllamaDashboardMainContent } from '../DashboardMainContent';
import useGetLocalModelStates from '@/gui/hooks/useGetLocalModelStates';
import useGetRemoteModels from '@/gui/hooks/useGetRemoteModels';

const LazyOllamaDashboard = () => {
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  const localModelsStatesQuery = useGetLocalModelStates();
  const remoteModelsQuery = useGetRemoteModels();

  useEffect(() => {}, [
    localModelsStatesQuery.data,
    localModelsStatesQuery.isError,
    localModelsStatesQuery.isLoading
  ]);

  useEffect(() => {}, [
    remoteModelsQuery.data,
    remoteModelsQuery.isError,
    remoteModelsQuery.isLoading
  ]);

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
