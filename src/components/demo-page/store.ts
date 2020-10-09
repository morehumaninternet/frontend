import { createStore as reduxCreateStore, Store as ReduxStore } from 'redux'

export type DemoStore = ReduxStore<DemoState, DemoAction>

const emptyState: DemoState = {
  checkout: false,
  checkedOut: false,
  open: false,
  editingIssue: { title: '', commentHtml: '' },
  isNewIssue: false,
  similarIssues: [],
  postedIssue: null,
  actionInProgress: null,
  error: null,
}

function reducer(initialState: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...initialState, checkout: true }

    case 'CHECKOUT':
      return { ...initialState, checkedOut: true }

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
      if (!/^@@redux/.test(faultyAction.type)) {
        throw new Error(`Unknown action type ${faultyAction.type}`)
      }
      return initialState
    }
  }
}

const localStorageKey = () => `redux-${location.href}`

const wrappedReducer: (initialState: DemoState, action: DemoAction) => DemoState =
  typeof window === 'undefined'
    ? reducer
    : (initialState, action) => {
        const nextState = reducer(initialState, action)
        localStorage.setItem(localStorageKey(), JSON.stringify(nextState))
        return nextState
      }

function getInitialState(): DemoState {
  if (typeof window === 'undefined') return emptyState
  const localStorageItem = localStorage.getItem(localStorageKey())
  if (!localStorageItem) return emptyState
  return JSON.parse(localStorageItem)
}

export const createStore = () => reduxCreateStore(wrappedReducer, getInitialState())
