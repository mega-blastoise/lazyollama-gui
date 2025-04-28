import React from 'react';
import {
  LazyOllamaWebThemeProvider,
  ToastProvider
} from '@lazyollama-gui/typescript-react-components';
import { WorkerProvider } from '@/gui/contexts';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <LazyOllamaWebThemeProvider>
      <ToastProvider>
        <WorkerProvider>
          {children}
        </WorkerProvider>
      </ToastProvider>
    </LazyOllamaWebThemeProvider>
  );
}

export default Layout;
