import { type RPCAPIResponse } from '../rpc';

type OllamaModelStatusUpdate = { model: string; status: string };

export interface IOllamaRPCAPI {
  [k: string]: {
    params: any[];
    result: any;
  },

  'model.pull': {
    params: [model: string];
    result: RPCAPIResponse<OllamaModelStatusUpdate, IOllamaRPCAPI>;
  };

  'model.preheat': {
    params: [model: string];
    result: RPCAPIResponse<OllamaModelStatusUpdate, IOllamaRPCAPI>;
  };

  'model.start': {
    params: [model: string];
    result: RPCAPIResponse<OllamaModelStatusUpdate, IOllamaRPCAPI>;
  };

  'model.stop': {
    params: [model: string];
    result: RPCAPIResponse<OllamaModelStatusUpdate, IOllamaRPCAPI>;
  };

  'models.status': {
    params: [];
    result: RPCAPIResponse<Array<Record<string, string[]>>, IOllamaRPCAPI>;
  };
}
