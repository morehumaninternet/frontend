import React from 'react'
import SimpleFeedbackWidgetIcon from './icon'
import CommentInput from './comment-input'
import ButtonGroup from './button-group'
import hasParent from '../../utils/hasParent'
import { createStore, SimpleFeedbackWidgetStore } from './store'
import subscribe from './background-script'

type SimpleFeedbackWidgetWithStoreProps = {
  store: SimpleFeedbackWidgetStore
}

type SimpleFeedbackWidgetWithStateProps = {
  state: SimpleFeedbackWidgetState
  openSimpleFeedbackWidget(): void
  closeSimpleFeedbackWidget(): void
  updateEmail(email: string): void
  updateFeedback(html: string): void
  clickIsDoneEditing(): void
  submitFeedback(): void
}

function SimpleFeedbackWidgetWithState({
  state,
  openSimpleFeedbackWidget,
  closeSimpleFeedbackWidget,
  updateFeedback,
  clickIsDoneEditing: clickIsDoneEditingFeedback,
  submitFeedback,
}: SimpleFeedbackWidgetWithStateProps): JSX.Element {
  const ref = React.useRef<HTMLDivElement>()

  const { open, actionInProgress, isDoneEditingFeedback } = state

  const submittingFeedback = !!actionInProgress && actionInProgress.action.type === 'SUBMIT_FEEDBACK_INITIATE'

  // tslint:disable:no-expression-statement
  React.useEffect(() => {
    function listener(event: MouseEvent): void {
      if (!hasParent(event.target as any, ref.current!) && !hasParent(event.target as any, '.shepherd-content')) {
        closeSimpleFeedbackWidget() // tslint:disable-line:no-expression-statement
      }
    }

    document.addEventListener('click', listener) // tslint:disable-line:no-expression-statement

    return () => document.removeEventListener('click', listener)
  })
  // tslint:enable:no-expression-statement

  return (
    <div className="more-human-internet-widget-boundary" ref={ref as any} onClick={() => !open && openSimpleFeedbackWidget()}>
      <div
        className={`more-human-internet-widget-container ${open ? 'more-human-internet-widget-container-open' : 'more-human-internet-widget-container-closed'}`}
      >
        <SimpleFeedbackWidgetIcon open={open} />
        <div className="more-human-internet-widget-editor-container" style={{ display: open ? undefined : 'none' }}>
          <div className="more-human-internet-widget-editor">
            {submittingFeedback ? (
              <div className="submitting">
                Submitting issue...
                <br />
                You will be redirected shortly
              </div>
            ) : (
              <>
                {isDoneEditingFeedback ? null : (
                  // <EmailInput

                  // />
                  <CommentInput updateFeedback={updateFeedback} />
                )}
              </>
            )}
          </div>
          {!submittingFeedback && (
            <ButtonGroup
              isDoneEditingFeedback={isDoneEditingFeedback}
              reasonCantPostAsNewIssue={null}
              clickIsDoneEditingFeedback={clickIsDoneEditingFeedback}
              submitFeedback={submitFeedback}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function SimpleFeedbackWidgetWithStore({ store }: SimpleFeedbackWidgetWithStoreProps): JSX.Element {
  const [state, setState] = React.useState<SimpleFeedbackWidgetState>(store.getState())

  // tslint:disable:no-expression-statement
  React.useEffect(() => {
    return store.subscribe(() => setState(store.getState()))
  }, [])

  // tslint:enable:no-expression-statement

  return (
    <SimpleFeedbackWidgetWithState
      state={state}
      openSimpleFeedbackWidget={() => store.dispatch({ type: 'OPEN_WIDGET' })}
      closeSimpleFeedbackWidget={() => store.dispatch({ type: 'CLOSE_WIDGET' })}
      updateFeedback={feedback => store.dispatch({ type: 'UPDATE_FEEDBACK', payload: { feedback } })}
      updateEmail={email => store.dispatch({ type: 'UPDATE_EMAIL', payload: { email } })}
      clickIsDoneEditing={() => store.dispatch({ type: 'CLICK_DONE_EDITING' })}
      submitFeedback={() => store.dispatch({ type: 'SUBMIT_FEEDBACK_INITIATE' })}
    />
  )
}

export default (): null | JSX.Element => {
  const [store, setStore] = React.useState<null | SimpleFeedbackWidgetStore>(null)

  // tslint:disable:no-expression-statement
  React.useEffect(() => {
    const s = createStore()
    subscribe(s, {
      submitFeedback(): Promise<any> {
        throw new Error('Implement')
      },
    })
    setStore(s)
  }, [])
  // tslint:enable:no-expression-statement

  return store && <SimpleFeedbackWidgetWithStore store={store} />
}
