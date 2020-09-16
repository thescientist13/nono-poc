const { execSync } = require('child_process');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// https://stackoverflow.com/a/55566081/417806
const readdirSync = (p, a = []) => {
  if (fs.statSync(p).isDirectory()) {
    fs.readdirSync(p).map(f => readdirSync(a[a.push(path.join(p, f)) - 1], a));
  }
  return a;
};

// 1) get all pages / paths (later on will be the graph)
const pagesPath = path.join(process.cwd(), 'www');
const pages = readdirSync(pagesPath) // TODO make async while starting server and puppeteer?
  .map(file => {
    const extension = path.extname(file);

    file = file.replace(`${process.cwd()}/www/`, '');

    if (extension === '.html') {
      if (file.indexOf('templates/') >= 0) {
        return null;
      }
      return file;
    }

    if (extension === '.md') {
      if (file.indexOf('pages/') >= 0) {
        file = file.replace('pages/', '');
      }
      return file.replace(extension, '.html');
    }
  }).filter(page => page);

// console.log('!!!!pages!!!!', pages);

// 2) start server
// TODO this is a hack just for the sake of the POC, will do for real :)
const serverProcess = require('child_process').fork(path.join(__dirname, '..', 'lifecycles', 'serve.js'));

// 3) start puppeteer
const BrowserRunner = require('../lib/browser');
const browserRunner = new BrowserRunner();

const runBrowser = async (pages) => {
  console.log('run browser on pages', pages);
  const outputDir = path.join(process.cwd(), '.greenwood');

  if (!fs.existsSync(outputDir)) {
    await fsPromises.mkdir(outputDir);
  }
  await browserRunner.init();
  
  try {
    return Promise.all(pages.map(async(page) => {
      console.log('serializing page...', page);
      let customDirectory = '';

      page.split('/')
        .forEach(segment => {
          if (segment.indexOf('.html') > 0 || segment.indexOf('/') < 0) {
            segment = segment.replace('.html', '');
          }

          customDirectory = `${customDirectory}/${segment}`;

          if (!fs.existsSync(path.join(outputDir, customDirectory))) {
            // console.log('marking dir', path.join(outputDir, customDirectory));
            fs.mkdirSync(path.join(outputDir, customDirectory));
          }
        });
      
      return browserRunner
        .serialize(`http://127.0.0.1:3000/${page}`)
        .then(async (html) => {
          console.log(`content arrived for page => ${page}!!!`);
          let outputPath = page;

          // TODO seems a little hacky, needs to keep lockstepping with rollup?
          if (page.indexOf('/') > 0 && page.indexOf('index.html') < 0) {
            // console.log('non root nested page found!!!!');
            let pieces = page.split('/');
 
            pieces[pieces.length - 1] = pieces[pieces.length - 1].replace('.html', '/');

            outputPath = `${pieces.join('/')}index.html`;
          }
          
          // TODO allow setup / teardown (e.g. module shims, then remove module-shims)
          let htmlModified = html;

          // TODO should really be happening via plugins or other standardize setup / teardown mechanism
          htmlModified = htmlModified.replace(/<script src="\/node_modules\/@webcomponents\/webcomponentsjs\/webcomponents-bundle.js"><\/script>/, '');
          htmlModified = htmlModified.replace(/<script type="importmap-shim">.*?<\/script>/s, '');
          htmlModified = htmlModified.replace(/<script defer="" src="\/node_modules\/es-module-shims\/dist\/es-module-shims.js"><\/script>/, '');
          htmlModified = htmlModified.replace(/<script src="http:\/\/localhost:35729\/livereload.js\?snipver=1"><\/script>/, '');
          htmlModified = htmlModified.replace(/<script type="module-shim"/g, '<script type="module"');

          await fsPromises.writeFile(path.join(outputDir, outputPath), htmlModified);

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
  serverProcess.kill('SIGINT');
  process.kill(process.pid);
});