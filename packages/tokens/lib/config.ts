import { type Config } from 'style-dictionary';

export default {
  source: ['lib/tokens/**/*.json'],
  platforms: {
    esm: {
      transformGroup: 'js',
      buildPath: 'out/tokens/',
      files: [
        {
          format: 'javascript/es6',
          destination: 'index.js',
          options: {
            outputReferences: true
          }
        },
        {
          format: 'typescript/es6-declarations',
          destination: 'index.d.ts',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    cjs: {
      transformGroup: 'js',
      buildPath: 'out/tokens/',
      files: [
        {
          format: 'javascript/module',
          destination: 'index.cjs',
          options: {
            outputReferences: true
          }
        },
        {
          format: 'typescript/module-declarations',
          destination: 'index.cjs.d.ts',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    json: {
      transformGroup: 'web',
      buildPath: 'out/tokens/json/',
      files: [
        {
          format: 'json',
          destination: 'tokens.json',
          options: {
            outputReferences: true
          }
        },
        {
          format: 'json/flat',
          destination: 'tokens.flat.json',
          options: {
            outputReferences: false
          }
        }
      ]
    },
    css: {
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/px',
        'color/css',
        'custom/name/prefix'
      ],
      buildPath: 'out/tokens/css/',
      options: {
        outputReferences: true,
        namespace: 'paldea'
      },
      files: [
        {
          format: 'css/variables',
          destination: 'variables.css',
          options: {
            outputReferences: true
          }
        },
        {
          format: 'cf/css/namespaced-variables',
          destination: 'paldea-theme.css',
          options: {
            outputReferences: true,
            namespace: 'paldea'
          }
        }
      ]
    },
    scss: {
      transformGroup: 'scss',
      transforms: [
        'attribute/cti',
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/px',
        'color/css',
        'custom/name/prefix'
      ],
      buildPath: 'out/tokens/scss/',
      options: {
        outputReferences: true,
        namespace: 'paldea'
      },
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    'react-native': {
      transformGroup: 'react-native',
      buildPath: 'out/tokens/react-native/',
      files: [
        {
          destination: 'variables.js',
          format: 'javascript/es6',
          options: {
            outputReferences: true
          }
        }
      ]
    }
  }
} as Config;
