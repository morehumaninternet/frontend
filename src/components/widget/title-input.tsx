import React from 'react'


function insideDiv(html: string): string {
  const match = html.match(/^<div>(.*)<\/div>$/)

  if (!match) {
    console.error(html)
    throw new Error('trix should always wrap its contents in a div and the toolbar is exposed')
  }

  return match[1]
}

export default function TitleInput({ onIssueTitleUpdate }: { onIssueTitleUpdate(issueTitle: string): void }): JSX.Element {
  const ref = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    const editorElement = ref.current!.querySelector('trix-editor') as any
    editorElement.addEventListener('trix-change', (event: { target: { value: string } }) => {
      onIssueTitleUpdate(insideDiv(event.target.value))
    })
  }, [])

  return (
    <div
      ref={ref as any}
      className="more-human-internet-widget-editor-issue-title-input"
      dangerouslySetInnerHTML={{ __html: `<trix-editor placeholder="What is your issue?"></trix-editor>` }}
    />
  )
}
