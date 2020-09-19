import React from 'react'
import SEO from '../shared/seo'
import DemoPageContents from './contents'
import { scriptSrc, stylesHref } from '../../effects/useTour'

export default function DemoPage(props: any): JSX.Element {
  return (
    <div className="demo-page">
      <SEO
        pageTitle="Demo"
        links={[
          {
            rel: 'shortcut icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/goalco.ico',
          },
          { rel: 'stylesheet', type: 'text/css', href: '/trix.css' },
          {
            rel: 'stylesheet',
            type: 'text/css',
            href: stylesHref,
          },
        ]}
        scripts={[
          { type: 'text/javascript', src: '/trix.js' },
          { type: 'text/javascript', src: scriptSrc },
        ]}
      />
      <DemoPageContents {...props} />
    </div>
  )
}
