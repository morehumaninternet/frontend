import React from 'react'
import updateTopSelectedRow, { getTopSelectedRow } from './updateTopSelectedRow'
import ButtonGroup from './button-group'


type EditorProps = {
  noSimilarIssues: boolean
  similarIssues: { title: string }[]
  setIssueTitle(issueTitle: string): void
  setIssueInitialCommentHtml(issueInitialCommentBody: string): void
  confirmNoSimilarIssues(): void
}

const defaultIssueBody = `
<strong>Steps</strong>

<ol>
<li>Looking for services</li>
<li>Something else</li>
</ol>

<strong>Observations</strong>
<br>
<br>
<strong>Expectations</strong>
`

function insideDiv(html: string): string {
  const match = html.match(/^<div>(.*)<\/div>$/)

  if (!match) {
    console.error(html)
    throw new Error('trix should always wrap its contents in a div and the toolbar is exposed')
  }

  return match[1]
}

export default function Editor({ noSimilarIssues, setIssueTitle, setIssueInitialCommentHtml }: EditorProps): JSX.Element {
  const issueTitleRef = React.useRef<HTMLDivElement>()
  const issueBodyRef: React.MutableRefObject<HTMLDivElement> = React.useRef() as any

  React.useEffect(() => {
    const editorElement = issueTitleRef.current!.querySelector('trix-editor') as any
    editorElement.addEventListener('trix-change', (event: { target: { value: string } }) => {
      setIssueTitle(insideDiv(event.target.value))
    })
  }, [])

  React.useEffect(() => {
    const editorElement = issueBodyRef.current!.querySelector('trix-editor') as any

    editorElement.addEventListener('trix-initialize', () => {
      editorElement.editor.loadHTML(defaultIssueBody)
    })

    editorElement.addEventListener('trix-selection-change', () => {
      updateTopSelectedRow(issueBodyRef, getTopSelectedRow(editorElement))
    })

    editorElement.addEventListener('trix-blur', () => {
      updateTopSelectedRow(issueBodyRef, null)
    })

    editorElement.addEventListener('trix-change', (event: { target: { value: string } }) => {
      setIssueInitialCommentHtml(event.target.value)
    })
  }, [])

  return (
    <>
    <div className="more-human-internet-widget-editor">
      <div
        ref={issueTitleRef as any}
        className="more-human-internet-widget-editor-issue-title-input"
        dangerouslySetInnerHTML={{ __html: `<trix-editor placeholder="What is your issue?"></trix-editor>` }}
      />
      {noSimilarIssues}
      <div
        ref={issueBodyRef as any}
        className="more-human-internet-widget-editor-issue-body-input"
        dangerouslySetInnerHTML={{ __html: `<trix-editor></trix-editor>` }}
      />
    </div>
    {<ButtonGroup />}
    </>
  )
}
