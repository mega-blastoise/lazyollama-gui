import '@lazyollama-gui/typescript-react-components/main.css';
import '../public/app/components/Dashboard/Dashboard.css';
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;