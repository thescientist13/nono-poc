const Koa = require('koa');
const { promises: fs } = require("fs");
const path = require('path');
const app = new Koa();

app.use(async ctx => {
  // console.log(ctx);
  
  if (ctx.request.url === '/') {
    const indexPath = path.join(process.cwd(), './src', 'index.html');

    ctx.body = await fs.readFile(indexPath, 'utf-8');
  }

  if (ctx.request.url.indexOf('.html') >= 0) {
    const htmlPath = path.join(process.cwd(), './src', ctx.request.url);

    ctx.set('Content-Type', 'text/html');
    ctx.body = await fs.readFile(htmlPath, 'utf-8');
  }

  if (ctx.request.url.indexOf('.js') >= 0) {
    const jsPath = path.join(process.cwd(), './src', ctx.request.url);

    ctx.set('Content-Type', 'text/javascript');
    ctx.body = await fs.readFile(jsPath, 'utf-8');
  }

  if (ctx.request.url.indexOf('.css') >= 0) {
    const cssPath = path.join(process.cwd(), './src', ctx.request.url);

    ctx.set('Content-Type', 'text/css');
    ctx.body = await fs.readFile(cssPath, 'utf-8');
  }

});

app.listen(3000);