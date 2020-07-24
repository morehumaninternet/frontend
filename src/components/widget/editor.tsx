import React from 'react'


type EditorProps = {
  issueTitle: string
  setIssueTitle(issueTitle: string): void
}

const defaultValue = `
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


export default function Editor({ issueTitle, setIssueTitle }: EditorProps): JSX.Element {
  const issueTitleRef = React.useRef<HTMLDivElement>()
  const issueBodyRef = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    const editorElement = issueTitleRef.current!.querySelector('trix-editor') as any
    editorElement.addEventListener('trix-change', (event: { target: { value: string } }) => {
      const match = event.target.value.match(/^<div>(.*)<\/div>$/)

      if (!match) {
        throw new Error('trix should always wrap its contents in a div and the toolbar is exposed')
      }

      setIssueTitle(match[1])
    })
  }, [])

  React.useEffect(() => {
    const editorElement = issueBodyRef.current!.querySelector('trix-editor') as any

    editorElement.editor.loadHTML(defaultValue)

    // editorElement.editor
    editorElement.addEventListener('trix-change', (event: { target: { value: string } }) => {

    })

    editorElement.addEventListener('trix-selection-change', () => {
      const [selectionStart, selectionEnd] = editorElement.editor.getSelectedRange()
      const toolbarElement = issueBodyRef.current!.querySelector('trix-toolbar') as any

      if (selectionStart === selectionEnd) {
        toolbarElement.style.display = 'none'
      } else {
        toolbarElement.style.display = 'block'
      }
    })
  }, [])

  return (
    <div className="more-human-internet-widget-editor">
      <div
        ref={issueTitleRef as any}
        className="more-human-internet-widget-editor-issue-title-input"
        dangerouslySetInnerHTML={{ __html: `<trix-editor placeholder="What is your issue?"></trix-editor>` }}
      />
      <div
        ref={issueBodyRef as any}
        className="more-human-internet-widget-editor-issue-body-input"
        dangerouslySetInnerHTML={{
          __html: `
            <trix-editor>
              ${defaultValue}
            </trix-editor>
          `
        }}
      />
    </div>
  )
}
