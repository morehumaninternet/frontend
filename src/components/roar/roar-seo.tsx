import React from 'react'
import SEO, { Links } from '../shared/seo'

export const roarLinks: Links = [
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/roar-apple-touch-icon.png' },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/roar-16x16.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/roar-32x32.png',
  },
  { rel: 'manifest', href: '/site.webmanifest' },
  { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
]

const RoarSEO = ({ title }: { title?: string }) => (
  <SEO
    pageTitle={title ? `${title} | Roar!` : 'Roar!'}
    description="Roar! is a free, open source, non-profit web extension that automatically captures a snapshot of any online issue and addresses a tweet to the site's maintainer."
    links={roarLinks}
    author="@by_roar"
  />
)

export default RoarSEO
