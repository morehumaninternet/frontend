import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Hero from '../components/hero'
import { Avatar } from '@material-ui/core'
import * as mockApi from '../clients/mockApi'



function IssueBreadcrumbs({ site, issueId }: { site: string, issueId: number }) {
  return (
    <div className="issue-breadcrumbs">
      <img src="/goalco.ico" /> {site} / Issues / {issueId}
    </div>
  )
}

type IssueState =
  | { loading: true }
  | { loading: false, title: string }


export default function IssuePage(props: any): JSX.Element {

  const [issueState, setIssueState] = React.useState<IssueState>({ loading: true })

  const params = new URLSearchParams(props.location.search)

  const site = params.get('site')

  if (!site) throw new Error('site required in query params')
  const issueId = parseInt(params.get('id')!)

  if (!issueId) throw new Error('issueId integer required in query params')

  React.useEffect(() => {
    mockApi.getIssueBySiteAndId(site, issueId).then(issue => {
      setIssueState({
        loading: false,
        title: issue!.title
      })
    })
  })

  return (
    <Layout
      logoFade={1}
      headerLinks={
        <Avatar
          src="github.com/will-weiss.png"
        />
      }
    >
      <SEO pageTitle="Issue" />
      <Hero additionalClassNames="issue">
        <IssueBreadcrumbs site={site} issueId={issueId} />
        {issueState.loading ? (
          <p>Loading...</p>
        ) : (
          <h1>{issueState.title}</h1>
        )}
      </Hero>
    </Layout>
  )
}
