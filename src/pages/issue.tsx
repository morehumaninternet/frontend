import React from 'react'
import Layout from '../components/shared/layout'
import SEO, { defaultLinks } from '../components/shared/seo'
import Hero from '../components/shared/hero'
import { Avatar } from '@material-ui/core'
import * as api from '../clients/mockApi'
import useIssue from '../effects/useIssue'
import setLogoFade from '../utils/setLogoFade'
import LoadedIssue from '../components/issue-page'
import useIssueParams, { IssueParams } from '../effects/useIssueParams'
import useCurrentUser, { CurrentUser } from '../effects/useCurrentUser'



function Loading(): JSX.Element {
  return (
    <p>Loading...</p>
  )
}

function IssueContent({ issueParams, currentUser }: { issueParams: IssueParams, currentUser: CurrentUser }): JSX.Element {
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
              postComment={async comment => {
                if (!currentUser.loaded) {
                  throw new Error('Cannot post comment when currentUser not loaded')
                }
                return postComment(currentUser.user, comment)
              }}
            />
      )
    }
  }
}

export default function IssuePage(props: { location: { search: string } }): JSX.Element {

  // TODO: use CSS to have a different variable on different pages
  React.useEffect(() => setLogoFade(1), [])

  const issueParams = useIssueParams(props)
  const currentUser = useCurrentUser()
  const avatarUrl = currentUser.loaded ? currentUser.user.avatarUrl : undefined

  return (
    <Layout
      mainClassName="issue"
      logoAgainstHero={false}
      headerLinks={
        <Avatar src={avatarUrl} />
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
        <IssueContent issueParams={issueParams} currentUser={currentUser} />
      </Hero>
    </Layout>
  )
}
