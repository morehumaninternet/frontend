const path = require('path')

module.exports = {
  siteMetadata: {
    siteUrl: 'https://morehumaninternet.org',
    title: 'More Human Internet',
    description: 'A collaborative community creating a public platform for users and maintainers of the web',
    author: '@morehumaninter1',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `en`,
        configPath: require.resolve(`./i18n/config.json`),
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-intl`,
      options: {
        defaultLocale: `./i18n/react-intl/en.json`,
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-axe',
    {
      resolve: `gatsby-plugin-umami`,
      options: {
        websiteId: 'e8c8631c-8552-4888-8506-b05681b04dfa',
        srcUrl: 'https://vercel-umami.vercel.app/umami.js',
        includeInDevelopment: false,
        autoTrack: true,
        respectDoNotTrack: true,
      },
    },
  ],
}
