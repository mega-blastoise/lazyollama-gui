import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LazyOllamaWebThemeProvider } from '@lazyollama-gui/typescript-react-components';

function withProviders(Component: React.ReactNode): React.FC {
  const HOC = function () {
    const [client] = useState(() => new QueryClient());
    return (
      <QueryClientProvider client={client}>
        <LazyOllamaWebThemeProvider>{Component}</LazyOllamaWebThemeProvider>
      </QueryClientProvider>
    );
  };

  HOC.displayName = 'LazyOllamaGuiReactApp';

  return React.memo(HOC);
}

/**
 * Renders a given React component to a DOM element.
 * @param Component The React component to be rendered
 * @param props The props to pass to the component
 * @param target The DOM element to render to. Defaults to #app
 */
export function renderComponentToDom<P extends React.JSX.IntrinsicAttributes = {}>(
  Component: React.FC,
  props: P = {} as P,
  target: HTMLElement = document.getElementById('app')!
) {
  let App = withProviders(<Component {...props} />);
  let root = createRoot(target);
  root.render(<App />);
  setTimeout(() => console.log(root), 5000);
}
