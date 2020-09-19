import React from 'react'
import IssuePageComponent from '../components/issue-page'
import { createStore, IssuePageStore, IssuePageState } from '../stores/issue-page'
import subscribe from '../background-scripts/issue-page'
import { useTour, withNextButton } from '../effects/useTour'


const store: IssuePageStore = createStore()

if (typeof window !== 'undefined') {
  subscribe(store) // tslint:disable-line:no-expression-statement
}

export default function IssuePage({ location }: { location: Location }): JSX.Element {
  const [storeState, setStoreState] = React.useState<IssuePageState>(store.getState())

  // tslint:disable-next-line:no-expression-statement
  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => setStoreState(store.getState()))

    store.dispatch({
      type: 'PAGE_LOAD',
      payload: { search: location.search }
    }) // tslint:disable-line:no-expression-statement

    return unsubscribe
  }, [])

  function postComment(comment: { html: string }) {
    if (!storeState.currentUser.loaded) {
      throw new Error('Cannot post comment when currentUser not loaded')
    }

    store.dispatch({
      type: 'POST_COMMENT_INITIATE',
      payload: {
        user: storeState.currentUser.user,
        comment
      }
    })
  }

  function changeStatus(user: User, status: IssueStatus, comment: { html: string }) {
    store.dispatch({
      type: 'CHANGE_STATUS_INITIATE',
      payload: { user, status, comment }
    })
  }

  const tour = useTour({
    steps: [
      {
        text: ['The issue is now posted to the more human internet platform where the site’s maintainer can see and address it.'],
        attachTo: {
          element: '.issue-timeline',
          on: 'top',
        },
        ...withNextButton,
        when: {
          hide() {
            changeStatus({ username: 'devdiva', avatarUrl: '/devdiva.png' }, 'acknowledged', {
              html: `<div id="diva-acknowledged">I am able to reproduce this on our end, sorry about that! We'll get working on a fix right away</div>`,
            })
          }
        }
      },
      {
        text: ['Looks like Devdiva22 was online and quickly addressed the issue in near real-time.'],
        attachTo: {
          element: '#diva-acknowledged',
          on: 'top',
        },
        ...withNextButton,
        when: {
          hide() {
            changeStatus({ username: 'devdiva', avatarUrl: '/devdiva.png' }, 'closed', {
              html: `<div id="diva-fixed">Deployed a fix that seems to be fixing the issue. Definitely leave a comment and reopen this issue if you're still being affected!</div>`,
            })
          }
        }
      },
      {
        text: ['Devdiva22 reports the problem is now fixed. Customer will be able to successfully checkout.'],
        attachTo: {
          element: '#diva-fixed',
          on: 'top',
        },
      }
    ]
  })

  return (
    <IssuePageComponent
      location={location}
      storeState={storeState}
      postComment={postComment}
      changeStatus={changeStatus}
    />
  )
}
