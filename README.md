# nono-poc

## Overview
NoNo (No JavaScript, No Data) is a tongue in cheek reference to encapsulate some of the desires and lessons learne from the development of Greenwood so far.  [Greenwood](https://www.greenwoodjs.io/) is a static site generator supporting web component based development for any type of application, be it blog, portfolio, or full blown Single Page Application.


## Motivations
Over the course of Greenwood's development, a few high level ideas, concepts, and goals have emerged through our learning of the problem space as well as observing other solutions in the space like [**Sapper**](https://sapper.svelte.dev/) and [**vite**](https://github.com/vitejs/vite) / [**vitepress**](https://github.com/vuejs/vitepress) and [**Snowpack**](https://www.snowpack.dev/).


This combined with recent progress, and challenges / oppourtunities in Greenwood...
- [Bundle / Build less development](https://github.com/ProjectEvergreen/greenwood/issues/355)
- [Progressive Enhancement](https://github.com/ProjectEvergreen/greenwood/issues/354)
- [Lighthouse 100](https://github.com/ProjectEvergreen/greenwood/issues/411)
- [Overrendering](https://github.com/ProjectEvergreen/greenwood/issues/348)
- [Dedupe Contant](https://github.com/ProjectEvergreen/greenwood/issues/305)

Have led to a bottom up re-thinking of how to approach the project.  Namely, questioning if tools like webpack should own the whole pipeline, and instead aim for an ondemand local development workflow, with a lean and custom production optimization pipeline, enabling build strategies like `strict`, `spa`, and `progressive`, but from "scratch".

## Vision
Goals of this POC are as follows:
- Appeal to developers of all skill levels with a project that scales as skills / needs scale.
- Web Platform first, starting from the ground up using HTML, CSS, JS.
- Less reliance on abstractions owning the whole tool chain (e.g. webpack) and more of a hands on approach gluing some lower level tools together (Koa, Rollup).
- Use this as a grounding oppourtunity for the Greenwood project and its long term ambitions overall.
- Look for slimmer / leaner alternatives to lit-redux-router and Apollo and dependencies in general.

## Goals
- Go ESM first, with tools like Rollup.
- Look at the platform first, like using `import maps`.
- Own as much of the means of production, including creating custom Babel plugins or direct AST transforms
- Faster development times
- More pluggable (server as own package, data as own package, spa, etc)
- Make things more component based and closer to HTML where possible
- Get clarity on exactly what a 1.0.0 would look like after all is said and done