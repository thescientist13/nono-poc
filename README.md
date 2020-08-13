# nono-poc

## Overview
NoNo (No JavaScript, No Data) is a tongue in cheek reference to encapsulate some of the desires and lessons learne from the development of Greenwood so far.  Greenwood is a static site generator supporting web component based development for any type of application, be it blog, portfolio, or full blown Single Page Application.


## Motivations
Over the course of Greenwood's development, a few high level ideas, concepts, and goals have emerged through our learning of the problem space as well as observing other solutions in the space like **Sapper**, **Next**, **vite** / **vite-press**, and **es-dev-server**.


This combined with recent progress, and challenges / oppourtunities In Greenwood
- [Bundle / Build less development](https://github.com/ProjectEvergreen/greenwood/issues/355)
- [Progressive Enhancement](https://github.com/ProjectEvergreen/greenwood/issues/354)
- [Lighthouse 100](https://github.com/ProjectEvergreen/greenwood/issues/411)
- [Overrendering](https://github.com/ProjectEvergreen/greenwood/issues/348)
- [Dedupe Contant](https://github.com/ProjectEvergreen/greenwood/issues/305)

Have led to a bottom up re-thinking and approach to the project.  Namely, rethink webpack owning the whole pipeline, and instead aim for an ondemand local development workflow, with a lean and custom production optimization pipeline, enabling build strategies like `strict`, `spa`, and `progressive`.

## Vision
Goals of this POC are as follows
- Web Platform first, starting from the ground up using HTML, CSS, JS
- Less reliance on abstractions owning the whole tool chain (e.g. webpacl) and more of a hands on approach gluing some lower level tools together (Koa, Rollup)
- Making sure to look at what the platfofm
- Use this as a grounding oppourtunity for the Greenwood project and its long term ambitions
- Look for slimmer / leaner alternatives to lit-redux-router and Apollo

## Goals
- Go ESM first, with tools like Rollup
- Look at the platform first, like using `import maps`
- Own as much of the means of production, including creating custom Babel plugins or direct AST transforms
- Faster development times
- More pluggable (server as own package, data as own package, spa, etc)
- Make things more component based and closer to HTML where possible
- Get clarity on exactly what a 1.0.0 would look like after all is said and done