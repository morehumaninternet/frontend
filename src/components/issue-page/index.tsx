/*
  The issue page component
*/

// tslint:disable:no-expression-statement
import React from 'react'
import IssuePageComponent from './component'
import { createStore } from './store'
import subscribe from './background-script'
import { useTour } from '../../effects/useTour'
import * as mockApi from '../../clients/mockApi'
import drawRipple from '../../animations/ripple'

// The source of truth for the state of the issue page is its store. This reduces the burden on React to manage
// the state, creating a clearer separation of concerns and reducing the number of complicated effects.
const store = createStore()

// Only run the background script which makes API calls on the client
if (typeof window !== 'undefined') {
  subscribe(store, mockApi)
}

export default function IssuePage({ location, navigate }: PageProps): JSX.Element {
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

  // Use the tour for the issue page if running for an 'opened' goalco.com issue
  useTour(
    {
      steps: [
        {
          id: 'issue-now-posted',
          text: ['The issue is now posted to the More Human Internet platform where the site’s maintainer can see and address it.'],
          attachTo: {
            element: '.issue-timeline',
            on: 'top',
          },
        },
        {
          id: 'highlight-issue-action-buttons',
          text: ['Others who experience the same issue can upvote for visibility, add comments, share similar issues or flag bad behavior.'],
          attachTo: {
            element: '.issue-action-buttons',
            on: 'top',
          },
          when: {
            hide(): void {
              return changeStatus({ username: 'devdiva', avatarUrl: '/devdiva.png' }, 'acknowledged', {
                html: `<div id="diva-acknowledged">I am able to reproduce this on our end, sorry about that! We'll get working on a fix right away</div>`,
              })
            },
          },
        },
        {
          id: 'maintainer-acknowledged',
          text: ["It looks like the site's maintainer was already online, and she quickly acknowledged the issue"],
          attachTo: {
            element: '.issue-activity.comment:nth-child(3)',
            on: 'top',
          },
          when: {
            hide(): void {
              return changeStatus({ username: 'devdiva', avatarUrl: '/devdiva.png' }, 'closed', {
                html: `<div id="diva-fixed">Deployed a fix that seems to be fixing the issue. Definitely leave a comment and reopen this issue if you're still being affected!</div>`,
              })
            },
          },
          scrollTo: { behavior: 'smooth', block: 'center' },
        },
        {
          id: 'maintainer-closed',
          text: [
            'She reports that the problem with checkout is now fixed, and she marked this issue as closed. People can still see the issue, and they can upvote it if the same problem resurfaces.',
          ],
          attachTo: {
            element: '.issue-activity.comment:nth-child(5)',
            on: 'top',
          },
          scrollTo: { behavior: 'smooth', block: 'center' },
        },
        {
          id: 'click-issues',
          text: ['<strong>Click "Issues"</strong> to see every issue associated with this site'],
          attachTo: {
            element: '.sidebar-links a[href^="/issues"] svg',
            on: 'bottom-end',
          },
          scrollTo: { behavior: 'smooth', block: 'center' },
          onNextClick(): void {
            drawRipple(document.querySelector('.sidebar-links a[href^="/issues"] svg')!)
          },
        },
      ],
      onCancel: () => navigate('/'),
    },
    () => {
      const { issueState } = storeState
      return !issueState.loading && !!issueState.issue && issueState.issue.site === 'goalco.com' && issueState.issue.status === 'opened'
    },
    [storeState.issueState]
  )

  return <IssuePageComponent location={location} storeState={storeState} postComment={postComment} changeStatus={changeStatus} />
}
