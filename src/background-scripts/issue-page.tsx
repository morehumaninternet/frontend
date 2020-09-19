/*
  This background script subscribes to the store for the issue page, listening for user-
  triggered actions that should result in API calls. Then, it makes those API calls and
  dispatches the result back to the store.
*/
import { IssuePageStore } from '../stores/issue-page'
import * as mockApi from '../clients/mockApi'

export default function subscribe(store: IssuePageStore, api: typeof mockApi): void {
  let previousState: IssuePageState = store.getState() // tslint:disable-line:no-let

  store.subscribe(() => {
    const nextState: IssuePageState = store.getState()
    const prevState = previousState
    previousState = nextState // tslint:disable-line:no-expression-statement

    // If the issue parameters have been determined, go get the issue in question as well as the current user
    if (nextState.params.state === 'ok' && prevState.params.state !== 'ok') {
      // For now, we hard code the current user
      store.dispatch({
        type: 'CURRENT_USER_LOAD_SUCCESS',
        payload: {
          user: {
            username: 'sillywalks',
            avatarUrl: 'https://github.com/will-weiss.png?size=71',
          },
        },
      }) // tslint:disable-line:no-expression-statement

      // tslint:disable-next-line:no-expression-statement
      api
        .getIssueBySiteAndId(nextState.params.params.site, nextState.params.params.issueId)
        .then(issue => store.dispatch({ type: 'INITIAL_ISSUE_LOAD_SUCCESS', payload: { issue: issue! } }))
        .catch(error => store.dispatch({ type: 'INITIAL_ISSUE_LOAD_ERROR', error }))

      return
    }

    // If the user has started an action, make the corresponding API call and dispatch the result.
    if (nextState.actionInProgress && !prevState.actionInProgress) {
      switch (nextState.actionInProgress.action.type) {
        case 'CHANGE_STATUS_INITIATE':
          return api
            .changeStatus({
              user: nextState.actionInProgress.action.payload.user,
              comment: nextState.actionInProgress.action.payload.comment,
              status: nextState.actionInProgress.action.payload.status,
              site: nextState.actionInProgress.priorState.issueState.issue!.site,
              id: nextState.actionInProgress.priorState.issueState.issue!.id,
            })
            .then(() => store.dispatch({ type: 'CHANGE_STATUS_SUCCESS' }))
            .catch(error => store.dispatch({ type: 'CHANGE_STATUS_ERROR', error }))

        case 'POST_COMMENT_INITIATE':
          return api
            .postComment({
              user: nextState.actionInProgress.action.payload.user,
              comment: nextState.actionInProgress.action.payload.comment,
              site: nextState.actionInProgress.priorState.issueState.issue!.site,
              id: nextState.actionInProgress.priorState.issueState.issue!.id,
            })
            .then(() => store.dispatch({ type: 'POST_COMMENT_SUCCESS' }))
            .catch(error => store.dispatch({ type: 'POST_COMMENT_ERROR', error }))

        default:
          throw new Error(`Unknown action type: ${(nextState.actionInProgress.action as any).type}`)
      }
    }
  })
}
