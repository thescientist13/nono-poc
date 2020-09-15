## ✅ In the beginning...

### Goals
1. HTML / CSS
1. JavaScript
1. Couple components
1. Let's think about the future...

## ✅ It's Dangerous to go alone, pt. 1... Local Development Workflows

### Goals
1. simple dev server w/ `npx http-server src`
1. External Packages w/ import maps and CDN
    - A counter w/ LitElement!  :)
    - 47 requests though!

[Git Tag 0.1.0](https://github.com/thescientist13/nono-poc/releases/tag/0.1.0)

## ✅ It's Dangerous to go it along, pt.2, Improved Local Development Workflows
"solve for the DX, but DX must always be _platform_ first no matter what.

### Goals
1. ~~Robust dev server (koa?) - node v12~~
    - ~~Options?~~ - will try it myself :)
      - es-dev-server
      - vite
    - ~~web server (`import` support) / replace **http-server**~~
    - ~~watch mode / live reload~~
1. ~~NPM Packages w/ import maps~~
    - ~~skypack or snowpack for development?~~ will try it from scratch w/ acorn
    - ~~use es-modules-shim?~~ - Yes!, with rewrite rules from the dev server to "mirror" _node_modules_
    - ~~use package.json or scan imports and rewrite?~~
      - need to resolve bare imports within packages, like snowpack, one time lookup and generate, e.g. https://github.com/Polymer/lit-element/issues/603
    - ~~get es-modules-shim from _node_modules_~~
    - ~~acorn v8~~
    - ~~delete commented out code~~

