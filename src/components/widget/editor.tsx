import React from 'react'


type EditorProps = {
  issueTitle: string
  setIssueTitle(issueTitle: string): void
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




export default function Editor({ issueTitle, setIssueTitle }: EditorProps): JSX.Element {
  const issueTitleRef = React.useRef<HTMLDivElement>()
  const issueBodyRef = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    const editorElement = issueTitleRef.current!.querySelector('trix-editor') as any
    editorElement.addEventListener('trix-change', (event: { target: { value: string } }) => {
      const { value } = event.target
      const match = event.target.value.match(/^<div>(.*)<\/div>$/)

      if (!match) {
        console.error(value)
        throw new Error('trix should always wrap its contents in a div and the toolbar is exposed')
      }

      setIssueTitle(match[1])
    })
  }, [])

  React.useEffect(() => {
    const editorElement = issueBodyRef.current!.querySelector('trix-editor') as any

    editorElement.addEventListener('trix-initialize', () => {
      editorElement.editor.loadHTML(defaultIssueBody)
    })

    // editorElement.editor
    editorElement.addEventListener('trix-change', (event: { target: { value: string } }) => {

    })

    editorElement.addEventListener('trix-selection-change', () => {
      const [selectionStart, selectionEnd] = editorElement.editor.getSelectedRange()
      const toolbarElement = issueBodyRef.current!.querySelector('trix-toolbar') as any

      if (selectionStart === selectionEnd) {
        toolbarElement.style.display = 'none'
        return
      }

      let testCharacter = selectionStart
      let startingRect
      let lastRectSameRow

      while (testCharacter < selectionEnd) {
        const testRect = editorElement.editor.getClientRectAtPosition(testCharacter)
        console.log('m', testCharacter, testRect)
        testCharacter++

        if (!testRect) continue

        if (!startingRect) {
          startingRect = testRect
          lastRectSameRow = testRect
          continue
        }
        if (testRect.top > startingRect.top) {
          break
        }

        lastRectSameRow = testRect
      }

      console.log('zzz', startingRect, lastRectSameRow)

      if (lastRectSameRow) {
        toolbarElement.style.display = 'block'
        toolbarElement.style.top = `${startingRect.top}px`
        toolbarElement.style.left = `${(startingRect.left + lastRectSameRow.right) / 2}px`
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
        dangerouslySetInnerHTML={{ __html: `<trix-editor></trix-editor>` }}
      />
    </div>
  )
}
