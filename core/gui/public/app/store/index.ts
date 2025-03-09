import { create } from 'zustand';
import { OllamaModel } from '../types';

type ViewState = 'home' | 'models' | 'running' | 'stats' | 'settings';

type ApplicationStoreState = {
  ui: {
    view: ViewState;
    expanded_model: OllamaModel | null;
  };
  api: {
    available_models: OllamaModel[];
    running_models: OllamaModel[];
  };
};

type ApplicationStoreActions = {
  updateUiViewState(view: ViewState): void;
  setExpandedModel(model: OllamaModel | null): void;
};

type ApplicationStore = ApplicationStoreActions & ApplicationStoreState;

export const useApplicationStore = create<ApplicationStore>(($set) => ({
  ui: { view: 'home', expanded_model: null },
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
