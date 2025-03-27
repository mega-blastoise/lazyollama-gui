import React from 'react';
import { ComprehensiveModel } from '../../DashboardModelsView.utils';
import { ModelCard } from '../ModelListItem';

function ModelsList({
  models,
  range
}: {
  models: ComprehensiveModel[];
  range: [number, number];
}) {
  return (
    <div className="lazyollama-gui__models-list">
      {models.slice(range[0], range[1]).map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  );
}

export default ModelsList;
export { ModelsList };
