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

function getTopSelectedRow(editorElement: any): null | { top: number, left: number, right: number } {
  const [selectionStart, selectionEnd] = editorElement.editor.getSelectedRange()

  if (selectionStart === selectionEnd) return null

  console.log('selection', selectionStart, selectionEnd)

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

  if (!startingRect) throw new Error('startingRect not found')
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


export default function Editor({ issueTitle, setIssueTitle }: EditorProps): JSX.Element {
  console.log('here')
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
      const toolbarElement = issueBodyRef.current!.querySelector('trix-toolbar') as any
      const topSelectedRow = getTopSelectedRow(editorElement)

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
