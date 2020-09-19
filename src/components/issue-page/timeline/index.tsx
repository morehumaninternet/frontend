import React from 'react'
import IssueAddComment, { IssueAddCommentProps } from './add-comment'
import IssueActivityRow from './activity-row'

export type IssueTimelineViewProps = {
  avatarUrl?: string
  timeline: IssueTimeline
  actionInProgress: boolean
  postComment: IssueAddCommentProps['postComment']
}

export default function IssueTimelineView({ avatarUrl, timeline, actionInProgress, postComment }: IssueTimelineViewProps): JSX.Element {
  return (
    <div className="issue-timeline">
      {timeline.map((activity, i) => (
        <IssueActivityRow key={i} activity={activity} />
      ))}
      <IssueAddComment avatarUrl={avatarUrl} actionInProgress={actionInProgress} postComment={postComment} />
    </div>
  )
}
