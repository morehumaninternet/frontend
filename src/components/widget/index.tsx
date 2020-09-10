import React from 'react'
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import WidgetIcon from './icon'
import TitleInput from './title-input'
import CommentInput from './comment-input'
import SimilarIssues from './similar-issues'
import ButtonGroup from './button-group'
import useWidgetState, { WidgetProps } from './useWidgetState'
import hasParent from '../../utils/hasParent'

export default (props: WidgetProps) => {
  const ref = React.useRef<HTMLDivElement>()
  const {
    open,
    setOpen,
    submitting,
    postAsNewIssue,
    setPostAsNewIssue,
    setIssueTitle,
    setIssueInitialCommentHtml,
    similarIssuesState,
    postIssue,
    anyIssueTitle,
    issueTitleLongEnoughToSubmit,
    issueTitleLongEnoughToSearchFor,
    reasonCantPostAsNewIssue,
  } = useWidgetState(props)

  React.useEffect(() => {
    function listener(event: MouseEvent) {
      if (
        !hasParent(event.target as any, ref.current!) &&
        !hasParent(event.target as any, '.shepherd-content')
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('click', listener)

    return () => document.removeEventListener('click', listener)
  })

  return (
    <div
      className="more-human-internet-widget-boundary"
      ref={ref as any}
      onClick={() => !open && setOpen(true)}
    >
      <div
        className={`more-human-internet-widget-container ${
          open
            ? 'more-human-internet-widget-container-open'
            : 'more-human-internet-widget-container-closed'
        }`}
      >
        <WidgetIcon open={open} />
        {/* <IconButton onClick={() => setOpen(false)}>
          <Close />
        </IconButton> */}
        {open && (
          <div className="more-human-internet-widget-editor-container">
            <div className="more-human-internet-widget-editor">
              {submitting ? (
                <div className="submitting">
                  Submitting issue...
                  <br />
                  You will be redirected shortly
                </div>
              ) : (
                <>
                  <TitleInput setIssueTitle={setIssueTitle} />
                  {postAsNewIssue ? (
                    <CommentInput
                      setIssueInitialCommentHtml={setIssueInitialCommentHtml}
                    />
                  ) : (
                    <SimilarIssues
                      anyIssueTitle={anyIssueTitle}
                      issueTitleLongEnoughToSubmit={
                        issueTitleLongEnoughToSubmit
                      }
                      issueTitleLongEnoughToSearchFor={
                        issueTitleLongEnoughToSearchFor
                      }
                      similarIssuesState={similarIssuesState}
                    />
                  )}
                </>
              )}
            </div>
            {!submitting && (
              <ButtonGroup
                postAsNewIssue={postAsNewIssue}
                reasonCantPostAsNewIssue={reasonCantPostAsNewIssue}
                postIssue={postIssue}
                setPostAsNewIssue={setPostAsNewIssue}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
