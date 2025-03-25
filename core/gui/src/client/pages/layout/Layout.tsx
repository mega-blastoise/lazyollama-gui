import React from 'react';
import { LazyOllamaWebThemeProvider } from '@lazyollama-gui/typescript-react-components';

type Props = {
    children: React.ReactNode
};

function Layout({ children }: Props) {
  return (
      <LazyOllamaWebThemeProvider>{children}</LazyOllamaWebThemeProvider>
  );
}

export default Layout;