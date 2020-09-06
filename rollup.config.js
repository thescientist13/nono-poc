// import html from '@open-wc/rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
// import commonjs from '@rollup/plugin-commonjs';
import htmlparser2 from 'htmlparser2';
import multiInput from 'rollup-plugin-multi-input';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import { promises as fsPromises } from 'fs';
import fs from 'fs';

const workspaceDirectory = path.join(process.cwd(), 'www');
// const scratchDirectory = path.join(process.cwd(), '.greenwood');
// const outputDirectory = path.join(process.cwd(), 'public');

function greenwoodWorkspaceResolver () {
  return {
    name: 'greenwood-workspace-resolver', // this name will show up in warnings and errors
    async resolveId(source) {
      // console.log('inside resolveId for sauce', source);
      // console.log('source.indexOf(outputDirectory) > 0', source.indexOf(scratchDirectory) === 0);
      // console.log('path.extname(source)', path.extname(source));

      if (source.indexOf('./') === 0 && path.extname(source) !== '.html' && fs.existsSync(path.join(workspaceDirectory, source))) {
        const resolvedPath = source.replace(source, path.join(workspaceDirectory, source));
        console.log('resolve THIS sauce to workspace directory, returning ', resolvedPath);
        
        return resolvedPath; // this signals that rollup should not ask other plugins or check the file system to find this id
      }

      return null; // other ids should be handled as usually
    }
  };
}

function greenwoodHtmlPlugin() {
  console.log('ENTER greenwoodHtmlPlugin!!!!!!!');
  // const userBundles =  new Map();

  return {
    name: 'greenwood-html-plugin', // this name will show up in warnings and errors
    load(id) {
      // console.log('inside load, id is', id);
      if (path.extname(id) === '.html') {
        return '';
      }
    },
    // TODO do this during load instead?
    async buildStart(options) {
      // TODO dont emit duplicate scripts, e.g. use a Map
      const that = this;
      const parser = new htmlparser2.Parser({
        onopentag(name, attribs) {
          if (name === 'script' && attribs.type === 'module') {
            const srcPath = attribs.src;
            const scriptSrc = fs.readFileSync(path.join(workspaceDirectory, srcPath), 'utf-8');

            console.log('emitFile for script => ', srcPath);

            that.emitFile({
              type: 'chunk',
              id: srcPath,
              name: srcPath.split('/')[srcPath.split('/').length - 1].replace('.js', ''),
              source: scriptSrc
            });
          }
        }
      });

      console.log('inside buildStart, scan for deps and emit assets?!');
      console.log(options.input);
      for (const input in options.input) {
        const inputHtml = options.input[input];
        const html = await fsPromises.readFile(inputHtml, 'utf-8');

        // console.log('input file is ', inputHtml);
        // console.log('html', html);

        parser.write(html);
        // parser.end();
        parser.reset();
      }
      parser.end();
    },
    async generateBundle(outputOptions, bundles) {
      // console.log('generateBundle', outputOptions);
      // console.log('generateBundle', bundles);
      // console.log('bundles', bundles);
      // TODO looping over bundles twice is wildly inneficient, should refactor and safe references once
      for (const bundleId of Object.keys(bundles)) {
        const bundle = bundles[bundleId];
        // console.log('???????', bundle);

        // TODO handle (!) Generated empty chunks .greenwood/about, .greenwood/index
        if (bundle.isEntry && path.extname(bundle.facadeModuleId) === '.html') {
          const namePieces = bundle.fileName.split('.');
          const name = `${namePieces[1].split('/')[1]}.html`;
          const html = await fsPromises.readFile(bundle.facadeModuleId, 'utf-8');
          let newHtml = html;
          
          console.log('tranform entry into HTML file', name);

          const parser = new htmlparser2.Parser({
            onopentag(name, attribs) {
              if (name === 'script' && attribs.type === 'module') {
                console.log('hit a script tag!', attribs.src);
                for (const innerBundleId of Object.keys(bundles)) {
                  // console.log('facadeId', bundles[innerBundleId].facadeModuleId);
                  if (bundles[innerBundleId].facadeModuleId.indexOf(attribs.src.replace('.', '')) > 0) {
                    console.log('update path in HTML for facadeId', bundles[innerBundleId].facadeModuleId);
                    console.log('replace attribs.src', attribs.src);
                    console.log('with', innerBundleId);
                    newHtml = newHtml.replace(attribs.src, innerBundleId);
                    console.log('*********************');
                  }
                }
              }
            }
          });

          parser.write(html);
          parser.end();

          bundle.fileName = name;
          bundle.code = newHtml;
        }
      }
    }
  };
}

/*
 * TODO
 * 1. ~~Update script paths in HTML~~
 * 2. ~~Add support for CSS~~
 * 3. Clean up comments, move TODOs to TODO.md
 * 4. Clean up dependencies
 * 5. Avoid .greenwood/ directory, do everything in public/?
 */

// https://github.com/rollup/rollup/issues/2873
export default [{
  input: '.greenwood/**/*.html',
  output: { 
    dir: 'public',
    entryFileNames: '[name].[hash].js',
    chunkFileNames: '[name].[hash].js'
  },
  plugins: [
    nodeResolve(),
    greenwoodWorkspaceResolver(),
    greenwoodHtmlPlugin(),
    multiInput(),
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