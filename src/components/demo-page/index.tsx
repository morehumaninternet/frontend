import React from 'react'
import SEO from '../shared/seo'
import DemoPageContents from './contents'
import { createStore } from './store'
import subscribe from './background-script'
import * as mockApi from '../../clients/mockApi'
import { defaultSite } from '../../clients/util'
import { scriptSrc, stylesHref } from '../../effects/useTour'

type WidgetProps = {
  tour: any
  siteOrigin: string
  navigate: (href: string) => void
  api: {
    postIssue(issue: {
      id?: number
      user?: User
      site: string
      title: string
      initialCommentHtml: string
      aggregates?: IssueAggregates
      status?: IssueStatus
    }): Promise<Issue>
    searchIssues(opts: { site: string; title?: string }): Promise<ReadonlyArray<Issue>>
  }
}

export default function DemoPage({ navigate }: PageProps): JSX.Element {
  const store = createStore()
  subscribe(store, mockApi, defaultSite, navigate)

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
      <DemoPageContents store={store} navigate={navigate} />
    </div>
  )
}
