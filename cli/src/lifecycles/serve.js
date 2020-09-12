const acorn = require('acorn');
const { promises: fsp } = require('fs');
const fs = require('fs');
const html = require('rehype-stringify');
const Koa = require('koa');
const livereload = require('livereload');
const path = require('path');
const remark = require('remark-parse');
const remark2rehype = require('remark-rehype');
const unified = require('unified');
const walk = require('acorn-walk');

const app = new Koa();
const liveReloadServer = livereload.createServer();
const port = 3000;
const userWorkspace = path.join(process.cwd(), './www');

app.use(async ctx => {
  // console.log(ctx);
  
  if (ctx.request.url === '/') {
    ctx.redirect('/index.html');
  }

  // make sure this only happens for "pages", nor partials or fixtures, templates, et)
  if (ctx.request.url.indexOf('.html') >= 0) {
    const barePath = `${userWorkspace}/${ctx.request.url.replace('.html', '')}`;
    const userPackageJson = require(path.join(process.cwd(), './package.json'));

    // TODO
    // - production bundling / serving
    // - handle frontmatter / page templates
    // - live reload
    if (fs.existsSync(`${barePath}.html`)) {
      contents = await fsp.readFile(`${barePath}.html`, 'utf-8');
    } else if (fs.existsSync(`${barePath}.md`)) {
      const markdownContents = await fsp.readFile(`${barePath}.md`, 'utf-8');
      const markdownHtml = await unified()
        .use(remark)
        .use(remark2rehype)
        .use(html)
        .process(markdownContents);

      contents = `
        <!DOCTYPE html>
          <html lang="en" prefix="og:http://ogp.me/ns#">
            <head>
              <title>NoNo POC - Contact Page</title>
              <meta charset='utf-8'>
              <meta name='viewport' content='width=device-width, initial-scale=1'/>
              <meta name='description' content='NoNo POC'/>
            </head>
            <body>
              <section>
                ${ markdownHtml.contents }
              </section>
            </body>
          </html>
      `;
    }
    
    // use an HTML parser?  https://www.npmjs.com/package/node-html-parser
    contents = contents.replace('</head>', '<script src="http://localhost:35729/livereload.js?snipver=1"></script></head>');
    
    contents = contents.replace(/type="module"/g, 'type="module-shim"');
    // console.log('dependencies', userPackageJson.dependencies);
    const importMap = {};
    
    Object.keys(userPackageJson.dependencies).forEach(dependency => {
      const packageRootPath = path.join(process.cwd(), './node_modules', dependency);
      const packageJsonPath = path.join(packageRootPath, 'package.json');
      const packageJson = require(packageJsonPath);
      const packageEntryPointPath = path.join(process.cwd(), './node_modules', dependency, packageJson.main);
      const packageFileContents = fs.readFileSync(packageEntryPointPath, 'utf-8');

      walk.simple(acorn.parse(packageFileContents, { sourceType: 'module' }), {
        ImportDeclaration(node) {
          // console.log('Found a ImportDeclaration');
          const sourceValue = node.source.value;

          if (sourceValue.indexOf('.') !== 0 && sourceValue.indexOf('http') !== 0) {
            // console.log(`found a bare import for ${sourceValue}!!!!!`);
            importMap[sourceValue] = `/node_modules/${sourceValue}`;
          }
        },
        ExportNamedDeclaration(node) {
          // console.log('Found a ExportNamedDeclaration');
          const sourceValue = node && node.source ? node.source.value : '';

          if (sourceValue.indexOf('.') !== 0 && sourceValue.indexOf('http') !== 0) {
            // console.log(`found a bare export for ${sourceValue}!!!!!`);
            importMap[sourceValue] = `/node_modules/${sourceValue}`;
          }
        }
      });
      
      // console.log('packageJson', packageJson);
      importMap[dependency] = `/node_modules/${dependency}/${packageJson.main}`;
    });

    // console.log('importMap all complete', importMap);
    
    contents = contents.replace('<head>', `
      <head>
        <script defer src="/node_modules/es-module-shims/dist/es-module-shims.js"></script>
        <script type="importmap-shim">
          {
            "imports": ${JSON.stringify(importMap, null, 1)}
          }
        </script>
    `);

    if (process.env.__GWD__ === 'build') { // eslint-disable-line no-underscore-dangle
      // TODO setup and teardown should be done together
      // console.log('running in build mode, polyfill WebComponents for puppeteer');
      contents = contents.replace('<head>', `
        <head>
          <script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
      `);
    }

    ctx.set('Content-Type', 'text/html');
    ctx.body = contents;
  }

  if (ctx.request.url.indexOf('/node_modules') >= 0) {
    // console.log('node modules!?', ctx.request.url);
    const modulePath = path.join(process.cwd(), ctx.request.url);
    // console.log('modulePath', modulePath);
    const contents = await fsp.readFile(modulePath, 'utf-8'); // have to handle CJS vs ESM?

    ctx.set('Content-Type', 'text/javascript');
    ctx.body = contents;
  }

  if (ctx.request.url.indexOf('/node_modules') < 0 && ctx.request.url.indexOf('.js') >= 0) {
    const jsPath = path.join(userWorkspace, ctx.request.url);
    const contents = await fsp.readFile(jsPath, 'utf-8');
    ctx.set('Content-Type', 'text/javascript');

    ctx.body = contents;
  }

  if (ctx.request.url.indexOf('.css') >= 0) {
    const cssPath = path.join(userWorkspace, ctx.request.url);

    ctx.set('Content-Type', 'text/css');
    ctx.body = await fsp.readFile(cssPath, 'utf-8');
  }

});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
  console.log(`watching directory "${userWorkspace}" for changes.`);
  liveReloadServer.watch(userWorkspace);
});