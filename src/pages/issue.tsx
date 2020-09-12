import React from 'react'
import { LayoutWithSidebar } from '../components/shared/layout'
import SEO, { defaultLinks } from '../components/shared/seo'
import * as api from '../clients/mockApi'

import setLogoFade from '../utils/setLogoFade'
import LoadedIssue from '../components/issue-page'
import useIssue from '../effects/useIssue'
import useIssueParams, { IssueParams, IssueParamsOk } from '../effects/useIssueParams'
import useCurrentUser from '../effects/useCurrentUser'

function Loading(): JSX.Element {
  return <p>Loading...</p>
}

function WithIssueParams({ currentUser, params }: { currentUser: CurrentUser; params: IssueParamsOk['params'] }): JSX.Element {
  const { issueState, postComment, changeStatus } = useIssue({ api, params })

  return issueState.loading ? (
    <p>Loading...</p>
  ) : (
    <LoadedIssue
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

function IssueContent({ issueParams, currentUser }: { issueParams: IssueParams; currentUser: CurrentUser }): JSX.Element {
  switch (issueParams.state) {
    case 'checking':
      return <Loading />
    case 'not ok':
      throw new Error('Handle this case better!')
    case 'ok':
      return <WithIssueParams currentUser={currentUser} params={issueParams.params} />
  }
}

export default function IssuePage(props: { location: Location }): JSX.Element {
  // TODO: use CSS to have a different variable on different pages
  // tslint:disable-next-line:no-expression-statement
  React.useEffect(() => setLogoFade(1), [])

  const issueParams = useIssueParams(props)
  const currentUser = useCurrentUser()

  return (
    <LayoutWithSidebar mainClassName="issue" currentUser={currentUser} location={props.location}>
      <SEO
        pageTitle="Issue"
        links={defaultLinks.concat([{ rel: 'stylesheet', type: 'text/css', href: '/trix.css' }])}
        scripts={[{ type: 'text/javascript', src: '/trix.js' }]}
      />
      <IssueContent issueParams={issueParams} currentUser={currentUser} />
    </LayoutWithSidebar>
  )
}
