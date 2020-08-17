import React from 'react'
import WidgetIcon from './icon'
import Editor from './editor'
import ButtonGroup from './button-group'
import hasParent from '../../utils/hasParent'


type WidgetProps = {
  postIssue(widgetFormValues: { title: string, initialCommentHtml: string }): Promise<void>
}


export default ({ postIssue }: WidgetProps) => {
  const widgetRef = React.useRef<HTMLDivElement>()

  const [open, setOpen] = React.useState(false)
  const [issueTitle, setIssueTitle] = React.useState('')
  const [issueInitialCommentHtml, setIssueInitialCommentHtml] = React.useState('')

  React.useEffect(() => {
    function listener(event: MouseEvent) {
      if (!hasParent(event.target as any, widgetRef.current!)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', listener)

    return () => document.removeEventListener('click', listener)
  })

  return (
    <div
      className="more-human-internet-widget-boundary"
      ref={widgetRef as any}
    >
      <div
        className={`more-human-internet-widget-container ${open ? 'more-human-internet-widget-container-open' : 'more-human-internet-widget-container-closed'}`}
        onClick={() => !open && setOpen(true)}
        // aria-role ?
      >
        <WidgetIcon open={open} />
        <form
          className="more-human-internet-widget-editor-container"
          onSubmit={async event => {
            event.preventDefault()
            await postIssue({ title: issueTitle, initialCommentHtml: issueInitialCommentHtml })
          }}
        >
          <Editor
            setIssueTitle={setIssueTitle}
            setIssueInitialCommentHtml={setIssueInitialCommentHtml}
          />
          <ButtonGroup />
        </form>
      </div>
    </div>
  )
}
