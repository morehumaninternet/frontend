import { IssuePageStore, IssuePageState } from '../stores/issue-page'
import * as mockApi from '../clients/mockApi'

export default function subscribe(store: IssuePageStore): void {
  let previousState: IssuePageState = store.getState() // tslint:disable-line:no-let

  store.subscribe(() => {
    const nextState: IssuePageState = store.getState()
    const prevState = previousState
    previousState = nextState

    console.log('nextState', nextState)

    if (nextState.params.state === 'ok' && prevState.params.state !== 'ok') {
      store.dispatch({
        type: 'CURRENT_USER_LOAD_SUCCESS',
        payload: {
          user: {
            username: 'sillywalks',
            avatarUrl: 'https://github.com/will-weiss.png?size=71',
          }
        }
      })

      mockApi.getIssueBySiteAndId(nextState.params.params.site, nextState.params.params.issueId)
        .then(issue => store.dispatch({ type: 'INITIAL_ISSUE_LOAD_SUCCESS', payload: { issue: issue! } }))
        .catch(error => store.dispatch({ type: 'INITIAL_ISSUE_LOAD_ERROR', error }))

      return
    }

    if (nextState.actionInProgress && !prevState.actionInProgress) {
      switch (nextState.actionInProgress.action.type) {
        case 'CHANGE_STATUS_INITIATE':
          return mockApi.changeStatus({
            user: nextState.actionInProgress.action.payload.user,
            comment: nextState.actionInProgress.action.payload.comment,
            status: nextState.actionInProgress.action.payload.status,
            site: nextState.actionInProgress.priorState.issueState.issue!.site,
            id: nextState.actionInProgress.priorState.issueState.issue!.id,
          })
            .then(() => store.dispatch({ type: 'CHANGE_STATUS_SUCCESS' }))
            .catch(error => store.dispatch({ type: 'CHANGE_STATUS_ERROR', error }))


        case 'POST_COMMENT_INITIATE':
          return mockApi.postComment({
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
