import React from 'react'
import * as api from '../../clients/mockApi'
import { LayoutWithSidebar } from '../../components/shared/layout'
import SEO from '../../components/shared/seo'
import { scriptSrc, stylesHref } from '../../effects/useTour'
import LoadedIssue, { LoadedIssueContentProps } from './loaded'
import { IssuePageStore, IssueParamsOk, IssueParams, IssuePageState } from '../../stores/issue-page'

function Loading(): JSX.Element {
  return <p>Loading...</p>
}

type WithIssueParamsProps = Pick<IssuePageState, 'currentUser' | 'issueState' | 'actionInProgress'> & Pick<LoadedIssueContentProps, 'changeStatus'> & {
  postComment(comment: { html: string }): void
}

function WithIssueParams({ currentUser, issueState, actionInProgress, postComment, changeStatus }: WithIssueParamsProps): JSX.Element {
  return issueState.loading ? (
    <p>Loading...</p>
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

function IssuePageComponentInner({ storeState, dispatch }: { storeState: IssuePageState, dispatch: IssuePageStore['dispatch'] }): JSX.Element {

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
          postComment={(comment: { html: string }) => {
            if (!storeState.currentUser.loaded) {
              throw new Error('Cannot post comment when currentUser not loaded')
            }

            dispatch({
              type: 'POST_COMMENT_INITIATE',
              payload: {
                user: storeState.currentUser.user,
                comment
              }
            })
          }}
          changeStatus={(user, status, comment) => {
            dispatch({
              type: 'CHANGE_STATUS_INITIATE',
              payload: { user, status, comment }
            })
          }}
        />
      )
  }
}


export default function IssuePageComponent({ store, location }: { store: IssuePageStore, location: Location }): JSX.Element {
  const [storeState, setStoreState] = React.useState<IssuePageState>(store.getState())
  // tslint:disable-next-line:no-expression-statement

  const unsubscribe = store.subscribe(() => {
    setStoreState(store.getState())
  })

  React.useEffect(() => {
    return unsubscribe
  }, [])

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
      <IssuePageComponentInner storeState={storeState} dispatch={store.dispatch} />
    </LayoutWithSidebar>
  )
}
