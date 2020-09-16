const fs = require('fs');
const path = require('path');

// https://stackoverflow.com/a/55566081/417806
const readdirSync = (p, a = []) => {
  if (fs.statSync(p).isDirectory()) {
    fs.readdirSync(p).map(f => readdirSync(a[a.push(path.join(p, f)) - 1], a));
  }
  return a;
};

// TODO also duplicated in commands/build.js 
const pagesPath = path.join(process.cwd(), 'www');
const graph = readdirSync(pagesPath) // TODO make async while starting server and puppeteer?
  .map(file => {
    file = file.replace(`${process.cwd()}/www/`, '');
    // console.log('file', file);
    
    const filename = file.split('/').length > 1 
      ? file.split('/')[file.split('/').length - 1]
      : file;
    const extension = path.extname(file);
    const label = filename
      .replace('.md', '')
      .replace('.html', '')
      .replace('-', ' ')
      .split(' ')
      .map((word) => {
        return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
      })
      .join(' ');

    if (extension === '.html') {
      if (file.indexOf('templates/') >= 0) {
        return null;
      }
      return {
        file,
        label,
        link: `/${file}`
      };
    }

    if (extension === '.md') {
      if (file.indexOf('pages/') >= 0) {
        file = file.replace('pages/', '');
        file = file.replace(extension, '.html');
      }

      const pieces = file.split('/');

      pieces[pieces.length - 1] = pieces[pieces.length - 1].replace('.html', '');

      return {
        file,
        label,
        link: `/${pieces.join('/')}/index.html`
      };
    }
  }).filter(page => page);

// console.log('!!!!graph!!!!', graph);

if (!fs.existsSync(`${process.cwd()}/.greenwood`)) {
  fs.mkdirSync(path.join(process.cwd(), '.greenwood'));
}

fs.writeFileSync(`${path.join(process.cwd(), '.greenwood')}/graph.json`, JSON.stringify(JSON.stringify(graph)));