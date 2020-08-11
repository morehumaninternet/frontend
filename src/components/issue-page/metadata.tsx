import React from 'react'
import IssueStatusBadge from './status-badge'


function IssueBreadcrumbs({ site, issueId }: { site: string, issueId: number }): JSX.Element {
  return (
    <div className="issue-breadcrumbs">
      <img src="/goalco.ico" /> {site} / Issues / {issueId}
    </div>
  )
}


export default function IssueMetadata({ issue }: { issue: Issue }): JSX.Element {
  return (
    <div className="issue-metadata">
      <div>
        <IssueBreadcrumbs site={issue.site} issueId={issue.id} />
        <h1>{issue.title}</h1>
        <IssueStatusBadge status={issue.status} />
      </div>
      <div className="issue-action-buttons">
        <button>Share</button>
        <button>Feel</button>
        <button>Talk</button>
      </div>
    </div>
  )
}
