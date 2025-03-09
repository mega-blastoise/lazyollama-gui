import { OllamaModel } from '@/gui/types';

// Mock data for the wireframe
const availableModels = [
  {
    id: 'llama3',
    name: 'Llama 3',
    description: "Meta's open LLM",
    tags: ['8B', '16B'],
    downloaded: true,
    running: true
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description: "Mistral AI's open model",
    tags: ['7B'],
    downloaded: true,
    running: false
  },
  {
    id: 'qwen',
    name: 'Qwen',
    description: 'Reasoning model of the Qwen series',
    tags: ['32B'],
    downloaded: false,
    running: false
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: 'First-generation reasoning model',
    tags: ['7B', '67B'],
    downloaded: false,
    running: false
  }
];

const runningModels = availableModels.filter((model) => model.running);

interface LazyOllamaDashboardModelsViewProps {
  models: {
    available: OllamaModel[];
    running: OllamaModel[];
  };
}

export { type LazyOllamaDashboardModelsViewProps }