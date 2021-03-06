// use createSpaConfig for bundling a Single Page App
import { createSpaConfig } from '@open-wc/building-rollup';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import replace from '@rollup/plugin-replace';
import merge from 'deepmerge';
import path from 'path';
import postcss from 'rollup-plugin-postcss';

// use createBasicConfig to do regular JS to JS bundling
// import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createSpaConfig({
  // use the outputdir option to modify where files are output
  // outputDir: 'dist',

  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  // legacyBuild: true,

  // development mode creates a non-minified build for debugging or development
  developmentMode: process.env.ROLLUP_WATCH === 'true',

  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: false,
});

export default merge(baseConfig, {
  // if you use createSpaConfig, you can use your index.html as entrypoint,
  // any <script type="module"> inside will be bundled by rollup
  input: './index.html',

  // alternatively, you can use your JS as entrypoint for rollup and
  // optionally set a HTML template manually
  // input: './app.js',

  // Set `this` to `window` for `focus-visible` module.
  // https://rollupjs.org/guide/en/#modulecontext
  // https://github.com/adobe/spectrum-web-components/blob/5477e2946254a6808b3809110da1eaea79f2f92b/projects/example-project-rollup/rollup.config.js#L45
  moduleContext: {
    [require.resolve('focus-visible')]: 'window',
  },

  plugins: [
    replace({
      preventAssignment: true,
      // setting "include" is important for performance
      include: ['node_modules/@urql/core/**/*', 'node_modules/graphql/**/*'],
      'process.env.NODE_ENV': '"production"',
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

    commonjs(),

    postcss({
      include: ['src/**/*', 'node_modules/carbon-components/**/*'],
      plugins: [],
      inject: false,
    }),

    dynamicImportVars({
      exclude: 'node_modules/**',
    }),
  ],
});
