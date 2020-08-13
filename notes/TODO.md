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


## It's Dangerous to go it along, pt.2, Improved Local Development Workflows and Production Optimzations
"solve for the DX, but DX must always be _platform_ first no matter what.

### Goals
1. Robust dev server (koa?) - node v12
  - ~~Options?~~ - will try it myself :)
    - es-dev-server
    - vite
  - ~~web server (`import` support) / replace **http-server**~~
  - watch mode / live reload
1. NPM Packages w/ import maps
  - skypack or snowpack for development?
  - shim?
1. Production optimizations (seperate from serializtion) / Bundling (rollup)
  - each `import` is a network request, even with HTTP/2, at scale that may not be sustainable
    - also, minify and tree shake
  - module vs nomodule and differential loading?
  - Babel / PostCSS / Browserslits
  - parcel approach (index.html?)


## The Grand Prize (Markdown!)
Now we will make our optimized site

### Goals
1. Serialize - browser as a service?
1. <meta> / SEO
1. IE11 / Polyfills

### Considerations
- Over rendering
- Dedupe Content in JS
- only bundle code w/ side effects
- code splitting
- Use cases
  - the counter
  - greenwood banner / shelf
  - my blog
  - API calls
- Inject `<head>`


## Extending the Authoring Experience
The "framework stuff"

### Goals
1. Configuration / Context
1. Markdown support (on the fly?)
1. Page Templates (w/ LitElement?)
1. GraphQL
1. Evergreen build?
1. Rethink how to describe the project on the website

## Bonus Points / Next Steps

### Goals
1. serialize during development?  (dev / prod DX parity)
1. CSS Modules / theming?
1. SPA
1. SSR
1. SFC
1. custom element registry, replace with `export`?
1. https://github.com/vitejs/vite#features
1. ES Modules for dev server?