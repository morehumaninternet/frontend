import React from 'react'
import IssuePageComponent from '../components/issue-page'
import { createStore, IssuePageStore } from '../stores/issue-page'
import subscribe from '../background-scripts/issue-page'


const store: IssuePageStore = createStore()

if (typeof window !== 'undefined') {
  subscribe(store) // tslint:disable-line:no-expression-statement
}

export default function IssuePage({ location }: { location: Location }): JSX.Element {
  if (typeof window !== 'undefined') {
    store.dispatch({
      type: 'PAGE_LOAD',
      payload: { search: location.search }
    }) // tslint:disable-line:no-expression-statement
  }

  return (
    <IssuePageComponent store={store} location={location} />
  )
}
