import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import rollupAlias from '@rollup/plugin-alias';
import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';
import path from 'path';
import rollupPostcss from 'rollup-plugin-postcss';

const alias = fromRollup(rollupAlias);
const replace = fromRollup(rollupReplace);
const postcss = fromRollup(rollupPostcss);

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  open: '/',
  watch: !hmr,

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  appIndex: 'index.html',

  /** Confgure bare import resolve plugin */
  // nodeResolve: {
  //   exportConditions: ['browser', 'development']
  // },

  mimeTypes: {
    '**/*.css': 'js',
    '**/*.scss': 'js',
  },

  plugins: [
    replace({
      preventAssignment: true,
      // setting "include" is important for performance
      include: ['node_modules/@urql/core/**/*', 'node_modules/graphql/**/*'],
      'process.env.NODE_ENV': '"development"',
    }),

    alias({
      entries: [
        {
          find: /^src\/(.*)\.js$/,
          replacement: path.resolve('out-tsc', 'src/$1.js'),
        },
        {
          find: /^carbon\/(.*)\.js$/,
          replacement: path.resolve('out-tsc', 'src/carbon/$1.js'),
        },

        {
          find: /^src\/(.*)$/,
          replacement: path.resolve('src', '$1'),
        },
        {
          find: /^carbon\/(.*)$/,
          replacement: path.resolve('src', 'carbon/$1'),
        },
      ],
    }),

    postcss({
      plugins: [],
    }),

    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    hmr &&
      hmrPlugin({
        exclude: ['node_modules/**/*'],
        presets: [presets.litElement],
      }),
  ],

  // See documentation for all available options
});
