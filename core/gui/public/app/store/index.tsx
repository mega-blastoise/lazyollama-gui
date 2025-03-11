import { create } from 'zustand';
import { LazyOllamaDashboardSidebarNavigationItemProps } from '@/gui/components/DashboardSidebar/components/Nav/Item/types';
import { OllamaModel } from '../types';
import { Home, Box, Play, BarChart2, Settings, Bolt } from 'lucide-react';
import React from 'react';

export type ViewState =
  | 'home'
  | 'models'
  | 'running'
  | 'modelfile-builder'
  | 'stats'
  | 'settings';

export type ApplicationStoreState = {
  ui: {
    view: ViewState;
    expanded_model: OllamaModel | null;
    sidebar: { items: LazyOllamaDashboardSidebarNavigationItemProps[]; expanded: boolean };
  };
  api: {
    models: {
      available: OllamaModel[];
      running: OllamaModel[];
      remote: {
        model: string;
        tags: {
          href: string | undefined;
          label: string | undefined;
          description: string;
        }[];
      }[];
    };
  };
};

export type ApplicationStoreActions = {
  updateUiViewState(view: ViewState): void;
  setExpandedModel(model: OllamaModel | null): void;
  expandSidebar(): void;
  collapseSidebar(): void;
};

export type ApplicationStore = ApplicationStoreActions & ApplicationStoreState;

export const useApplicationStore = create<ApplicationStore>(($set) => ({
  ui: {
    view: 'home',
    expanded_model: null,
    sidebar: {
      expanded: true,
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

  expandSidebar() {
    $set((state) => {
      return { ui: { ...state.ui, sidebar: { ...state.ui.sidebar, expanded: true } } };
    });
  },

  collapseSidebar() {
    $set((state) => {
      return { ui: { ...state.ui, sidebar: { ...state.ui.sidebar, expanded: false } } };
    });
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
    models: {
      available: [],
      running: [],
      remote: []
    }
  }
}));
