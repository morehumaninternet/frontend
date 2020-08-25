import React from 'react'
import WidgetIcon from './icon'
import TitleInput from './title-input'
import CommentInput from './comment-input'
import SimilarIssues from './similar-issues'

import debounceDefer from '../../utils/debounceDefer'

import * as mockApi from '../../clients/mockApi'
import useCurrentUser from '../../effects/useCurrentUser'
import onClickaway from '../../effects/onClickaway'



const searchIssues = debounceDefer(mockApi.searchIssues, 200)


type SimilarIssueSelection =
  | { selection: null }
  | { selection: true, issue: Issue }
  | { selection: false }

export default ({ navigate }: { navigate: (href: string) => void }) => {
  const ref = React.useRef<HTMLDivElement>()

  const [open, setOpen] = React.useState(false)
  const [matchingIssue, setMatchingIssue] = React.useState<SimilarIssueSelection>({ selection: null })
  const [similarIssues, setSimilarIssues] = React.useState([])
  const [issueTitle, setIssueTitle] = React.useState('')
  const [issueInitialCommentHtml, setIssueInitialCommentHtml] = React.useState('')

  const currentUser = useCurrentUser()

  const postIssue = async () => {
    if (!currentUser.loaded) {
      throw new Error(`Cannot post an issue for a nonexistent user`)
    }

    const issue = await mockApi.postIssue({
      site: 'goalco.com',
      title: issueTitle,
      user: currentUser.user,
      initialCommentHtml: issueInitialCommentHtml,
    })

    navigate(`/issue?site=${issue.site}&id=${issue.id}`)
  }

  function onIssueTitleUpdate(nextIssueTitle: string) {
    setIssueTitle(nextIssueTitle)
    if (nextIssueTitle.length > 5) {
      searchIssues(nextIssueTitle).then(setSimilarIssues)
    } else {
      setSimilarIssues([])
    }
  }

  onClickaway(ref, () => setOpen(false))

  return (
    <div
      className="more-human-internet-widget-boundary"
      ref={ref as any}
    >
      <div
        className={`more-human-internet-widget-container ${open ? 'more-human-internet-widget-container-open' : 'more-human-internet-widget-container-closed'}`}
        onClick={() => !open && setOpen(true)}
      >
        <WidgetIcon open={open} />
        {open && (
          <div className="more-human-internet-widget-editor-container">
            <div className="more-human-internet-widget-editor">
              <TitleInput onIssueTitleUpdate={onIssueTitleUpdate} />
              {matchingIssue.selection == null ? (
                <CommentInput setIssueInitialCommentHtml={setIssueInitialCommentHtml} />
              ) : (similarIssues.length ? (
                <SimilarIssues
                  similarIssues={similarIssues}
                />
              ) : null)}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
