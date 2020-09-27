import { WidgetStore } from './store'
import { issueHref } from '../../utils/href'
import debounceDefer from '../../utils/debounceDefer'

type Api = {
  postIssue(issue: {
    id?: number
    user?: User
    site: string
    title: string
    initialCommentHtml: string
    aggregates?: IssueAggregates
    status?: IssueStatus
  }): Promise<Issue>
  searchIssues(opts: { site: string; title?: string }): Promise<ReadonlyArray<Issue>>
}

export default function subscribe(store: WidgetStore, api: Api, siteOrigin: string, navigate: (href: string) => void): void {
  const searchIssues = debounceDefer(api.searchIssues, 200)

  let previousState: WidgetState = store.getState() // tslint:disable-line:no-let

  store.subscribe(() => {
    const nextState: WidgetState = store.getState()
    const prevState = previousState
    previousState = nextState // tslint:disable-line:no-expression-statement

    // If the title changed, dispatch SIMILAR_ISSUES_SEARCH_INITIATE
    if (nextState.editingIssue.title !== prevState.editingIssue.title) {
      return store.dispatch({ type: 'SIMILAR_ISSUES_SEARCH_INITIATE' })
    }

    // If an issue was posted, navigate to it
    if (nextState.postedIssue) {
      return navigate(issueHref(nextState.postedIssue))
    }

    // If a POST_ISSUE_INITIATE just started, post the issue
    if (nextState.actionInProgress && !prevState.actionInProgress && nextState.actionInProgress.action.type === 'POST_ISSUE_INITIATE') {
      return api
        .postIssue({
          site: siteOrigin,
          title: nextState.editingIssue.title,
          initialCommentHtml: nextState.editingIssue.commentHtml,
        })
        .then(issue => store.dispatch({ type: 'POST_ISSUE_SUCCESS', payload: { issue } }))
        .catch(error => store.dispatch({ type: 'POST_ISSUE_ERROR', error }))
    }

    // If there is a SIMILAR_ISSUES_SEARCH_INITIATE in progress, handle it
    // Note that this can get triggered even if the prevState has a SIMILAR_ISSUES_SEARCH_INITIATE in progress
    // In this case we may or may not search for issues depending on whether the title changed
    // When the search results come back, we may or not use them depending on whether the title has changed since the search started
    if (nextState.actionInProgress && nextState.actionInProgress.action.type === 'SIMILAR_ISSUES_SEARCH_INITIATE') {
      const searchForTitle = nextState.actionInProgress.priorState.editingIssue.title

      // If there wasn't previously an action in progress or the title has changed, start searching for issues
      if (!prevState.actionInProgress || searchForTitle !== prevState.actionInProgress.priorState.editingIssue.title) {
        return searchIssues({ site: siteOrigin, title: searchForTitle })
          .then(similarIssues => {
            // If by the time the similar issues have come back the title hasn't changed then these are the similar issues to be used
            if (searchForTitle === store.getState().editingIssue.title) {
              return store.dispatch({ type: 'SIMILAR_ISSUES_SEARCH_SUCCESS', payload: { similarIssues } })
            }
          })
          .catch(error => store.dispatch({ type: 'SIMILAR_ISSUES_SEARCH_ERROR', error }))
      }
    }
  })
}
