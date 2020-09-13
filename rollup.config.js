import fs from 'fs';
import { promises as fsPromises } from 'fs';
import htmlparser2 from 'htmlparser2';
import multiInput from 'rollup-plugin-multi-input';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const workspaceDirectory = path.join(process.cwd(), 'www');
const scratchDirectory = path.join(process.cwd(), '.greenwood');
const outputDirectory = path.join(process.cwd(), 'public');

function greenwoodWorkspaceResolver () {
  return {
    name: 'greenwood-workspace-resolver', // this name will show up in warnings and errors
    resolveId(source) {
      // TODO better way to handle relative paths?  happens in generateBundle too
      if ((source.indexOf('./') === 0 || source.indexOf('/') === 0) && path.extname(source) !== '.html' && fs.existsSync(path.join(workspaceDirectory, source))) {
        const resolvedPath = source.replace(source, path.join(workspaceDirectory, source));
        console.log('resolve THIS sauce to workspace directory, returning ', resolvedPath);
        
        return resolvedPath; // this signals that rollup should not ask other plugins or check the file system to find this id
      }

      return null; // other ids should be handled as usually
    }
  };
}

// https://github.com/rollup/rollup/issues/2873
function greenwoodHtmlPlugin() {

  return {
    name: 'greenwood-html-plugin',
    load(id) {
      if (path.extname(id) === '.html') {
        return '';
      }
    },
    // TODO do this during load instead?
    async buildStart(options) {
      // TODO dont emit duplicate scripts, e.g. use a Map()
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

      for (const input in options.input) {
        const inputHtml = options.input[input];
        const html = await fsPromises.readFile(inputHtml, 'utf-8');

        parser.write(html);
        parser.end();
        parser.reset();
      }
    },
    async generateBundle(outputOptions, bundles) {
      // TODO looping over bundles twice is wildly inneficient, should refactor and safe references once
      for (const bundleId of Object.keys(bundles)) {
        const bundle = bundles[bundleId];

        // TODO handle (!) Generated empty chunks .greenwood/about, .greenwood/index
        if (bundle.isEntry && path.extname(bundle.facadeModuleId) === '.html') {
          const html = await fsPromises.readFile(bundle.facadeModuleId, 'utf-8');
          let newHtml = html;

          const parser = new htmlparser2.Parser({
            onopentag(name, attribs) {
              if (name === 'script' && attribs.type === 'module') {
                for (const innerBundleId of Object.keys(bundles)) {
                  if (bundles[innerBundleId].facadeModuleId.indexOf(attribs.src.replace('.', '')) > 0 
                    || bundles[innerBundleId].facadeModuleId.indexOf(attribs.src.replace('/', '')) > 0) {
                    newHtml = newHtml.replace(attribs.src, `/${innerBundleId}`);
                  }
                }
              }
            }
          });

          parser.write(html);
          parser.end();

          // TODO this seems hacky :D
          bundle.fileName = bundle.facadeModuleId.replace('.greenwood', './public');
          bundle.code = newHtml;
        }
      }
    }
  };
}

export default [{
  // TODO Avoid .greenwood/ directory, do everything in public/?
  input: `${scratchDirectory}/**/*.html`,
  output: { 
    dir: outputDirectory,
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
  input: `${workspaceDirectory}/**/*.css`, // TODO emits a www/styles.js file?
  output: { // TODO CSS filename hashing / cache busting - https://github.com/egoist/rollup-plugin-postcss/pull/226
    dir: outputDirectory
  },
  plugins: [
    multiInput(),
    postcss({
      extract: true,
      minimize: true
    })
  ]
}];