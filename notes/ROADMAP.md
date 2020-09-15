# Roadmap
A plan to get the NoNo POC adapted to Greenwood and what the future of the project looks like in this new context.

## Prequisties
Let's review everything in front of us and see what aligns with this new approach:
1. Capture all TODOs from this repo's source code
1. ~~Capture all TODOs from _notes/TODO.md_~~
1. Review Trello Board and link relevant items here
1. ~~Review personal notes and catalog here~~
1. Review GitHub issues and link relevant items here
1. Flag any good first issues

## Feature Parity aka Architectural Digest (complete by 10/5/2020)
Effort to make sure all comparable features are preserved as part of the refactor.  This includes documentation and release candidates to ensure existing projects can migrate easily including
* greenwoodjs.io
* www.thegreenhouse.io
* projectevergreen.github.io

Main thing here should be ensure that performance improves significantly and a number of existing issues in the backlog can be resolved.

1. Live relaod
    - CSS breaks - `Error: ENOENT: no such file or directory, open '/Users/owenbuckley/Workspace/github/repos/nono-poc/www/styles.css?livereload=1600112541593'`
    - markdown
    - others
1. support images, JSON, HTML? (via `import`?)
1. 404 handling
1. sourcemaps?
1. SPA support
    - how to handle strict / ssg mode
    - Decouple spa specific code from the bundle
    - Smaller / lighter router? like a <router-outlet></router-outlet>?
1. Copying all of _assets/_ ?
1. CSS filename hashing
1. Upgrade Puppeteer (5.x)
1. Babel / PostCSS / Browserslist support
1. GraphQL as a package, or [something simpler](https://jaredpalmer.com/gatsby-vs-nextjs)
1. Questions, refactoring, tech debt, misc, nice to have
    - figure out why I can't use pages/blog/index.html
    - no need for _.greenwood/_ folder on serialize or for rollup
    - better lockstepping between serve and rollup for knowing all pages, e.g. use _graph.json_, but still try and keep it async?
    - confirm [`body[unresolved]` is still an issue](https://github.com/thescientist13/nono-poc/pull/5#issuecomment-690810774)
    - handling paths in templates, e.g. ./, ../, normalize everything to /?
    - Own org / decouple website repo from rest of project?
    - bundle from userworkspace or serialized output?
    - is _.greenwood/_ folder needed for development, do everything in memory, including graph?
    - confirm `import-map` support shim needed (for local dev)
    - group rollup `<script>` tags?
    - replace JSDOM with something lighter / faster? - does it matter, only used for tests?
1. GitHub backlog
    - Lighthouse 100
    - Overrending is a crime
    - Confirm google analytics
    - Dedupe content in JS
    - Bundle / buildless development
    - Proegressive Enhancement - more like refinement?

## Release Candidate and 1.0 (Complete by 11/30/2020)
Anything that should be completed prior to releasing as 1.0.  This is primarily focused around tech debt and tradeoff's made in advancing the initial, as well as long standing issues in the Greenwood backlog.  Hopefully this can provide a nice clean roadmap for post 1.0 and the the road to 2.0.

1. Node version using `import`, also `(node:82640) ExperimentalWarning: The fs.promises API is experimental`  
1. CJS vs ESM lookup?  Do some tests
1. Can be run via `npx`
1. Good First Issues / Hacktoberfest
    - Timestamp for docs
    - Html minifier or prettifier post optimize
    - _Since Acorn 8.0.0, `options.ecmaVersion` is required._ warning message
1. GitHub backlog
    - API design
    - External Sources
    - home page / project markweting
1. Better HTML rendering for second case - https://github.com/thegreenhouseio/www.thegreenhouse.io/issues/133
    - No special indentation
    - No restrictions on whitespace
    - Settings?
1. 1.0 Release Blog Post w/ GitHub Pages for project evergreen website
    - do anything about CEA?
    - netlify analytics for the website now?
1. Developer docs 
1. Asess Post 1.0 tasks to validate no expected breaking changes would be needed (e.g. there is an API for that)
1. Community outreach

## Post 1.0 
These are tasks that can be worked on in the normal course of maintaing Greenwood and that shouldn't require introducing any breaking changes
1. GitHub Backlog
    - Diffential Loading (IE11)
    - Pre-processor plugins like SASS / SCSS. TypeScript support OOTB?  esbuild?  YML?
    - Image processing / lazy loading / general best practices (`new URL`?)
    - CSS theming, constructable style sheets, inherited properties pierces the Shadow DOM
    - PWA
    - Console / debug logging
1. Pre bundle dependencies for development (a la snowpack)
1. generate import map as JSON file and import from a <script> tag / path, and only once
1. Rollup code splitting / grouping by template
1. preloading / async / defer modules (optimizations)
1. [Inline JS / CSS](https://developers.google.com/web/tools/puppeteer/articles/ssr)
1. create a github action for puppeteer support
1. proxy dev server for API calls
1. HMR
1. HTTP/2 for dev server
1. Restart graphql on file change? (Query, shelf)
1. Restart Koa server on file change (for local development)
1. Single file components
1. Intelligent asset copy based on static analysis (e.g. favicon.ico)?  Or just default to copying all of _assets/_ ?
1. use _index.html_ as a default page template?


## The Road to 2.0
Not necessarily breaking changes but more future facing things that might take a while.
- [Web vitals](https://github.com/stefanjudis/web-vitals-element) / [lighthouse reports](https://pptr.dev/#?product=Puppeteer&version=v3.3.0&show=api-class-coverage) on serialize?

## Random Ideas (back to Trello?)
- SSR component (a la Nuxt / Next)
- Caching in between builds / Incremental builds - maybe using GitHub actions + a greenwood api to build a single route / page on demand?
- Better way to permeate between server and client, page constants injected into the page. e.g. getStaticProps?  
- CSS Modules?
- evaluate [htm](https://github.com/developit/htm) or [xm](https://github.com/giuseppeg/xm)?
- web packaging?
- dev server overlay (with build errors like what would be in the terminal)
- canary pipelines / decouple website and project?  (own org?)
- streaming GraphQL, data in / data out as it becomes available / on demand
- streaming build, build / bundle as pages are serialized
- use worker threads somehow for CLI processes like serializing?