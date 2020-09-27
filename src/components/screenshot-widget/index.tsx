import React from 'react'
import WidgetIcon from './icon'
import TitleInput from './title-input'
import CommentInput from './comment-input'
import SimilarIssues from './similar-issues'
import ButtonGroup from './button-group'
import useWidgetState, { WidgetProps } from './useWidgetState'
import hasParent from '../../utils/hasParent'

export default (props: WidgetProps): JSX.Element => {
  const { tour } = props

  if (tour) {
    throw new Error('Not supported')
  }

  const ref = React.useRef<HTMLDivElement>()
  const {
    open,
    setOpen,
    submitting,
    postAsNewIssue,
    setPostAsNewIssue,
    issueTitle,
    setIssueTitle,
    setIssueInitialCommentHtml,
    similarIssuesState,
    postIssue,
    anyIssueTitle,
    issueTitleLongEnoughToSubmit,
    issueTitleLongEnoughToSearchFor,
    reasonCantPostAsNewIssue,
  } = useWidgetState(props)

  // // tslint:disable:no-expression-statement
  // React.useEffect(() => {
  //   function listener(event: MouseEvent): void {
  //     if (!hasParent(event.target as any, ref.current!) && !hasParent(event.target as any, '.shepherd-content')) {
  //       setOpen(false) // tslint:disable-line:no-expression-statement
  //     }
  //   }

  //   document.addEventListener('click', listener) // tslint:disable-line:no-expression-statement

  //   return () => document.removeEventListener('click', listener)
  // })

  return (
    <div className="more-human-internet-widget-boundary" ref={ref as any} onClick={() => !open && setOpen(true)}>
      <div
        className={`more-human-internet-widget-container ${open ? 'more-human-internet-widget-container-open' : 'more-human-internet-widget-container-closed'}`}
      >
        <WidgetIcon open={open} />
        <div className="more-human-internet-widget-editor-container" style={{ display: open ? undefined : 'none' }}>
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
                  <CommentInput setIssueInitialCommentHtml={setIssueInitialCommentHtml} />
                ) : (
                  <SimilarIssues
                    anyIssueTitle={anyIssueTitle}
                    issueTitleLongEnoughToSubmit={issueTitleLongEnoughToSubmit}
                    issueTitleLongEnoughToSearchFor={issueTitleLongEnoughToSearchFor}
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
              postIssue={() => {
                if (tour) {
                  tour.cancel() // tslint:disable-line:no-expression-statement
                }
                return postIssue()
              }}
              setPostAsNewIssue={setPostAsNewIssue}
            />
          )}
        </div>
      </div>
    </div>
  )
}