[Git Tag 0.2.0](https://github.com/thescientist13/nono-poc/releases/tag/0.2.0)


## ✅Production Build and Optimzations
Let's get this thing deployable to production

### Goals
1. Basic copy / paste build script
    - how to copy over vendor code, including deps of deps?
1. ~~Bundle with Rollup?~~ https://github.com/thescientist13/nono-poc/pull/4
    - ~~heavier than Parcel?  100KB vs 50KB, still need to add terser since Parcel minifies~~
    - ~~get CSS working~~
    - better output (ESM -> ESM)
    - half the size of Parcel
    - more like webpack and a little bit of Gulp, and not as much of a blackbox like Parcel
1. ~~Bundle with Parcel~~ - https://github.com/thescientist13/nono-poc/pull/3
    - super fast, would be great if it could JiT (e.g. bundleless)
    - globing against a bunch of index.html file is :chef-kiss:
    - worked right out of the box within 30 minutes, had the whole thing building
    - does all our node modules resolution for us!
    - can be used with our own dev server? - https://parceljs.org/getting_started.html
    - seeing the dev output is nice
    - test it with HMR?
1. ~~Optimize with minify, concat, etc~~
    - parcel does it for us, what about the evergreen build?
1. hashing / cache busting
    - parcel does it for us
1. ~~Deploy to Netlify~~

### Considerations
- each `import` is a network request so even with HTTP/2, at scale that may not be sustainable - that's why we still bundle!
  - parcel approach (index.html?)
- and also, minify and tree shake
- module vs nomodule and differential loading?
- Babel / PostCSS / Browserslist?

[Git Tag 0.3.0](https://github.com/thescientist13/nono-poc/releases/tag/0.3.0)

## ✅ Serialization
Now we will optimize our site even more by pre-rendering it and trying to build off the existing HTML by using it to hydrate our JavaScript

### Goals
1. ~~Evaluate alternatives~~
    - how does [Scully](https://github.com/scullyio/scully) handle puppeteer - found it https://github.com/ProjectEvergreen/greenwood/issues/341#issuecomment-681197321
    - [lit-html-server](https://github.com/popeindustries/lit-html-server) - seems only for lit-html templates, so probably not going to helpful for custom elements or shadow DOM
    - [playwright](https://github.com/microsoft/playwright) - [same as Scully](https://playwright.dev/#version=v1.3.0&path=docs%2Fdocker%2FREADME.md&q=)
1. Use latest puppeteer
1. ~~Serialize~~
    - serialize from src / use existing server, (output to post directory, then bundle on post directory? )
    - browser as a service?
    - https://github.com/popeindustries/lit-html-server
1. ~~hydration / double console and rendering~~ - none yet
1. ~~Lighthoue perf~~
    - inline CSS / JS? - TBD!
    - ~~bundle~~ 
    - TBD


### Considerations
-4Over rendering
- Dedupe Content in JS
- only bundle code w/ side effects
- code splitting
- Use cases
  - the counter
  - greenwood getting started
  - greenwood banner / shelf
  - my blog
  - API calls / fetch
- Inject `<head>`

[Git Tag 0.4.0](https://github.com/thescientist13/nono-poc/releases/tag/0.4.0)

## Extending the Authoring Experience (Markdown!)
The "framework stuff"

### Goals
1. Markdown support (on the fly?)
1. Page Templates (w/ LitElement?)
1. <meta> / SEO
1. GraphQL
1. Evergreen build?
1. Rethink how to describe the project on the website

### Consideration
- Page Templates
    - using HTML as a starting point and script tags is leading to much better network waterfall
    - but could still use the concept of a page-component that auto hooks into GraphQL?es
- GraphQL
    - GraphQL needs all content built ahead of time though?
    - hot reload graphQL
    - somethnig lighter than Apollo?, or strip it all out somehow?
- dedupe content
- unfified for the graph?


## Profit?
Let's see if some of the big ticket items are now solved, or easier to work around now

### Goals
1. SPA vs Stric vs. Progressive modes? - AST example within rollup (e.g. actually doing progressive enhancement)
1. TODO Review Project Evegreen Board

### Considerations

## Bonus Points / Next Steps / Refactoring / Questions / Issue Tracking in Greenwood
Some things to really empower the developer experience

- CSS livereload breaks
```
 Error: ENOENT: no such file or directory, open '/Users/owenbuckley/Workspace/github/repos/nono-poc/www/styles.css?livereload=1600112541593'
 ```
- better lockstepping between serve and rollup (need a graph / manifest to share?)
- TODOs in code
- Review / track "Considerations" sections from this doc
- `body[unresolved]`
- 1.0 blog post
- handling paths in tempates, e.g. ./, ../, normalize everything to /?
- External sources
- Own org?
- bundle from output serialized code or from user workspace?
- PWA
- babel / browserslist / postcss
- CSS based filename hashing
- bundle / rollup `<script>` tags?
- review existing TODOs in notes / Trello board / backlog for outdated
- evaluate [htm](https://github.com/developit/htm)?
- everything goes through a "plugin" / middleware?  how to orchestrate hooks and lifecycles?
- CJS vs ESM lookup? (Since Acorn 8.0.0, options.ecmaVersion is required. )
- Pre bundle dependencies for development? (a la snowpack)
- generate import map as JSON file and import from a <script> tag / path
- serialize during development?  (dev / prod DX parity)
- live reload of Koa server for development
- proxy dev server for API calls
- cache dev server calls, and HMR
- IE11 / Polyfills
- differential loading
- CSS Modules / theming?
- SPA
- SSR
- HTTP/2 for dev server  (streaming dev server?)
- SFC ?  (I guess that's web components already are?)
- Console / debug logging for project
- custom element registry, replace with `export`?
- https://github.com/vitejs/vite#features
- web packaging?
- dev server overlay (with build errors like what would be in the terminal)
- reuse server for serve task
- upgrade to node version v14 to use ESM in the greenwood code?
- TypeScript (in userland)
- import map shim needed (for local dev)?
- Upgrade Puppeteer (5.x)
- outreach / pro bono (contributary?)
- do anything about CEA?
- really need a debug / verbose mode, use `console.info`, supress log in prod mode?
- no need for .greenwood folder, bundle / serialize in memory?
- canary pipelines / decouple website and project?  (own org?)
- streaming GraphQL, data in / data out as it becomes available / on demand
- streaming build, build / bundle as pages are serialized
- greenwood timestamped cache
- replace JSDOM with something lighter / faster? - does it matter, only used for tests?
- gothub action for puppeteer support?
- ESBuild ?
- additional processors / transforms?  (SCSS, SASS, markdown alternatives like YML?)
- use rehype instead
- use worker threads somehow for CLI processes like serializing?
- inline JS / CSS at build time? - https://developers.google.com/web/tools/puppeteer/articles/ssr
- incremental / differential builds: maybe using GitHub actions + a greenwood api to build a single route / page on demand?
- `body[unresolved]` - https://github.com/thescientist13/nono-poc/pull/5#issuecomment-690810774
- netlify analytics for the website now?
- `npx`
- new URL
- how build tools from userland, eg lint for a11y as pages are built?  post build hook?
- Intelligent asset copy based on static analysis (e.g. favicon.ico)?  Or just default to copying all of _assets/_ ?
- use index.html as a default page template?
- preloading / async / defer modules (optimizations)
- figure out why I can't use pages/blog/index.html
- (node:82640) ExperimentalWarning: The fs.promises API is experimental
- 404 handling
- sourcemaps
- support images, JSON, HTML? (via `import`?)