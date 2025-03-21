import { ApplicationStoreState } from '@/gui/store';

type ComprehensiveModel = Omit<ApplicationStoreState['api']['models']['available'][0], 'tags'>;

export function getComprehensiveModelsList(
  api: ApplicationStoreState['api']
): ComprehensiveModel[] {
  const { available = [], running = [], remote = [] } = api?.models || {};

  let filter = new Set<string>();

  return remote
    .map(({ model, tags }) => {
      return tags.map((tag) => ({
        model,
        tag: tag.href?.replaceAll('/library/', '').replaceAll(`${model}:`, '')
      }));
    })
    .flat()
    .map(({ model, tag }) => {
      if (tag === undefined) return null;
      const spec = `${model}:${tag}`;
      return {
        name: model,
        downloaded: available.some(({ name }) => name === spec),
        running: running.some(({ name }) => name === spec),
        model_spec: spec,
        model_prefix: model,
        id: spec,
        description: '',
        model_parameters: tag
      };
    })
    .filter((model) => model !== null)
    .filter((model) => {
      if (filter.has(model.model_spec)) return false;
      else filter.add(model.model_spec);
      return true;
    }) as ComprehensiveModel[];
}

export function filterEngine(
  models: ComprehensiveModel[],
  popular?: boolean,
  all?: boolean,
  downloaded?: boolean,
  running?: boolean
): ComprehensiveModel[] {
  if (all) return models;
  if (popular)
    models.filter(({ model_prefix }) =>
      [/deepseek/, /llama/, /gemma/, /qwq/, /mistral/, /qwen/].some((regex) => regex.test(model_prefix))
    );

  if (downloaded) return models.filter(({ downloaded }) => downloaded);
  if (running) return models.filter(({ running }) => running);
  return models;
}
