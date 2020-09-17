// tslint:disable:no-expression-statement
import React from 'react'

function insideDiv(html: string): string {
  if (!html) return ''

  const match = html.match(/^<div>(.*)<\/div>$/)

  if (!match) {
    console.error(html)
    throw new Error('trix should always wrap its contents in a div and the toolbar is exposed')
  }

  return match[1]
}

export default React.forwardRef(
  (props: { setIssueTitle(issueTitle: string): void }, ref: any): JSX.Element => {
    React.useEffect(() => {
      const editorElement = ref.current!.querySelector('trix-editor') as any
      editorElement.addEventListener('trix-change', (event: { target: { value: string } }) => {
        props.setIssueTitle(insideDiv(event.target.value))
      })
      editorElement.addEventListener('trix-focus', (event: any) => {
        console.log('trix-focus', event)
      })
    }, [])

    return (
      <div
        ref={ref as any}
        className="more-human-internet-widget-editor-issue-title-input"
        dangerouslySetInnerHTML={{
          __html: `<trix-editor placeholder="What is your issue?" autofocus></trix-editor>`,
        }}
      />
    )
  }
)
