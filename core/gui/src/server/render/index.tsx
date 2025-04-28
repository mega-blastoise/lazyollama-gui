import React from 'react';
import { renderToReadableStream } from 'react-dom/server';

import { getClientScript } from '../lib';

type RenderIntoReadableStreamOptions<Props extends React.JSX.IntrinsicAttributes = {}> = {
  assets?: string[];
  Page: React.ComponentType<Props>;
  props?: Props;
};

export async function renderIntoReadableStream(options: RenderIntoReadableStreamOptions) {
  const { Page, props, assets = [] } = options;

  let scripts = [];

  for (const asset of assets) {
    scripts.push(await getClientScript(asset));
  }

  scripts = scripts.filter(Boolean) as string[];

  const controller = new AbortController();
  const signal = controller.signal;

  return renderToReadableStream(<Page {...props} />, {
    bootstrapModules: scripts,
    bootstrapScriptContent: `
      console.log('Bootstrap script content');
    `,
    progressiveChunkSize: 4096,
    signal
  });
}
