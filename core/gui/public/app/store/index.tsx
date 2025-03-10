import { create } from 'zustand';
import { LazyOllamaDashboardSidebarNavigationItemProps } from '@/gui/components/DashboardSidebar/components/Nav/Item/types';
import { OllamaModel } from '../types';
import { Home, Box, Play, BarChart2, Settings, Bolt } from 'lucide-react';
import React from 'react';

export type ViewState = 'home' | 'models' | 'running' | 'modelfile-builder' | 'stats' | 'settings';

export type ApplicationStoreState = {
  ui: {
    view: ViewState;
    expanded_model: OllamaModel | null;
    sidebar: { items: LazyOllamaDashboardSidebarNavigationItemProps[] };
  };
  api: {
    available_models: OllamaModel[];
    running_models: OllamaModel[];
  };
};

export type ApplicationStoreActions = {
  updateUiViewState(view: ViewState): void;
  setExpandedModel(model: OllamaModel | null): void;
};

export type ApplicationStore = ApplicationStoreActions & ApplicationStoreState;

export const useApplicationStore = create<ApplicationStore>(($set) => ({
  ui: { 
    view: 'home', 
    expanded_model: null,
    sidebar: {
      items: [
        {
          icon: <Home className="lazyollama-gui__nav-icon" />,
          label: 'Home',
          to: 'home'
        },
        {
          icon: <Box className="lazyollama-gui__nav-icon" />,
          label: 'Models',
          to: 'models'
        },
        {
          icon: <Play className="lazyollama-gui__nav-icon" />,
          label: 'Running Models',
          to: 'running'
        },
        {
          icon: <Bolt className="lazyollama-gui__nav-icon" />,
          label: 'Modelfile Builder (Beta)',
          to: 'modelfile-builder'
        },
        {
          icon: <BarChart2 className="lazyollama-gui__nav-icon" />,
          label: 'Statistics',
          to: 'stats'
        },
        {
          icon: <Settings className="lazyollama-gui__nav-icon" />,
          label: 'Settings',
          to: 'settings'
        }
      ]
    }
  },
  updateUiViewState(view) {
    $set((state) => ({ ui: { ...state.ui, view } }));
  },
  setExpandedModel(model) {
    $set((state) => {
      if (state.ui.expanded_model === model) {
        return { ui: { ...state.ui, expanded_model: null } };
      } else {
        return { ui: { ...state.ui, expanded_model: model } };
      }
    });
  },

  api: {
    available_models: [],
    running_models: []
  }
}));
