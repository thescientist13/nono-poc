const Koa = require('koa');
const livereload = require('livereload');
const path = require('path');
const { promises: fs } = require('fs');

const app = new Koa();
const liveReloadServer = livereload.createServer();
const userWorkspace = path.join(process.cwd(), './www');

app.use(async ctx => {
  // console.log(ctx);
  
  if (ctx.request.url === '/') {
    ctx.redirect('/index.html');
  }

  // make sure this only happens for "pages", nor partials or fixtures, templates, et)
  if (ctx.request.url.indexOf('.html') >= 0) {
    const htmlPath = path.join(userWorkspace, ctx.request.url);
    const userPackageJson = require(path.join(process.cwd(), './package.json'));
    let contents = await fs.readFile(htmlPath, 'utf-8');
    
    // use an HTML parser?  https://www.npmjs.com/package/node-html-parser
    contents = contents.replace('</head>', '<script src="http://localhost:35729/livereload.js?snipver=1"></script></head>');
    
    // console.log('dependencies', userPackageJson.dependencies);
    const importMap = {};
    
    Object.keys(userPackageJson.dependencies).map(async package => {
      // console.log('resolve package', package);
      const packageRootPath = path.join(process.cwd(), './node_modules', package);
      const packageJsonPath = path.join(packageRootPath, 'package.json');
      const packageJson = require(packageJsonPath);
      
      // console.log('packageJson', packageJson);
      importMap[package] = `/node_modules/${package}/${packageJson.main}`;
    });

    console.log('importMap', importMap);
    contents = contents.replace('<head>', `
      <head>
        <script defer src="https://unpkg.com/es-module-shims@0.5.2/dist/es-module-shims.js"></script>
        <script type="importmap-shim">
          {
            "imports": ${JSON.stringify(importMap)}
          }
        </script>
    `);

    ctx.set('Content-Type', 'text/html');
    ctx.body = contents;
  }

  if (ctx.request.url.indexOf('/node_modules') >= 0) {
    console.log('node modules!?', ctx.request.url);
    const modulePath = path.join(process.cwd(), ctx.request.url);
    console.log('modulePath', modulePath);
    const contents = await fs.readFile(modulePath, 'utf-8');  // have to handle CJS vs ESM?

    ctx.set('Content-Type', 'text/javascript');
    ctx.body = contents;
  }

  if (ctx.request.url.indexOf('/node_modules') < 0 && ctx.request.url.indexOf('.js') >= 0) {
    const jsPath = path.join(userWorkspace, ctx.request.url);
    const contents = await fs.readFile(jsPath, 'utf-8');
    ctx.set('Content-Type', 'text/javascript');

    ctx.body = contents;
  }

  if (ctx.request.url.indexOf('.css') >= 0) {
    const cssPath = path.join(userWorkspace, ctx.request.url);

    ctx.set('Content-Type', 'text/css');
    ctx.body = await fs.readFile(cssPath, 'utf-8');
  }

});

app.listen(3000);
liveReloadServer.watch(userWorkspace);