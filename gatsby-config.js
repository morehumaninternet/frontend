module.exports = {
  siteMetadata: {
    siteUrl: 'https://morehumaninternet.org',
    title: 'More Human Internet',
    description: 'An international community of expert contributors working directly with valuable causes',
    author: '@morehumaninter1',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sass',
    'gatsby-plugin-postcss',
    'gatsby-plugin-material-ui',
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
    'gatsby-plugin-react-helmet',
  ],
}
