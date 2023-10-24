const snippets = require('./resources/data/snippets');

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://devools.com',
  generateRobotsTxt: true, // (optional)
  additionalPaths: async (config) => {
    return snippets.map((snippet) => ({
      loc: `/snippets/${snippet.slug}`,
      changefreq: 'yearly',
      lastmod: new Date().toISOString(),
      priority: 0.7,
    }));
  },
};
