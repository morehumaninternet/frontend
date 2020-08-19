import React from 'react'
import Layout from '../components/shared/layout'
import SEO, { defaultLinks } from '../components/shared/seo'
import Hero from '../components/shared/hero'
import { Avatar } from '@material-ui/core'
import * as api from '../clients/mockApi'

import setLogoFade from '../utils/setLogoFade'
import LoadedIssue from '../components/issue-page'
import useIssue, { IssueState, UseIssueReturn } from '../effects/useIssue'
import useIssueParams, { IssueParams, IssueParamsOk } from '../effects/useIssueParams'
import useCurrentUser, { CurrentUser } from '../effects/useCurrentUser'



function Loading(): JSX.Element {
  return (
    <p>Loading...</p>
  )
}

function WithIssueParams({ currentUser, params }: { currentUser: CurrentUser, params: IssueParamsOk['params'] }): JSX.Element {
  const { issueState, postComment, changeStatus } = useIssue({ api, params })

  return (
    issueState.loading
      ? <p>Loading...</p>
      : <LoadedIssue
          avatarUrl={currentUser.loaded ? currentUser.user.avatarUrl : undefined}
          issue={issueState.issue! /* TODO: handle issues not present */}
          changeStatus={changeStatus}
          postComment={async comment => {
            if (!currentUser.loaded) {
              throw new Error('Cannot post comment when currentUser not loaded')
            }
            return postComment(currentUser.user, comment)
          }}
        />
  )

}

function IssueContent({ issueParams, currentUser }: { issueParams: IssueParams, currentUser: CurrentUser }): JSX.Element {
  switch (issueParams.state) {
    case 'checking': return <Loading />
    case 'not ok': throw new Error('Handle this case better!')
    case 'ok': return <WithIssueParams currentUser={currentUser} params={issueParams.params} />
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
