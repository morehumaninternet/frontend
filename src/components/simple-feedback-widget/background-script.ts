import { SimpleFeedbackWidgetStore } from './store'

type Api = {
  submitFeedback(opts: { feedback: string; email: string }): Promise<any>
}

export default function subscribe(store: SimpleFeedbackWidgetStore, api: Api): void {
  let previousState: SimpleFeedbackWidgetState = store.getState() // tslint:disable-line:no-let

  store.subscribe(() => {
    const nextState: SimpleFeedbackWidgetState = store.getState()
    const prevState = previousState
    previousState = nextState // tslint:disable-line:no-expression-statement

    if (nextState.submitted) {
      throw new Error('Do something here')
    }

    if (nextState.actionInProgress && !prevState.actionInProgress && nextState.actionInProgress.action.type === 'SUBMIT_FEEDBACK_INITIATE') {
      const toSubmit = {
        feedback: nextState.editingFeedback,
        email: nextState.email,
      }
      return api
        .submitFeedback(toSubmit)
        .then(() => store.dispatch({ type: 'SUBMIT_FEEDBACK_SUCCESS', payload: toSubmit }))
        .catch(error => store.dispatch({ type: 'SUBMIT_FEEDBACK_ERROR', error }))
    }
  })
}
