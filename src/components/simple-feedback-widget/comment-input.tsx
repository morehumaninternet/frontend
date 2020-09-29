// tslint:disable:no-expression-statement
import React from 'react'

type CommentInputProps = {
  updateFeedback(feedback: string): void
}

function insideDiv(html: string): string {
  if (!html) return ''

  const match = html.match(/^<div>(.*)<\/div>$/)

  if (!match) {
    console.error(html)
    throw new Error('trix should always wrap its contents in a div and the toolbar is exposed')
  }

  return match[1]
}

export default function CommentInput({ updateFeedback }: CommentInputProps): JSX.Element {
  const ref: React.MutableRefObject<HTMLDivElement> = React.useRef() as any

  React.useEffect(() => {
    const editorElement = ref.current!.querySelector('trix-editor') as any

    editorElement.addEventListener('trix-change', (event: { target: { value: string } }) => {
      updateFeedback(insideDiv(event.target.value))
    })
  }, [])

  return (
    <div
      ref={ref as any}
      className="more-human-internet-widget-editor-issue-body-input"
      dangerouslySetInnerHTML={{ __html: `<trix-editor placeholder="Your feedback..."></trix-editor>` }}
    />
  )
}
