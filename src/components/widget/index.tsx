import React from 'react'
import WidgetIcon from './icon'
import TitleInput from './title-input'
import CommentInput from './comment-input'
import SimilarIssues from './similar-issues'
import ButtonGroup from './button-group'
import useWidgetState, { WidgetProps } from './useWidgetState'
import onClickaway from '../../effects/onClickaway'

export default (props: WidgetProps) => {
  const ref = React.useRef<HTMLDivElement>()
  const {
    open,
    setOpen,
    postAsNewIssue,
    setPostAsNewIssue,
    setIssueTitle,
    setIssueInitialCommentHtml,
    similarIssuesState,
    postIssue,
    issueTitleLongEnoughToSearchFor,
    reasonCantPostAsNewIssue,
  } = useWidgetState(props)
  onClickaway(ref, () => setOpen(false))

  return (
    <div className="more-human-internet-widget-boundary" ref={ref as any}>
      <div
        className={`more-human-internet-widget-container ${open ? 'more-human-internet-widget-container-open' : 'more-human-internet-widget-container-closed'}`}
        onClick={() => !open && setOpen(true)}
      >
        <WidgetIcon open={open} />
        {open && (
          <div className="more-human-internet-widget-editor-container">
            <div className="more-human-internet-widget-editor">
              <TitleInput setIssueTitle={setIssueTitle} />
              {postAsNewIssue ? (
                <CommentInput setIssueInitialCommentHtml={setIssueInitialCommentHtml} />
              ) : (
                <SimilarIssues issueTitleLongEnoughToSearchFor={issueTitleLongEnoughToSearchFor} similarIssuesState={similarIssuesState} />
              )}
            </div>
            <ButtonGroup
              postAsNewIssue={postAsNewIssue}
              postIssue={postIssue}
              reasonCantPostAsNewIssue={reasonCantPostAsNewIssue}
              setPostAsNewIssue={setPostAsNewIssue}
            />
          </div>
        )}
      </div>
    </div>
  )
}
