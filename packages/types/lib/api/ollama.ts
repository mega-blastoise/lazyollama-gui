import { type RPCAPIResponse } from '../rpc';

type OllamaModelStatusUpdate = { model: string; status: string };

export enum OllamaRPCAPIAction {
  ModelPull = 'model.pull',
  ModelPreheat = 'model.preheat',
  ModelStart = 'model.start',
  ModelStop = 'model.stop',
  ModelsStatus = 'models.status'
}

export interface IOllamaRPCAPI {
  [k: string]: {
    params: any[];
    result: any;
  },

  [OllamaRPCAPIAction.ModelPull]: {
    params: [model: string];
    result: RPCAPIResponse<OllamaModelStatusUpdate, IOllamaRPCAPI>;
  };

  [OllamaRPCAPIAction.ModelPreheat]: {
    params: [model: string];
    result: RPCAPIResponse<OllamaModelStatusUpdate, IOllamaRPCAPI>;
  };

  [OllamaRPCAPIAction.ModelStart]: {
    params: [model: string];
    result: RPCAPIResponse<OllamaModelStatusUpdate, IOllamaRPCAPI>;
  };

  [OllamaRPCAPIAction.ModelStop]: {
    params: [model: string];
    result: RPCAPIResponse<OllamaModelStatusUpdate, IOllamaRPCAPI>;
  };

  [OllamaRPCAPIAction.ModelsStatus]: {
    params: [];
    result: RPCAPIResponse<Array<Record<string, string[]>>, IOllamaRPCAPI>;
  };
}
