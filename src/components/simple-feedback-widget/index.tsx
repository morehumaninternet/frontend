import React from 'react'
import SimpleFeedbackWidgetIcon from '../widget/icon'
import { Button } from '@material-ui/core'
import hasParent from '../../utils/hasParent'
import { thankYouHref } from '../../utils/href'

// A very simple feedback widget that leverages the styles we largely already had for the existing widget, with some minor modifications
// Uses netlify forms to capture feedback
export default function SimpleFeedbackWidget(): JSX.Element {
  const ref = React.useRef<HTMLDivElement>()
  const [open, setOpen] = React.useState(false)
  const [isDoneEditingFeedback, setIsDoneEditingFeedback] = React.useState(false)

  // tslint:disable:no-expression-statement
  React.useEffect(() => {
    function listener(event: MouseEvent): void {
      if (!hasParent(event.target as any, ref.current!) && !hasParent(event.target as any, '.shepherd-content')) {
        setOpen(false) // tslint:disable-line:no-expression-statement
      }
    }

    document.addEventListener('click', listener) // tslint:disable-line:no-expression-statement

    return () => document.removeEventListener('click', listener)
  })

  React.useEffect(() => {
    if (open) {
      const focusOn = isDoneEditingFeedback ? 'input[name="email"]' : 'textarea[name="feedback"]'
      setTimeout(() => {
        const input = document.querySelector(`form[name="submit-feedback"] ${focusOn}`) as any
        input.focus()
      }, 0)
    }
  }, [open])
  // tslint:enable:no-expression-statement

  return (
    <div className="more-human-internet-widget-boundary" ref={ref as any} onClick={() => !open && setOpen(true)}>
      <div
        className={`more-human-internet-widget-container ${open ? 'more-human-internet-widget-container-open' : 'more-human-internet-widget-container-closed'}`}
      >
        <SimpleFeedbackWidgetIcon open={open} />
        <form
          className="more-human-internet-widget-editor-container"
          style={{ display: open ? undefined : 'none' }}
          name="submit-feedback"
          method="POST"
          action={thankYouHref()}
          data-netlify="true"
          netlify-honeypot="bot-field"
          autoComplete="off"
          onSubmit={event => {
            // The first submit just takes you to the email input, so don't actually submit yet
            // tslint:disable:no-expression-statement
            if (!isDoneEditingFeedback) {
              event.preventDefault()
              setIsDoneEditingFeedback(true)
              setTimeout(() => {
                const emailInput = document.querySelector('form[name="submit-feedback"] input[name="email"]') as any
                emailInput.focus()
              }, 0)
            }
            // tslint:enable:no-expression-statement
          }}
        >
          <div className="more-human-internet-widget-editor">
            <textarea
              className={`more-human-internet-widget-editor-issue-body-input simple-feedback ${!isDoneEditingFeedback ? 'visible' : 'hide'}`}
              name="feedback"
              placeholder="Your feedback..."
              autoFocus
              required
            />
            {isDoneEditingFeedback && (
              <label htmlFor="email" className={isDoneEditingFeedback ? 'visible' : 'hide'}>
                Email
                <input name="email" type="email" autoFocus required />
              </label>
            )}
          </div>
          <div className="more-human-internet-widget-editor-button-group">
            <Button type="submit" className="post mhi-button">
              Submit feedback
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
