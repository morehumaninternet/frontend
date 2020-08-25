import React from 'react'
import updateTopSelectedRow, { getTopSelectedRow } from './updateTopSelectedRow'


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

export default function CommentInput({ setIssueInitialCommentHtml }: { setIssueInitialCommentHtml(initialCommentHTML: string): void }): JSX.Element {
  const ref: React.MutableRefObject<HTMLDivElement> = React.useRef() as any

  React.useEffect(() => {
    const editorElement = ref.current!.querySelector('trix-editor') as any

    editorElement.addEventListener('trix-initialize', () => {
      editorElement.editor.loadHTML(defaultIssueBody)
    })

    editorElement.addEventListener('trix-selection-change', () => {
      updateTopSelectedRow(ref, getTopSelectedRow(editorElement))
    })

    editorElement.addEventListener('trix-blur', () => {
      updateTopSelectedRow(ref, null)
    })

    editorElement.addEventListener('trix-change', (event: { target: { value: string } }) => {
      setIssueInitialCommentHtml(event.target.value)
    })
  }, [])

  return (
    <div
      ref={ref as any}
      className="more-human-internet-widget-editor-issue-body-input"
      dangerouslySetInnerHTML={{ __html: `<trix-editor></trix-editor>` }}
    />
  )
}
