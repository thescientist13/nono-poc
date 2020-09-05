// import html from '@open-wc/rollup-plugin-html';
// import { path } from 'path';
import postcss from 'rollup-plugin-postcss';
import multiInput from 'rollup-plugin-multi-input';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

function myExample () {
  console.log('MY EXAMPLE??????????');
  return {
    name: 'my-example', // this name will show up in warnings and errors
    resolveId(source) {
      console.log('inside resolveId with sauce', source);
      if (source === 'virtual-module') {
        return source; // this signals that rollup should not ask other plugins or check the file system to find this id
      }
      return null; // other ids should be handled as usually
    },
    load(id) {
      console.log('inside load => id', id);
      if (id === 'virtual-module') {
        return 'export default "This is virtual!"'; // the source code for "virtual-module"
      }
      return null; // other ids should be handled as usually
    }
  };
}

export default [{
  input: 'www/**/*.js',
  output: { 
    dir: 'public'
    // entryFileNames: '[name].[hash].js',
    // chunkFileNames: '[name].[hash].js'
  },
  plugins: [
    myExample(),
    multiInput(),
    // html({
    //   files: 'public/**/*.html'
    // }),
    nodeResolve(),
    terser()
  ]
  // input: 'www/**/*.js',
  // output: { 
  //   dir: 'public',
  //   entryFileNames: '[name].[hash].js',
  //   chunkFileNames: '[name].[hash].js'
  // },
  // plugins: [
  //   multiInput(),
  //   nodeResolve(),
  //   terser()
  // ]
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