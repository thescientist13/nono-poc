import html from '@open-wc/rollup-plugin-html';
import postcss from 'rollup-plugin-postcss'
import multiInput from 'rollup-plugin-multi-input';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [{
  input: 'www/**/*.html',
  output: { 
    dir: 'public' 
  },
  plugins: [
    nodeResolve(),
    html()
  ]
}, {
  input: 'www/**/*.css',  // TODO emits a www/styles.js file?
  output: {
    dir: 'public' 
  },
  plugins: [
    multiInput(),
    postcss({
      extract: true
    })
  ]
}];