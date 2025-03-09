import type { Preview } from '@storybook/react'
import '../lib/styles/variables.css'
import '../lib/styles/reset.css'


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