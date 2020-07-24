import React from 'react'
import { Button } from '@material-ui/core'


type EditorProps = {
  issueTitle: string
  setIssueTitle(issueTitle: string): void
}

export default function Editor({ issueTitle, setIssueTitle }: EditorProps): JSX.Element {
  return (
    <div className="more-human-internet-widget-editor">
      OK
    </div>
  )
}
