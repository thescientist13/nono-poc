import html from '@open-wc/rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import multiInput from 'rollup-plugin-multi-input';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [{
  input: 'www/**/*.html',
  output: { 
    dir: 'public',
    entryFileNames: '[name].[hash].js',
    chunkFileNames: '[name].[hash].js'
  },
  plugins: [
    nodeResolve(),
    terser(),
    html()
  ]
}, {
  input: 'www/**/*.css', // TODO emits a www/styles.js file?
  output: {  // TODO CSS filename hashing / cache busting
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