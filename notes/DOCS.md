=== Getting Started ===

1. Start with inline HTML on one page
1. Add some CSS / JS, cool, so far so good.

GitRef: 

=== Now add multiple pages... lot of repitition ===

1. Why components (e.g. JS)?
1. What about HTML / CSS? to dedupe CSS
1. we move it to use <link> tag
1. Accessability Lighthouse / <meta>

Another example, say using an `import`? - important, due to using it for JS AND CSS, and others (even though it's not "allowed")


GitRef: https://github.com/thescientist13/nono-poc/commit/1e983efc5a3311c2d123f407f833301701fe464f

=== Upcoming Challenges! ===
* multiple layouts / templates
* development server - better mimic real life, just been using `file://` right now
* external packages / dependencies
* as more code comes in, for < list > reasons, pre-processing is still helpful
* ALSO, one of the ways we do this is with JavaScript, but our goal originally was to write HTML though, right?

Now, onto use cases
- blogs (external content)
- portfolios (images, interactivity)
- marketing websites (fast, performance)

> what about SPAs?

Performance!
Accessibility!
Theming!

So yes, we'll try and solve all these problems.  Know that this system isn't really any different from a system you could make up yourself.  That's all that open source is.  But maybe you'll like what we've thought of, and would like to use it yourself, or even help contribute to!

And yes, raw HTML will always win, BUT, making optimizations is the aim of this project, and good prodocutiviy.  A website shouldn't be hard, it should be fun to work on.  The tools should stay out of the way, that's why this project focuses on standards and web platform fundmantels like ES Modules, to reduce the cost paid for our workflow as much as possible, and remove all the layers between your work and your users!


So at this point, it's less about _needing_ any of this per, but rather, what is easier to maintain?  Yes, we will take some shortcuts along the way though (import CSS, JSON, etc)

> How do we rationalize the tradeoff on non standards?  consistency, mental model, leap of faith?  :)




=== Now have multiple layouts ???? ===

=== Now want to use external packages ===

1. Why templates / framework?

Resources
- CSS theming, https://twitter.com/brad_frost/status/1270423067748155394?
- ASTs, https://github.com/kentcdodds/asts-workshop/tree/fem, https://frontendmasters.com/courses/linting-asts/
- https://github.com/WebReflection/custom-elements#readme
- Ideas / wish list - https://twitter.com/jordwalke/status/1283902977858629632
- Lit bundling - https://lit-element.polymer-project.org/guide/build