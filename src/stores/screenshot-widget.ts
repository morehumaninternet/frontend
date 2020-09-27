import { createStore as reduxCreateStore, Store as ReduxStore } from 'redux'

export type ScreenshotWidgetStore = ReduxStore<ScreenshotWidgetState, ScreenshotWidgetAction>

const emptyState: ScreenshotWidgetState = {
  open: false,
  issue: { title: '', commentHtml: '' },
  issueSubmitted: false,
  similarIssues: [],
  actionInProgress: null,
  error: null,
}

function reducer(initialState: ScreenshotWidgetState = emptyState, action: ScreenshotWidgetAction): ScreenshotWidgetState {
  switch (action.type) {
    case 'OPEN_WIDGET':
      return { ...initialState, open: true }

    case 'CLOSE_WIDGET':
      return { ...initialState, open: false }

    case 'UPDATE_ISSUE_TITLE':
      return {
        ...initialState,
        issue: {
          ...initialState.issue,
          title: action.payload.title
        }
      }

    case 'UPDATE_ISSUE_COMMENT_HTML':
      return {
        ...initialState,
        issue: {
          ...initialState.issue,
          commentHtml: action.payload.html
        }
      }

    case 'SIMILAR_ISSUES_SEARCH_INITIATE':
    case 'POST_ISSUE_INITIATE':
      return {
        ...initialState,
        actionInProgress: {
          priorState: initialState,
          action
        }
      }

    case 'POST_ISSUE_SUCCESS':
      return { ...initialState, actionInProgress: null, issueSubmitted: true }

    case 'SIMILAR_ISSUES_SEARCH_SUCCESS':
      return { ...initialState, actionInProgress: null, similarIssues: action.payload.similarIssues }


    case 'SIMILAR_ISSUES_SEARCH_ERROR':
    case 'POST_ISSUE_ERROR':
      return {
        ...initialState,
        actionInProgress: null,
        error: action.error,
      }

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
