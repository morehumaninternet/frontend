import { createStore as reduxCreateStore, Store as ReduxStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

export type WidgetStore = ReduxStore<WidgetState, WidgetAction>

const emptyState: WidgetState = {
  open: false,
  editingIssue: { title: '', commentHtml: '' },
  isNewIssue: false,
  similarIssues: [],
  postedIssue: null,
  actionInProgress: null,
  error: null,
}

function reducer(initialState: WidgetState = emptyState, action: WidgetAction): WidgetState {
  switch (action.type) {
    case 'OPEN_WIDGET':
      return { ...initialState, open: true }

    case 'CLOSE_WIDGET':
      return { ...initialState, open: false }

    case 'CLICK_IS_NEW_ISSUE':
      return { ...initialState, isNewIssue: true }

    case 'UPDATE_ISSUE_TITLE':
      return {
        ...initialState,
        isNewIssue: false,
        similarIssues: [],
        editingIssue: {
          ...initialState.editingIssue,
          title: action.payload.title,
        },
      }

    case 'UPDATE_ISSUE_COMMENT_HTML':
      if (!initialState.isNewIssue) {
        throw new Error('Should not be able to UPDATE_ISSUE_COMMENT_HTML before confirmed issue is new')
      }

      return {
        ...initialState,
        editingIssue: {
          ...initialState.editingIssue,
          commentHtml: action.payload.html,
        },
      }

    case 'SIMILAR_ISSUES_SEARCH_INITIATE':
    case 'POST_ISSUE_INITIATE':
      return {
        ...initialState,
        actionInProgress: {
          priorState: initialState,
          action,
        },
      }

    case 'POST_ISSUE_SUCCESS':
      return { ...initialState, actionInProgress: null, postedIssue: action.payload.issue }

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
      if (!/^@@[redux|INIT]/.test(faultyAction.type)) {
        throw new Error(`Unknown action type ${faultyAction.type}`)
      }
      return initialState
    }
  }
}

export const createStore = () => reduxCreateStore(reducer, devToolsEnhancer({}))
