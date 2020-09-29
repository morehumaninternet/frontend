import { createStore as reduxCreateStore, Store as ReduxStore } from 'redux'

export type SimpleFeedbackWidgetStore = ReduxStore<SimpleFeedbackWidgetState, SimpleFeedbackWidgetAction>

const emptyState: SimpleFeedbackWidgetState = {
  open: false,
  editingFeedback: '',
  isDoneEditingFeedback: false,
  email: '',
  submitted: null,
  actionInProgress: null,
  error: null,
}

function reducer(initialState: SimpleFeedbackWidgetState = emptyState, action: SimpleFeedbackWidgetAction): SimpleFeedbackWidgetState {
  switch (action.type) {
    case 'OPEN_WIDGET':
      return { ...initialState, open: true }

    case 'CLOSE_WIDGET':
      return { ...initialState, open: false }

    case 'CLICK_DONE_EDITING':
      return { ...initialState, isDoneEditingFeedback: true }

    case 'UPDATE_FEEDBACK':
      return {
        ...initialState,
        editingFeedback: action.payload.feedback,
      }

    case 'UPDATE_EMAIL':
      return {
        ...initialState,
        email: action.payload.email,
      }

    case 'SUBMIT_FEEDBACK_INITIATE':
      if (!initialState.isDoneEditingFeedback) {
        throw new Error('Should not be able to SUBMIT_FEEDBACK_INITIATE before done editing')
      }

      return {
        ...initialState,
        actionInProgress: {
          priorState: initialState,
          action,
        },
      }

    case 'SUBMIT_FEEDBACK_SUCCESS':
      return { ...initialState, actionInProgress: null, submitted: action.payload }

    case 'SUBMIT_FEEDBACK_ERROR':
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
