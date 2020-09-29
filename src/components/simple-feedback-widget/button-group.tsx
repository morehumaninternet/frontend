import React from 'react'
import { Button } from '@material-ui/core'

type ButtonGroupProps = {
  isDoneEditingFeedback: boolean
  reasonCantPostAsNewIssue: null | string
  clickIsDoneEditingFeedback(): void
  submitFeedback(): void
}

export default function ButtonGroup({
  isDoneEditingFeedback,
  reasonCantPostAsNewIssue,
  clickIsDoneEditingFeedback,
  submitFeedback,
}: ButtonGroupProps): JSX.Element {
  return (
    <div className="more-human-internet-widget-editor-button-group">
      {isDoneEditingFeedback ? (
        <Button className="post mhi-button" onClick={() => submitFeedback()}>
          Submit feedback
        </Button>
      ) : (
        <Button className="post mhi-button" disabled={!!reasonCantPostAsNewIssue} onClick={() => clickIsDoneEditingFeedback()}>
          Submit feedback
        </Button>
      )}
    </div>
  )
}
