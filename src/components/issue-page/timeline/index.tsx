import React from 'react'
import IssueAddComment, { IssueAddCommentProps } from './add-comment'
import IssueActivityRow from './activity-row'



export type IssueTimelineViewProps = {
  timeline: IssueTimeline
  postComment: IssueAddCommentProps['postComment']
}


export default function IssueTimelineView({ timeline, postComment }: IssueTimelineViewProps): JSX.Element {
  return (
    <div className="issue-timeline">
      {timeline.map((activity, i) => (
        <IssueActivityRow key={i} activity={activity} />
      ))}
      <IssueAddComment postComment={postComment} />
    </div>
  )
}
