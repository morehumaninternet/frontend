import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type SEOProps = {
  author?: string
  description?: string
  lang?: string
  meta?: readonly any[]
  pageTitle?: string
  links?: SEOLinks
  scripts?: readonly object[]
}

export const defaultLinks: SEOLinks = [
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  { rel: 'manifest', href: '/site.webmanifest' },
  { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
]

export default function SEO(props: SEOProps): JSX.Element {
  const description = props.description || ''
  const lang = props.lang || 'en'
  const meta = props.meta || []
  const pageTitle = props.pageTitle

  const links = props.links || defaultLinks

  const scripts = props.scripts || []

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const title = pageTitle ? `${pageTitle} by ${site.siteMetadata.title}` : site.siteMetadata.title

  const metaDescription = description || site.siteMetadata.description

  const author = props.author || site.siteMetadata.author

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[
        { name: 'description', content: metaDescription },
        { property: 'og:title', content: title },
        { property: 'og:description', content: metaDescription },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:creator', content: author },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: metaDescription },
        { name: 'msapplication-TileColor', content: '#164176' },
        { name: 'theme-color', content: '#ffffff' },
      ].concat(meta)}
      link={links}
      script={scripts as any}
    />
  )
}
