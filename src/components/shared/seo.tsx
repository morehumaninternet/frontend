import { last } from 'lodash'
import React from 'react'
import { Helmet } from 'react-helmet'

export type Links = React.ComponentProps<typeof Helmet>['link']

type SEOProps = {
  author?: string
  description?: string
  lang?: string
  pageTitle?: string
  links?: Links
  ogImageSrc: string
  meta?: ReadonlyArray<{
    name: string
    content: string
  }>
}

export const defaultLinks: Links = [
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

const ogImageMetaTags = (ogImageSrc?: string): any => {
  if (!ogImageSrc) return []
  const path = last(ogImageSrc.split('/'))!
  const fileType = path.match(/\.(\w+)/)![1]

  return [
    { property: 'og:image', content: ogImageSrc },
    { property: 'og:image:type', content: `image/${fileType}` },
  ]
}

export default function SEO(props: SEOProps): JSX.Element {

  const description = props.description || ''
  const lang = props.lang || 'en'
  const pageTitle = props.pageTitle

  const links: Links = props.links || defaultLinks

  const site = {
    siteUrl: 'https://morehumaninternet.org',
    title: 'More Human Internet',
    description: 'An international community of expert contributors working directly with valuable causes',
    author: '@morehumaninter1',
  }

  const title = pageTitle ? `${pageTitle} by ${site.title}` : site.title

  const metaDescription = description || site.description

  const author = props.author || site.author

  return (
    <Helmet
      htmlAttributes={{ lang }}
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
      ].concat(ogImageMetaTags(props.ogImageSrc)).concat(props.meta || [])
      }
      link={links}
    />
  )
}
