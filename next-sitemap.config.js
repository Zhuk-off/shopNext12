/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/checkout', '/server-sitemap-index.xml'], // <==== Исключить тут
  robotsTxtOptions: {
    additionalSitemaps: [
      process.env.NEXT_PUBLIC_SITE_URL + '/server-sitemap-index.xml', // <==== Добавить сюда
    ],
    policies: [
      // {
      //   userAgent: '*',
      //   allow: '/',
      // },
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  },
};
