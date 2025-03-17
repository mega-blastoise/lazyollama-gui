import { parse as parseHtml } from 'node-html-parser';

export enum OllamaClientCacheType {
  PullQueued = 'pull-queued',
  PullCompleted = 'pull-completed',
  Running = 'running',
  Stopped = 'stopped',
  Available = 'available',
  PullCancelled = 'pull-cancelled' /** This currently will be synonymous with failure */
}

export type AdHocJsonSchema = {
  [key: string]: string | Array<string> | AdHocJsonSchema;
};

type BaseModelConfiguration = {
  name: string;
  model: string;
  size: number | BigInt;
  digest: string;
  details: {
    parent_model?: string;
    format?: string;
    family: string;
    families: string[];
    parameter_size: string;
    quantization_level: string;
  };
  expires_at: string;
  size_vram: number | BigInt;
};

export type RunningModelConfiguration = Partial<BaseModelConfiguration>;
export type LocalModelConfiguration = Partial<BaseModelConfiguration & { modified_at: string }>;

export type RunningModelResponse = {
  models: RunningModelConfiguration[];
};

export type LocalModelResponse = {
  models: LocalModelConfiguration[];
};

export type ChatPromptConfiguration = {
  model: string;
  prompt?: string;
  suffix?: string;
  images?: Array<Base64URLString>;
  /** the format to return a response in. Format can be json or a JSON schema */
  format?: 'json' | AdHocJsonSchema;
  /** additional model parameters listed in the documentation for the Modelfile such as temperature */
  options?: Record<string, any>;
  /** system message to (overrides what is defined in the Modelfile) */
  system?: string;
  /** the prompt template to use (overrides what is defined in the Modelfile) */
  template?: string;
  /** if false the response will be returned as a single response object, rather than a stream of objects */
  stream?: boolean;
  /** if true no formatting will be applied to the prompt. You may choose to use the raw parameter if you are specifying a full templated prompt in your request to the API */
  raw?: boolean;
  /** controls how long the model will stay loaded into memory following the request (default: 5m) */
  keep_alive?: number;
  /** @deprecated the context parameter returned from a previous request to /generate, this can be used to keep a short conversational memory */
  context?: string;
};

export type ChatPromptFinalResponse = {
  model: string;
  created_at?: string;
  done?: boolean;
  /** time spent generating the response */
  total_duration: string | number | BigInt;
  /** time spent in nanoseconds loading the model */
  load_duration: string | number | BigInt;
  /** number of tokens in the prompt */
  prompt_eval_count: number | BigInt;
  /** time spent in nanoseconds evaluating the prompt */
  prompt_eval_duration: number | BigInt;
  /** number of tokens in the response */
  eval_count: number | BigInt;
  /** time in nanoseconds spent generating the response */
  eval_duration: number | BigInt;
  /** an encoding of the conversation used in this response, this can be sent in the next request to keep a conversational memory */
  context: string | Record<string, unknown> | Array<any> | any;
  /** empty if the response was streamed, if not streamed, this will contain the full response */
  response: string;
};

export type RemoteModelStub = {
  model: string;
  tags: {
    href: string | undefined;
    label: string | undefined;
    description: string;
  }[];
};

export type NodeHtmlParserHTMLElement = ReturnType<typeof parseHtml>;