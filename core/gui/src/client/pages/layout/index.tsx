import React from 'react';
import Html from './Html';
import Layout from './Layout';

export function withPageLayout<P>(Component: React.ComponentType<P>): React.ComponentType<P> {
  return function App(props: P) {
    return (
      <Html>
        <Layout>
          <Component {...(props as P & React.JSX.IntrinsicAttributes)} />
        </Layout>
      </Html>
    );
  };
}
