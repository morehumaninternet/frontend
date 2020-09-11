import React from 'react'
import SEO from '../components/shared/seo'
import DemoPageContents from '../components/demo-page/contents'

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
            href: 'https://shepherdjs.dev/dist/css/shepherd.css',
          },
        ]}
        scripts={[
          { type: 'text/javascript', src: '/trix.js' },
          { type: 'text/javascript', src: 'https://shepherdjs.dev/dist/js/shepherd.min.js' },
        ]}
      />
      <DemoPageContents {...props} />
    </div>
  )
}
