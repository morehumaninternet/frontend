import React from 'react'


type EditorProps = {
  setIssueTitle(issueTitle: string): void
  setIssueInitialCommentBody(issueInitialCommentBody: string): void
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

function * getSelectionClientRects(editorElement: any): IterableIterator<{ top: number, bottom: number, left: number, right: number }> {
  const [selectionStart, selectionEnd] = editorElement.editor.getSelectedRange()
  if (selectionStart === selectionEnd) return

  let selectionCharacter = selectionStart

  while (selectionCharacter < selectionEnd) {
    const rect = editorElement.editor.getClientRectAtPosition(selectionCharacter)
    selectionCharacter++
    if (rect) yield rect
  }
}

function getTopSelectedRow(editorElement: any): null | { top: number, left: number, right: number } {
  let startingRect
  let lastRectSameRow

  for (const testRect of getSelectionClientRects(editorElement)) {
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

  if (!startingRect) return null
  if (!lastRectSameRow) throw new Error('lastRectSameRow not found')
  if (startingRect.top !== lastRectSameRow.top) throw new Error('found rectangles on different rows')

  return {
    top: startingRect.top,
    left: startingRect.left,
    right: lastRectSameRow.right,
  }
}

function numPixels(style: string): number {
  const match = style.match(/^(.+)px$/)

  if (!match) {
    throw new Error(`style must end in px, got ${style}`)
  }

  const pixels = Number(match[1])
  if (Number.isNaN(pixels)) {
    throw new Error(`${style} does not have numeric pixels`)
  }

  return pixels
}

function insideDiv(html: string): string {
  const match = html.match(/^<div>(.*)<\/div>$/)

  if (!match) {
    console.error(html)
    throw new Error('trix should always wrap its contents in a div and the toolbar is exposed')
  }

  return match[1]
}

export default function Editor({ setIssueTitle, setIssueInitialCommentBody }: EditorProps): JSX.Element {
  const issueTitleRef = React.useRef<HTMLDivElement>()
  const issueBodyRef = React.useRef<HTMLDivElement>()

  function updateTopSelectedRow(topSelectedRow: null | { top: number, left: number, right: number }) {
    const toolbarElement = issueBodyRef.current!.querySelector('trix-toolbar') as any

    if (!topSelectedRow) {
      toolbarElement.style.display = 'none'
    } else {
      toolbarElement.style.display = 'block'

      const buttonGroupStyle = getComputedStyle(toolbarElement.querySelector('.trix-button-row > .trix-button-group'))
      const heightPixels = numPixels(buttonGroupStyle.height)
      const widthPixels = numPixels(buttonGroupStyle.width)
      const midpoint = (topSelectedRow.left + topSelectedRow.right) / 2

      toolbarElement.style.top = `${topSelectedRow.top - heightPixels - 10}px`
      toolbarElement.style.left = `${midpoint - (widthPixels / 2)}px`
    }
  }

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
      updateTopSelectedRow(getTopSelectedRow(editorElement))
    })

    editorElement.addEventListener('trix-blur', () => {
      updateTopSelectedRow(null)
    })

    editorElement.addEventListener('trix-change', (event: { target: { value: string } }) => {
      setIssueInitialCommentBody(event.target.value)
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
