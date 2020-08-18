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
    let contents = await fs.readFile(htmlPath, 'utf-8');
    
    // use an HTML parser?  https://www.npmjs.com/package/node-html-parser
    contents = contents.replace('</head>', '<script src="http://localhost:35729/livereload.js?snipver=1"></script></head>');

    ctx.set('Content-Type', 'text/html');
    ctx.body = contents;
  }

  if (ctx.request.url.indexOf('.js') >= 0) {
    const jsPath = path.join(userWorkspace, ctx.request.url);

    ctx.set('Content-Type', 'text/javascript');
    ctx.body = await fs.readFile(jsPath, 'utf-8');
  }

  if (ctx.request.url.indexOf('.css') >= 0) {
    const cssPath = path.join(userWorkspace, ctx.request.url);

    ctx.set('Content-Type', 'text/css');
    ctx.body = await fs.readFile(cssPath, 'utf-8');
  }

});

app.listen(3000);
liveReloadServer.watch(userWorkspace);