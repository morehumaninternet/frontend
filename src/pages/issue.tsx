import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Hero from '../components/hero'
import { Avatar } from '@material-ui/core'
import * as mockApi from '../clients/mockApi'
import setLogoFade from '../utils/setLogoFade'
import useIssue, { IssueState } from '../effects/useIssue'



function IssueBreadcrumbs({ site, issueId }: { site: string, issueId: number }) {
  return (
    <div className="issue-breadcrumbs">
      <img src="/goalco.ico" /> {site} / Issues / {issueId}
    </div>
  )
}


// function IssueBody(): JSX.Element {


// }


export default function IssuePage(props: { location: { search: string } }): JSX.Element {

  React.useEffect(() => setLogoFade(1), [])

  const { issueState } = useIssue(props, mockApi)

  return (
    <Layout
      mainClassName="issue"
      logoAgainstHero={false}
      headerLinks={
        <Avatar
          src="github.com/will-weiss.png"
        />
      }
    >
      <SEO pageTitle="Issue" />
      <Hero additionalClassNames="issue">
        {issueState.loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <IssueBreadcrumbs site={issueState.issue.site} issueId={issueState.issue.id} />
            <h1>{issueState.issue.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: issueState.issue.initialCommentBody }}>

            </div>
          </>
        )}
      </Hero>
    </Layout>
  )
}
