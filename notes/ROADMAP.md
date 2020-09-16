# Roadmap
A plan to get the NoNo POC adapted to Greenwood and what the future of the project looks like in this new context.

## Prequisties
Let's review everything in front of us and see what aligns with this new approach:
1. Capture all TODOs from this repo's source code
1. ~~Capture all TODOs from _notes/TODO.md_~~
1. ~~Review / groom Trello Board]~~
1. ~~Review personal notes and catalog here~~
1. ~~Review GitHub issues and link relevant items here~~
1. ~~Flag any good first issues~~

## Feature Parity aka Architectural Digest (complete by 10/5/2020)
Effort to make sure all comparable features are preserved as part of the refactor.  This includes documentation and release candidates to ensure existing projects can migrate easily including
* greenwoodjs.io
* Greenwood Getting Started
* www.thegreenhouse.io
* projectevergreen.github.io

Main thing here should be ensure that performance improves significantly and a number of existing issues in the backlog can be resolved.

1. Live relaod
    - CSS breaks - `Error: ENOENT: no such file or directory, open '/Users/owenbuckley/Workspace/github/repos/nono-poc/www/styles.css?livereload=1600112541593'`
    - markdown
    - others
1. support images, JSON, HTML? (via `import`?)
1. App templates
1. Markdown / Prism support
1. SPA support
    - how to handle strict / ssg mode
    - Decouple spa specific code from the bundle
    - [Smaller / lighter router](https://router.matsu.fi/getting-started)? like a <router-outlet></router-outlet>?
    - [rollup dynamic input vars](https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars)
1. [GraphQL as a package](https://github.com/ProjectEvergreen/greenwood/issues/278), or [something simpler](https://jaredpalmer.com/gatsby-vs-nextjs)
    - [data hydration still an issue](https://github.com/ProjectEvergreen/greenwood/issues/349)
    - [reduce duplicate graphql calls](https://github.com/ProjectEvergreen/greenwood/issues/272)?
1. [sourcemaps?](https://github.com/ProjectEvergreen/greenwood/issues/319)?
1. Copying all of _assets/_ ?
1. CSS filename hashing
1. Upgrade Puppeteer (5.x)
1. Babel / PostCSS / Browserslist support
1. Questions, refactoring, tech debt, misc, nice to have
    - [figure out why I can't use pages/blog/index.html](https://github.com/ProjectEvergreen/greenwood/issues/120)
    - no need for _.greenwood/_ folder on serialize or for rollup
    - [better lockstepping between serve and rollup for knowing all pages, e.g. use _graph.json_, but still try and keep it async?](https://github.com/ProjectEvergreen/greenwood/issues/327)
        - https://www.reddit.com/r/node/comments/fidzj9/fdir_the_fastest_directory_crawler_for_nodejs_10k
    - confirm [`body[unresolved]` is still an issue](https://github.com/thescientist13/nono-poc/pull/5#issuecomment-690810774)
    - Own org / decouple website repo from rest of project?
    - bundle from userworkspace or serialized output?
    - is _.greenwood/_ folder needed for development, [do everything in memory](https://github.com/ProjectEvergreen/greenwood/issues/13), including graph?
    - confirm `import-map` support shim needed (for local dev)
    - group rollup `<script>` tags?
    - [handling paths in templates, e.g. ./, ../](https://github.com/ProjectEvergreen/greenwood/issues/273), normalize everything to /?, associated with [route misses with using /](https://github.com/ProjectEvergreen/greenwood/issues/331)
    - replace JSDOM with something lighter / faster? - does it matter, only used for tests?
1. GitHub backlog
    - [Lighthouse 100](https://github.com/ProjectEvergreen/greenwood/issues/411)
    - [404 page optimizations](https://github.com/ProjectEvergreen/greenwood/issues/412)
    - [Overrending is a crime](https://github.com/ProjectEvergreen/greenwood/issues/348)
    - Confirm google analytics
    - [Dedupe content in JS](https://github.com/ProjectEvergreen/greenwood/issues/305) shouldn't be an issue now
    - [webpack config enhancements](https://github.com/ProjectEvergreen/greenwood/issues/321) not needed now
      - this [neither](https://github.com/ProjectEvergreen/greenwood/issues/260)?
      - [or this](https://github.com/ProjectEvergreen/greenwood/issues/234)
      - [or webpack 5](https://github.com/ProjectEvergreen/greenwood/issues/227)
      - [double reload](https://github.com/ProjectEvergreen/greenwood/issues/121)
      - [scaffolding](https://github.com/ProjectEvergreen/greenwood/issues/61)
    - [Bundle / buildless development](https://github.com/ProjectEvergreen/greenwood/issues/355)
    - [bug with inline JS](https://github.com/ProjectEvergreen/greenwood/issues/413)
    - [`<meta>` component / package](https://github.com/ProjectEvergreen/greenwood/issues/304)still needed?
    - [RFC Declarative App templates](https://github.com/ProjectEvergreen/greenwood/issues/299) still needed?
    - [quotes on meta](https://github.com/ProjectEvergreen/greenwood/issues/218)
    - [cant resolve css file with custom workspace](https://github.com/ProjectEvergreen/greenwood/issues/85)
    - [unit testing development](https://github.com/ProjectEvergreen/greenwood/issues/47)
    - [prod and develop modes](- [Console / debug logging](https://github.com/ProjectEvergreen/greenwood/issues/199)
    )
    - [Query Sorting / Filtering](https://github.com/ProjectEvergreen/greenwood/issues/288) - do this server side and inject current page for grapqhl side / slimmer fetching?  do this through the client instead (filter out the "dead pages" at the response level)?
1. Revisit all documentation

## Release Candidate and 1.0 (Complete by 11/30/2020)
Anything that should be completed prior to releasing as 1.0.  This is primarily focused around tech debt and tradeoff's made in advancing the initial, as well as long standing issues in the Greenwood backlog.  Hopefully this can provide a nice clean roadmap for post 1.0 and the the road to 2.0.

1. Node version using `import`, also `(node:82640) ExperimentalWarning: The fs.promises API is experimental`  
1. CJS vs ESM lookup?  Do some tests
1. Can be run via `npx` (0CJS - zero config JS)
1. Good First Issues / Hacktoberfest
    - Timestamp for docs
    - [Html prettifier / formatter post optimize](https://github.com/ProjectEvergreen/greenwood/issues/318)
    - _Since Acorn 8.0.0, `options.ecmaVersion` is required._ warning message
1. GitHub backlog
    - [Progressive Enhancement aka RedactJS](https://github.com/ProjectEvergreen/greenwood/issues/354) - more like progressive refinement?
    - [404 Plugin](https://github.com/ProjectEvergreen/greenwood/issues/240)
    - [API design](https://github.com/ProjectEvergreen/greenwood/issues/209)
    - [External Sources](https://github.com/ProjectEvergreen/greenwood/issues/21)
    - [website refresh](https://github.com/ProjectEvergreen/greenwood/issues/325)
    - [home page / project marketing](https://github.com/ProjectEvergreen/greenwood/issues/268)
1. Re-review Trello board
1. Better HTML rendering for second case - https://github.com/thegreenhouseio/www.thegreenhouse.io/issues/133
    - No special indentation
    - No restrictions on whitespace
    - Settings?
1. 1.0 Release Blog Post on project evergreen website
    - [GitHub pages](https://github.com/ProjectEvergreen/greenwood/issues/320)
    - do anything about CEA?
    - [netlify analytics](https://github.com/ProjectEvergreen/greenwood/issues/405)
1. Developer docs 
1. Asess Post 1.0 tasks to validate no expected breaking changes would be needed (e.g. there is an API for that)
1. Community outreach

## Post 1.0 
These are tasks that can be worked on in the normal course of maintaing Greenwood and that shouldn't require introducing any breaking changes
1. GitHub Backlog
    - [open browser automatically](https://github.com/ProjectEvergreen/greenwood/issues/62)
    - [Performance automation](https://github.com/ProjectEvergreen/greenwood/issues/205)
    - [Differential Loading (IE11)](https://github.com/ProjectEvergreen/greenwood/issues/224)
      - https://github.com/ProjectEvergreen/greenwood/issues/198
      - https://github.com/ProjectEvergreen/greenwood/issues/196
    - [404 Plugin](https://github.com/ProjectEvergreen/greenwood/issues/240)
    - [Pre-processor plugins like SASS / SCSS](https://github.com/ProjectEvergreen/greenwood/issues/185). [TypeScript](https://github.com/ProjectEvergreen/greenwood/issues/46) support OOTB?  esbuild?  YML?
    - [Image processing](https://github.com/ProjectEvergreen/greenwood/issues/235) / lazy loading / general best practices (`new URL`?)
    - [CSS theming](https://github.com/ProjectEvergreen/greenwood/issues/111), constructable style sheets, inherited properties pierces the Shadow DOM
    - [PWA](https://github.com/ProjectEvergreen/greenwood/issues/194)
    - [console / debug logging](https://github.com/ProjectEvergreen/greenwood/issues/15)
    - [HMR](https://github.com/ProjectEvergreen/greenwood/issues/48)
    - [video series](https://github.com/ProjectEvergreen/greenwood/issues/380)
    - [html minification / validation](https://github.com/ProjectEvergreen/greenwood/issues/357)
    - [Update meta on SPA route change](https://github.com/ProjectEvergreen/greenwood/issues/306)
    - [Have develop mode pick random port](https://github.com/ProjectEvergreen/greenwood/issues/71)
    - [Build Lifecycles](https://github.com/ProjectEvergreen/greenwood/issues/184)
    - [one off page templates as JS](https://github.com/ProjectEvergreen/greenwood/issues/170)
    - [linting](https://github.com/ProjectEvergreen/greenwood/issues/106)
    - [Reduce duplicate data fetches](https://github.com/ProjectEvergreen/greenwood/issues/347)
1. Starter / Boilerplate / Generator (via `npx`)
1. Pre bundle dependencies for development (a la snowpack)
1. generate import map as JSON file and import from a <script> tag / path, and only once
1. Rollup code splitting / grouping by template
1. preloading / async / defer modules (optimizations)
1. [Inline JS / CSS](https://developers.google.com/web/tools/puppeteer/articles/ssr)
1. [create a github action for puppeteer support](https://github.com/ProjectEvergreen/greenwood/pull/335#issuecomment-618044372)
1. proxy dev server for API calls
1. HTTP/2 for dev server
1. Restart graphql on file change? (Query, shelf)
1. Restart Koa server on file change (for local development)
1. Single file components
1. Intelligent asset copy based on static analysis (e.g. favicon.ico)?  Or just default to copying all of _assets/_ ?
1. use _index.html_ as a default page template?
1. Go [all in on unified](https://github.com/ProjectEvergreen/greenwood/issues/289)

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