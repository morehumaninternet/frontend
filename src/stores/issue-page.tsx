import { createStore as reduxCreateStore, Store as ReduxStore } from 'redux'

export type IssuePageStore = ReduxStore<IssuePageState, IssuePageAction>

const emptyState: IssuePageState = {
  params: { state: 'checking' },
  currentUser: { loaded: false },
  issueState: { loading: true },
  actionInProgress: null,
  error: null,
}

function reducer(initialState: IssuePageState = emptyState, action: IssuePageAction): IssuePageState {
  switch (action.type) {
    case 'PAGE_LOAD': {
      const params = new URLSearchParams(action.payload.search)

      const site = params.get('site')
      if (!site) {
        return {
          ...initialState,
          params: {
            state: 'not ok',
            error: 'query param `site` is required',
          },
        }
      }

      const issueId = parseInt(params.get('id')!, 10)
      if (!issueId) {
        return {
          ...initialState,
          params: {
            state: 'not ok',
            error: 'query param `issueId`, an integer, is required',
          },
        }
      }

      return {
        ...initialState,
        params: {
          state: 'ok',
          params: { site, issueId },
        },
      }
    }

    case 'CURRENT_USER_LOAD_SUCCESS':
      return {
        ...initialState,
        currentUser: {
          loaded: true,
          user: action.payload.user,
        },
      }

    case 'INITIAL_ISSUE_LOAD_SUCCESS':
      return {
        ...initialState,
        issueState: {
          loading: false,
          issue: action.payload.issue,
        },
      }

    // Optimistically update the issue with the timeline that would result from the action.
    // Set the actionInProgress with the prior state and the action so that this can be rolled back on an error.
    case 'CHANGE_STATUS_INITIATE': {
      const { issueState } = initialState
      if (issueState.loading) {
        throw new Error('Posting comments while the issue is loading should not be possible')
      }
      const { issue } = issueState

      if (!issue) {
        throw new Error('Posting comments for a nonexistent issue should not be possible')
      }

      if (initialState.actionInProgress) {
        throw new Error('Wait for the current action to finish before starting another')
      }

      const now = new Date()

      const nextTimeline: IssueTimeline = issue.timeline.concat([
        {
          verb: 'comment',
          by: action.payload.user,
          timestamp: now,
          comment: action.payload.comment,
        },
        {
          verb: 'change status',
          by: action.payload.user,
          timestamp: now,
          status: action.payload.status,
        },
      ])

      const nextIssue: Issue = {
        ...issue,
        aggregates: {
          ...issue.aggregates,
          comments: {
            count: issue.aggregates.comments.count + 1,
          },
        },
        timeline: nextTimeline,
      }

      return {
        ...initialState,
        issueState: { loading: false, issue: nextIssue },
        actionInProgress: { priorState: initialState, action },
      }
    }

    // Optimistically update the issue with the timeline that would result from the action.
    // Set the actionInProgress with the prior state and the action so that this can be rolled back on an error.
    case 'POST_COMMENT_INITIATE': {
      const { issueState } = initialState
      if (issueState.loading) {
        throw new Error('Posting comments while the issue is loading should not be possible')
      }
      const { issue } = issueState

      if (!issue) {
        throw new Error('Posting comments for a nonexistent issue should not be possible')
      }

      if (initialState.actionInProgress) {
        throw new Error('Wait for the current action to finish before starting another')
      }

      const nextTimeline: IssueTimeline = issue.timeline.concat([
        {
          verb: 'comment',
          by: action.payload.user,
          timestamp: new Date(),
          comment: action.payload.comment,
        },
      ])

      const nextIssue: Issue = {
        ...issue,
        aggregates: {
          ...issue.aggregates,
          comments: {
            count: issue.aggregates.comments.count + 1,
          },
        },
        timeline: nextTimeline,
      }

      return {
        ...initialState,
        issueState: { loading: false, issue: nextIssue },
        actionInProgress: { priorState: initialState, action },
      }
    }

    // The successful completion of the action means that the optimistic update can stay and there's no action in progress.
    case 'CHANGE_STATUS_SUCCESS':
      return { ...initialState, actionInProgress: null }

    // The successful completion of the action means that the optimistic update can stay and there's no action in progress.
    case 'POST_COMMENT_SUCCESS':
      return { ...initialState, actionInProgress: null }

    // Reload the priorState from before the optimistic update
    case 'CHANGE_STATUS_ERROR':
    case 'POST_COMMENT_ERROR':
      return {
        ...initialState.actionInProgress!.priorState,
        actionInProgress: null,
        error: action.error,
      }

    case 'CURRENT_USER_LOAD_ERROR':
    case 'INITIAL_ISSUE_LOAD_ERROR':
      return {
        ...initialState,
        actionInProgress: null,
        error: action.error,
      }

    case 'DISMISS_ERROR':
      return { ...initialState, error: null }

    default: {
      const faultyAction: any = action
      if (!/^@@redux/.test(faultyAction.type)) {
        throw new Error(`Unknown action type ${faultyAction.type}`)
      }
      return initialState
    }
  }
}

export const createStore = () => reduxCreateStore(reducer)
