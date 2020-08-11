import React from 'react'
import IssueMetadata from './metadata'
import IssueTimelineView from './timeline'


export default function LoadedIssueContent({ issue }: { issue: Issue }): JSX.Element {
  return (<div className="issue-body">
    <IssueMetadata issue={issue} />
    <IssueTimelineView timeline={issue.timeline} />
    </div>
  )
}