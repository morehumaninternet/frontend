import React from 'react'
import { LayoutWithSidebar } from '../../components/shared/layout'
import SEO from '../../components/shared/seo'
import { scriptSrc, stylesHref } from '../../effects/useTour'
import LoadedIssue, { LoadedIssueContentProps } from './loaded'
import { IssuePageStore, IssuePageState } from '../../stores/issue-page'


type IssuePageFns = Pick<LoadedIssueContentProps, 'changeStatus'> & {
  postComment(comment: { html: string }): void
}

type WithIssueParamsProps = Pick<IssuePageState, 'currentUser' | 'issueState' | 'actionInProgress'> & IssuePageFns

function Loading(): JSX.Element {
  return <p>Loading...</p>
}

function WithIssueParams({ currentUser, issueState, actionInProgress, postComment, changeStatus }: WithIssueParamsProps): JSX.Element {
  return issueState.loading ? (
    <Loading />
  ) : (
    <LoadedIssue
      avatarUrl={currentUser.loaded ? currentUser.user.avatarUrl : undefined}
      issue={issueState.issue! /* TODO: handle issues not present */}
      actionInProgress={!!actionInProgress}
      changeStatus={changeStatus}
      postComment={postComment}
    />
  )
}

function IssuePageComponentInner({ storeState, postComment, changeStatus }: { storeState: IssuePageState } & IssuePageFns): JSX.Element {
  switch (storeState.params.state) {
    case 'checking':
      return <Loading />

    case 'not ok':
      throw new Error('Handle this case better!')

    case 'ok':
      return (
        <WithIssueParams
          currentUser={storeState.currentUser}
          issueState={storeState.issueState}
          actionInProgress={storeState.actionInProgress}
          postComment={postComment}
          changeStatus={changeStatus}
        />
      )
  }
}

export default function IssuePageComponent({ storeState, location, postComment, changeStatus }: { storeState: IssuePageState, location: Location } & IssuePageFns): JSX.Element {
  return (
    <LayoutWithSidebar mainClassName="issue" currentUser={storeState.currentUser} location={location}>
      <SEO
        pageTitle="Issue"
        links={[
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
      <IssuePageComponentInner
        storeState={storeState}
        postComment={postComment}
        changeStatus={changeStatus}
      />
    </LayoutWithSidebar>
  )
}
