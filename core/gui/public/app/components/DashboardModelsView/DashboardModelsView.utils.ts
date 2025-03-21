import { ApplicationStoreState } from '@/gui/store';

export type ComprehensiveModel = Omit<
  ApplicationStoreState['api']['models']['available'][0],
  'tags'
> & {
  commit: string;
  modelStorageSize: string;
};

function parseDescription(description: string) {
  const [commit, modelSize] = description
    .replace('\n', '')
    .replace(',', '')
    .trim()
    .split(' • ');
  return {
    commit,
    modelSize
  };
}

export function getComprehensiveModelsList(
  api: ApplicationStoreState['api']
): ComprehensiveModel[] {
  const { available = [], running = [], remote = [] } = api?.models || {};

  let filter = new Set<string>();

  return remote
    .map(({ model, tags }) => {
      return tags.map((tag) => {
        const desc = parseDescription(tag.description);
        return {
          model,
          tag: {
            label: tag.href?.replaceAll('/library/', '').replaceAll(`${model}:`, ''),
            parameter_size: tag.href?.replaceAll('/library/', '').replaceAll(`${model}:`, ''),
            size: desc.modelSize,
            commit: desc.commit
          }
        };
      });
    })
    .flat()
    .map(({ model, tag }) => {
      if (tag === undefined) return null;
      const spec = `${model}:${tag.label}`;
      return {
        name: model,
        downloaded: available.some(({ name }) => name === spec),
        running: running.some(({ name }) => name === spec),
        model_spec: spec,
        model_prefix: model,
        id: spec,
        description: `${tag.commit} • ${tag.size}`,
        model_parameters: tag.parameter_size,
        commit: tag.commit,
        modelStorageSize: tag.size
      } as ComprehensiveModel;
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
    models.filter(({ model_spec }) =>
      [
        /gemma3:1b/,
        /qwq:32b/,
        /deepseek-r1:1.5b/,
        /deepseek-r1:7b/,
        /deepseek-r1:8b/,
        /deepseek-r1:32b/,
        /deepseek-r1:70b/
      ].some((regex) => regex.test(model_spec))
    );

  if (downloaded) return models.filter(({ downloaded }) => downloaded);
  if (running) return models.filter(({ running }) => running);
  return models;
}
