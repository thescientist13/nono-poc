const FAVICON_HREF = '/favicon.ico';
const META_DESCRIPTION = 'Dont outsource your core competency.';
const TITLE = 'NoNo POC';

module.exports = {
  title: TITLE,
  meta: [
    { name: 'description', content: META_DESCRIPTION },
    { property: 'og:title', content: TITLE },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://www.greenwoodjs.io' },
    { property: 'og:image', content: 'https://s3.amazonaws.com/hosted.greenwoodjs.io/greenwood-logo.png' },
    { property: 'og:description', content: META_DESCRIPTION },
    { rel: 'shortcut icon', href: FAVICON_HREF },
    { rel: 'icon', href: FAVICON_HREF }
  ]
};