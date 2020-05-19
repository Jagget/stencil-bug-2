import {Config} from '@stencil/core';
import {less} from '@stencil/less';
import progress from 'rollup-plugin-progress';
import clear from 'rollup-plugin-clear';
import path from 'path';

const license = require('rollup-plugin-license');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');

export const config: Config = {
  namespace: 'the',
  testing: {
    /**
     * Gitlab CI doesn't allow sandbox, therefor this parameters must be passed to your Headless Chrome
     * before it can run your tests
     */
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  nodeResolve: {
    browser: true
  },
  plugins: [
    progress({clearLine: false}),
    license({
      sourcemap: true,
      banner: {
        commentStyle: 'regular',
        content: `Copyright (c)`,
      },
      thirdParty: {
        includePrivate: true,
        output: {
          file: path.join(__dirname, 'NOTICE.txt'),
          encoding: 'utf-8',
        },
      },
    }),
    less({
      plugins: [
        new LessPluginAutoPrefix({
          browsers: ['last 2 versions'],
        }),
      ],
    }),
    clear({
      targets: ['./.stencil', './dist', './loader'],
    }),
  ],
};
