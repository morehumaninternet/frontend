import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'


const H: any = Helmet

type SEOProps = {
  description?: string
  lang?: string
  meta?: any[]
  pageTitle?: string
  links?: object[]
  scripts?: object[]
}

export default function SEO(props: SEOProps) {
  const description = props.description || ''
  const lang = props.lang || 'en'
  const meta = props.meta || []
  const pageTitle = props.pageTitle

  const links = props.links || [
    { rel: "apple-touch-icon", sizes: "180x180", href: '/apple-touch-icon.png' },
    { rel: "icon", type: "image/png", sizes: "16x16", href: '/favicon-16x16.png' },
    { rel: "icon", type: "image/png", sizes: "32x32", href: '/favicon-32x32.png' },
    { rel: "manifest", href: '/site.webmanifest' },
    { rel: "mask-icon", color: "#5bbad5", href: '/safari-pinned-tab.svg' },
  ]

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

  const title = pageTitle ? `${pageTitle} | ${site.siteMetadata.title}` : site.siteMetadata.title

  const metaDescription = description || site.siteMetadata.description

  return (
    <H
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
        { name: 'twitter:creator', content: site.siteMetadata.author },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: metaDescription },
        { name: 'msapplication-TileColor', content: '#164176' },
        { name: 'theme-color', content: '#ffffff' },
      ].concat(meta)}

      link={links}

      script={scripts}
    />
  )
}
