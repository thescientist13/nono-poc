import html from '@open-wc/rollup-plugin-html';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'www/**/*.html',
  output: { 
    dir: 'public' 
  },
  plugins: [
    nodeResolve(),
    html()
  ]
};