import React from 'react'
import IssueMetadata from './overview'
import IssueTimelineView, { IssueTimelineViewProps } from './timeline'


export type LoadedIssueContentProps = {
  avatarUrl?: string
  issue: Issue
  postComment: IssueTimelineViewProps['postComment']
}

export default function LoadedIssueContent({ avatarUrl, issue, postComment }: LoadedIssueContentProps): JSX.Element {
  return (
    <div className="issue-body">
      <IssueMetadata issue={issue} />
      <IssueTimelineView avatarUrl={avatarUrl} timeline={issue.timeline} postComment={postComment} />
    </div>
  )
}