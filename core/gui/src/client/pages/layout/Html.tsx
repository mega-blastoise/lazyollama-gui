import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

function Html({ children }: Props) {
  const [client] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@1,14..32,600&display=swap"
          rel="stylesheet"
        />
        <title>LazyOllama! Manage Models Lazier And More Better</title>
        <meta
          name="description"
          content="A lazier (sleepier) approach to using Ollama (not to be confused with A llama) to do 'things'."
        />

        <link rel="preload" as="style" href="/css/lazyollama-base.css"></link>
        <link rel="stylesheet" href="/css/lazyollama-base.css"></link>

        <link rel="preload" as="style" href="/css/lazyollama-variables.css"></link>
        <link rel="stylesheet" href="/css/lazyollama-variables.css"></link>

        <link rel="preload" as="style" href="/css/lazyollama-styles.css"></link>
        <link rel="stylesheet" href="/css/lazyollama-styles.css"></link>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <main id="app">
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </main>
      </body>
    </html>
  );
}

export default Html;
