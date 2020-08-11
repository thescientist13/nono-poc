## ✅ In the beginning...

### Goals
1. HTML / CSS
1. JavaScript
1. Couple components
1. Let's think about the future...

## It's Dangerous to go alone, pt. 1... local development

### Goals
1. simple dev server w/ `npx http-server src`
1. External Packages w/ import maps and CDN
  -  A counter w/ LitElement!  :)

## It's Dangerous to go it along, pt.2, Developer Workflows and going to Production
"solve for the DX, but DX must always be _platform_ first no matter what.

### Considerations
- Over rendering
- Dedupe Content in JS
- only bundle code w/ side effects
- code splitting
- Use cases
  - greenwood banner / shelf
  - my blog
  - API calls
- Inject `<head>`

### Goals
1. Dev Server (koa)
1. Package Manager
 - skypack for development?
 - shim?
1. Bundling (rollup)
  - each `import` is a network request, even with HTTP/2, at scale that may not be sustainable
    - also, minify and tree shake
  - module vs nomodule and differential loading?
  - Babel / PostCSS / Browserslits
  - parcel approach (index.html?)
1. Serialize - browser as a service?
1. IE11 / Polyfills
1. <meta>


## Extending the Authoring Experience
The "framework stuff"

### Goals
1. Markdown
1. GraphQL
1. Templates w/ LitElement?



## Bonus Points

### Goals
1. SPA
1. SSR
1. SFC
1. custom element registry, replace with `export`?






The Problems
1. Dependencies (use import map)
1. Dedupe content in JS
1. Only send rendering code?
1. Large bundles
1. Over rendering / double load problem?
1. Limited index.html, hard dependency in webpack infra


Oppourtunities
- SPA vs SSG (Progressive enhancement)
- HMR