import html from '@open-wc/rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import multiInput from 'rollup-plugin-multi-input';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [{
  // input: '.greenwood/**/*.html',
  output: { 
    dir: 'public',
    entryFileNames: '[name].[hash].js',
    chunkFileNames: '[name].[hash].js'
  },
  plugins: [
    multiInput(),
    html({
      files: '.greenwood/**/*.html'
    }),
    nodeResolve(),
    terser()
  ]
}, {
  input: 'www/**/*.css', // TODO emits a www/styles.js file?
  output: { // TODO CSS filename hashing / cache busting - https://github.com/egoist/rollup-plugin-postcss/pull/226
    dir: 'public'
  },
  plugins: [
    multiInput(),
    postcss({
      extract: true,
      minimize: true
    })
  ]
}];