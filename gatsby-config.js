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
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-axe',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/human-dots.svg', // The app manifest icon for PWA. This path is relative to the root of the site.
        include_favicon: false,
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
