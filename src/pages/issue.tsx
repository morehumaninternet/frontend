/*
  The issue page component
*/

// tslint:disable:no-expression-statement
import React from 'react'
import IssuePageComponent from '../components/issue-page'
import { createStore, IssuePageStore, IssuePageState } from '../stores/issue-page'
import subscribe from '../background-scripts/issue-page'
import useIssueTour from '../effects/useIssuePageTour'
import * as mockApi from '../clients/mockApi'

// The source of truth for the state of the issue page is its store. This reduces the burden on React to manage
// the state, creating a clearer separation of concerns and reducing the number of complicated effects.
const store: IssuePageStore = createStore()

// Only run the background script which makes API calls on the client
if (typeof window !== 'undefined') {
  subscribe(store, mockApi)
}

export default function IssuePage({ location }: { location: Location }): JSX.Element {
  const [storeState, setStoreState] = React.useState<IssuePageState>(store.getState())

  // Subscribe to the store to keep the storeState up to date.
  // Running the PAGE_LOAD event results in the issue for the page getting loaded by the background script.
  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => setStoreState(store.getState()))

    store.dispatch({
      type: 'PAGE_LOAD',
      payload: { search: location.search },
    })

    return unsubscribe
  }, [])

  function postComment(comment: { html: string }): void {
    if (!storeState.currentUser.loaded) {
      throw new Error('Cannot post comment when currentUser not loaded')
    }

    store.dispatch({
      type: 'POST_COMMENT_INITIATE',
      payload: {
        user: storeState.currentUser.user,
        comment,
      },
    })
  }

  function changeStatus(user: User, status: IssueStatus, comment: { html: string }): void {
    store.dispatch({
      type: 'CHANGE_STATUS_INITIATE',
      payload: { user, status, comment },
    })
  }

  useIssueTour(changeStatus)

  return <IssuePageComponent location={location} storeState={storeState} postComment={postComment} changeStatus={changeStatus} />
}
