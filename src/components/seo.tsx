import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'


const H: any = Helmet

type SEOProps = {
  description?: string
  lang?: string
  meta?: any[]
  title: string
}

export default function SEO(props: SEOProps) {
  const description = props.description || ''
  const lang = props.lang || 'en'
  const meta = props.meta || []
  const title = props.title

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

  const metaDescription = description || site.siteMetadata.description

  return (
    <H
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}

      link={[
        { rel: "icon", type: "image/png", sizes: "16x16", href: 'favicon16x16.png' },
        { rel: "icon", type: "image/png", sizes: "32x32", href: 'favicon32x32.png' },
        { rel: "shortcut icon", type: "image/png", href: 'favicon64x64.png' },
      ]}
    />
  )
}
