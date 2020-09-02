const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
// const rollup = require('rollup');
// const rollupConfig = require('../../../rollup.config');

// 1) get all pages / paths (later on will be the graph)
const pagesPath = path.join(process.cwd(), 'www');
const pages = fs.readdirSync(pagesPath) // TODO make async while starting server and puppeteer?
  .map(file => {
    const extension = path.extname(file);

    if (extension === '.html') {
      console.log(`found page: ${file}`);
      console.log('pagesPath', pagesPath);
      return file;
    }
  }).filter(page => page);

console.log('pages', pages);

// 2) start server
// TODO this is a hack just for the sake of the POC, will do for real :)
require('child_process').fork(path.join(__dirname, '..', 'lifecycles', 'serve.js'));

// 3) start puppeteer
const BrowserRunner = require('../lib/browser');
const browserRunner = new BrowserRunner();
const polyfillPath = path.join(process.cwd(), 'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js');

const runBrowser = async (pages) => {
  console.log('run browser on pages', pages);
  await browserRunner.init();
  fs.mkdirSync(path.join(process.cwd(), '.greenwood'));
  
  try {
    return Promise.all(pages.map(async(page) => {
      const polyfill = fs.readFileSync(polyfillPath, 'utf8');
      const outputDir = path.join(process.cwd(), '.greenwood');
      const workspaceDir = path.join(process.cwd(), 'www');

      console.log('serializing page...', page);

      // TODO should definitely NOT be writing to user's source directory!!!
      const originalPagePath = path.join(workspaceDir, page);
      const originalPageContents = fs.readFileSync(originalPagePath, 'utf8');
      const originalPageContentsPolyfilled = originalPageContents.replace('<body>', `<script>${polyfill}</script><body>`);

      fs.writeFileSync(originalPagePath, originalPageContentsPolyfilled);
      
      return await browserRunner
        .serialize(`http://127.0.0.1:3000/${page}`)
        .then(async (html) => {
          console.log('content arrived!!!');  
          const target = path.join(outputDir, page);

          // TODO allow setup / teardown (e.g. module shims, then remove module-shims)
          let htmlModified = html;

          htmlModified = htmlModified.replace(polyfill, '');
          htmlModified = htmlModified.replace(/<script type="importmap-shim">.*?<\/script>/s, '');
          htmlModified = htmlModified.replace(/<script defer="" src="\/node_modules\/es-module-shims\/dist\/es-module-shims.js"><\/script>/, '');
          htmlModified = htmlModified.replace(/<script src="http:\/\/localhost:35729\/livereload.js\?snipver=1"><\/script>/, '');
          htmlModified = htmlModified.replace(/<script type="module-shim"/g, '<script type="module"');

          fs.writeFileSync(path.join(target), htmlModified);
          fs.writeFileSync(originalPagePath, originalPageContents);
        });
    }));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return false;
  }
};

// 4) run puppeteer and put output into .greenwood/
runBrowser(pages).then(() => {
  console.log('done serializing!');
  browserRunner.close();

  // TODO rollup only understands ESM in Node :/
  // rollup.write(rollupConfig);

  // 5) run rollup on .greenwood and put into public/
  // TODO this is a hack just for the sake of the POC, will do for real :)
  execSync('rollup -c ./rollup.config.js');

  // TODO this is a hack just for the sake of the POC, will do for real :)
  // stop Koa instead
  process.kill(process.pid);
});