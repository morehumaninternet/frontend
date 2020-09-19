import { createStore as reduxCreateStore, Store as ReduxStore } from 'redux'

type ChangeStatusInitiate = { type: 'CHANGE_STATUS_INITIATE'; payload: { user: User; status: IssueStatus; comment: { html: string } } }
type PostCommentInitiate = { type: 'POST_COMMENT_INITIATE'; payload: { user: User; comment: { html: string } } }

export type IssuePageAction =
  | { type: 'PAGE_LOAD'; payload: { search: string } }
  | { type: 'CURRENT_USER_LOAD_SUCCESS'; payload: { user: User } }
  | { type: 'CURRENT_USER_LOAD_ERROR'; error: { message: string } }
  | { type: 'INITIAL_ISSUE_LOAD_SUCCESS'; payload: { issue: Issue } }
  | { type: 'INITIAL_ISSUE_LOAD_ERROR'; error: { message: string } }
  | ChangeStatusInitiate
  | { type: 'CHANGE_STATUS_SUCCESS' }
  | { type: 'CHANGE_STATUS_ERROR'; error: { message: string } }
  | PostCommentInitiate
  | { type: 'POST_COMMENT_SUCCESS' }
  | { type: 'POST_COMMENT_ERROR'; error: { message: string } }
  | { type: 'DISMISS_ERROR' }

export type IssueParamsChecking = { state: 'checking' }
export type IssueParamsNotOk = { state: 'not ok'; error: string }
export type IssueParamsOk = {
  state: 'ok'
  params: { site: string; issueId: number }
}

export type IssueParams = IssueParamsChecking | IssueParamsNotOk | IssueParamsOk

export type IssueStateLoading = { loading: true; issue?: undefined }
export type IssueStateLoaded = { loading: false; issue: Maybe<Issue> }
export type IssueState = IssueStateLoading | IssueStateLoaded

export type IssueActionInProgress = { priorState: IssuePageState; action: ChangeStatusInitiate | PostCommentInitiate }

export type IssuePageState = {
  params: IssueParams
  currentUser: CurrentUser
  issueState: IssueState
  actionInProgress: null | IssueActionInProgress
  error: null | { message: string }
}

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

    case 'CHANGE_STATUS_SUCCESS':
      return { ...initialState, actionInProgress: null }

    case 'POST_COMMENT_SUCCESS':
      return { ...initialState, actionInProgress: null }

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
