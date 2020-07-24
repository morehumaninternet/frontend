import React from 'react'


type EditorProps = {
  issueTitle: string
  setIssueTitle(issueTitle: string): void
}

export default function Editor({ issueTitle, setIssueTitle }: EditorProps): JSX.Element {

  return (
    <div className="more-human-internet-widget-editor">
      <div
        className="more-human-internet-widget-editor-issue-title-input"
        dangerouslySetInnerHTML={{
          __html: `
            <trix-editor></trix-editor>`
        }}
      />
    </div>
  )
}
