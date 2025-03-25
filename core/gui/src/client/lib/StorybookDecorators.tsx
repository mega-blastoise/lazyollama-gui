import React from 'react';
import { LazyOllamaWebThemeProvider } from '@lazyollama-gui/typescript-react-components';

class StorybookDecorators {
  static withLazyOllamaWebThemeProvider = (Story: any) => {
    return (
      <LazyOllamaWebThemeProvider>
        <Story />
      </LazyOllamaWebThemeProvider>
    );
  };

  static withLightMode = (Story: any) => {
    return (
      <div className="lazyollama-gui lazyollama-gui--light">
        <Story />
      </div>
    );
  };

  static withDarkMode = (Story: any) => {
    return (
      <div className="lazyollama-gui lazyollama-gui--dark">
        <Story />
      </div>
    );
  };
}

export default StorybookDecorators;
