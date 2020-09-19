// tslint:disable:no-expression-statement
import React from 'react'
import IssueMetadata from './overview'
import IssueTimelineView, { IssueTimelineViewProps } from './timeline'

export type LoadedIssueContentProps = {
  avatarUrl?: string
  issue: Issue
  actionInProgress: boolean
  postComment: IssueTimelineViewProps['postComment']
  changeStatus(user: User, status: IssueStatus, comment: { html: string }): void
}

export default function LoadedIssueContent({ avatarUrl, issue, actionInProgress, postComment, changeStatus }: LoadedIssueContentProps): JSX.Element {
  return (
    <div className="issue-body">
      <IssueMetadata issue={issue} />
      <IssueTimelineView avatarUrl={avatarUrl} actionInProgress={actionInProgress} timeline={issue.timeline} postComment={postComment} />
    </div>
  )
}
