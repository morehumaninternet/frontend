import React from 'react'
import WidgetIcon from './icon'
import Editor from './editor'

import debounceDefer from '../../utils/debounceDefer'
import hasParent from '../../utils/hasParent'
import * as mockApi from '../../clients/mockApi'


type WidgetProps = {
  postIssue(widgetFormValues: { title: string, initialCommentHtml: string }): Promise<void>
}

const searchIssues = debounceDefer(mockApi.searchIssues, 200)

export default ({ postIssue }: WidgetProps) => {
  const widgetRef = React.useRef<HTMLDivElement>()

  const [open, setOpen] = React.useState(false)
  const [noSimilarIssues, setNoSimilarIssues] = React.useState(false)
  const [similarIssues, setSimilarIssues] = React.useState([])
  const [issueTitle, setIssueTitle] = React.useState('')
  const [issueInitialCommentHtml, setIssueInitialCommentHtml] = React.useState('')

  function onIssueTitleUpdate(nextIssueTitle: string) {
    setIssueTitle(nextIssueTitle)
    searchIssues(nextIssueTitle).then(setSimilarIssues)
  }

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
            setIssueTitle={onIssueTitleUpdate}
            setIssueInitialCommentHtml={setIssueInitialCommentHtml}
            similarIssues={similarIssues}
            noSimilarIssues={noSimilarIssues}
            confirmNoSimilarIssues={() => setNoSimilarIssues(true)}
          />
        </form>
      </div>
    </div>
  )
}
