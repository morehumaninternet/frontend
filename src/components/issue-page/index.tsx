import React from 'react'
import IssueMetadata from './overview'
import IssueTimelineView, { IssueTimelineViewProps } from './timeline'

export type LoadedIssueContentProps = {
  avatarUrl?: string
  issue: Issue
  postComment: IssueTimelineViewProps['postComment']
  changeStatus(user: User, status: IssueStatus, comment: { html: string }): Promise<void>
}

function useDemo(issue: Issue, postComment: LoadedIssueContentProps['postComment'], changeStatus: LoadedIssueContentProps['changeStatus']) {
  if (issue.status === 'Opened') {
    setTimeout(() => {
      changeStatus({ username: 'devdiva', avatarUrl: '/devdiva.png' }, 'Acknowledged', {
        html: `<div>I am able to reproduce this on our end, sorry about that! We'll get working on a fix right away</div>`,
      })
    }, 3000)
  }

  if (issue.status === 'Acknowledged') {
    setTimeout(() => {
      changeStatus({ username: 'devdiva', avatarUrl: '/devdiva.png' }, 'Closed', {
        html: `<div>Deployed a fix that seems to be fixing the issue. Definitely leave a comment and reopen this issue if you're still being affected!</div>`,
      })
    }, 6000)
  }
}

export default function LoadedIssueContent({ avatarUrl, issue, postComment, changeStatus }: LoadedIssueContentProps): JSX.Element {
  useDemo(issue, postComment, changeStatus)

  return (
    <div className="issue-body">
      <IssueMetadata issue={issue} />
      <IssueTimelineView avatarUrl={avatarUrl} timeline={issue.timeline} postComment={postComment} />
    </div>
  )
}
