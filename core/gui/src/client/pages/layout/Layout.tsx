import React from 'react';
import {
  LazyOllamaWebThemeProvider,
  ToastProvider
} from '@lazyollama-gui/typescript-react-components';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <LazyOllamaWebThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </LazyOllamaWebThemeProvider>
  );
}

export default Layout;
