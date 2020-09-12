// tslint:disable:no-expression-statement
import React from 'react'
import updateTopSelectedRow, { getTopSelectedRow } from './updateTopSelectedRow'

const defaultIssueBody = `
<strong>Steps I followed</strong>

<ol>
<li>...</li>
</ol>

<strong>What I Observed</strong>
<br>
...
<br>
<br>
<strong>What I Expected</strong>
<br>
...
`

type CommentInputProps = {
  setIssueInitialCommentHtml(initialCommentHTML: string): void
}

export default function CommentInput({ setIssueInitialCommentHtml }: CommentInputProps): JSX.Element {
  const ref: React.MutableRefObject<HTMLDivElement> = React.useRef() as any

  React.useEffect(() => {
    const editorElement = ref.current!.querySelector('trix-editor') as any
    editorElement.editor.loadHTML(defaultIssueBody)

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
    <div ref={ref as any} className="more-human-internet-widget-editor-issue-body-input" dangerouslySetInnerHTML={{ __html: `<trix-editor></trix-editor>` }} />
  )
}
