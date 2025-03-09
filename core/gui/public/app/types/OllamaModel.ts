export type OllamaModel = {
  id: string;
  name: string;
  description: string;
  model_prefix: string;
  model_parameters: string | number;
  model_spec: `${string}:${string}`;
  tags: string[];
  downloaded: boolean;
  running: boolean;
};
