import React from 'react'
import Layout from '../components/shared/layout'
import SEO, { defaultLinks } from '../components/shared/seo'
import Hero from '../components/shared/hero'
import { Avatar } from '@material-ui/core'
import * as api from '../clients/mockApi'
import useIssue from '../effects/useIssue'
import setLogoFade from '../utils/setLogoFade'
import useIssueParams, { IssueParams } from '../effects/useIssueParams'
import LoadedIssue from '../components/issue-page'



function Loading(): JSX.Element {
  return (
    <p>Loading...</p>
  )
}

function IssueContent({ issueParams }: { issueParams: IssueParams }): JSX.Element {
  switch (issueParams.state) {
    case 'checking': return <Loading />
    case 'not ok': throw new Error('Handle this case better!')
    case 'ok': {
      const { issueState, postComment } = useIssue({ api, params: issueParams.params })
      return (
        issueState.loading
          ? <p>Loading...</p>
          : <LoadedIssue
              issue={issueState.issue! /* TODO: handle issues not present */}
              postComment={postComment}
            />
      )
    }
  }
}

export default function IssuePage(props: { location: { search: string } }): JSX.Element {

  React.useEffect(() => setLogoFade(1), [])

  const issueParams = useIssueParams(props)

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
      <SEO
        pageTitle="Issue"
        links={defaultLinks.concat([
          { rel: "stylesheet", type: "text/css", href: "/trix.css" },
        ])}
        scripts={[
          { type: "text/javascript", src: "/trix.js" },
        ]}
      />
      <Hero additionalClassNames="issue">
        <IssueContent issueParams={issueParams} />
      </Hero>
    </Layout>
  )
}
