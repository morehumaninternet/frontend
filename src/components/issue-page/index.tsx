import React from 'react'
import IssueMetadata from './overview'
import IssueTimelineView, { IssueTimelineViewProps } from './timeline'


export type LoadedIssueContentProps = {
  issue: Issue
  postComment: IssueTimelineViewProps['postComment']
}

export default function LoadedIssueContent({ issue, postComment }: LoadedIssueContentProps): JSX.Element {
  return (
    <div className="issue-body">
      <IssueMetadata issue={issue} />
      <IssueTimelineView timeline={issue.timeline} postComment={postComment} />
    </div>
  )
}