import React from 'react'
import IssueStatusBadge from './status-badge'


function IssueBreadcrumbs({ site, issueId }: { site: string, issueId: number }): JSX.Element {
  return (
    <div className="issue-breadcrumbs">
      <img src="/goalco.ico" /> {site} / Issues / {issueId}
    </div>
  )
}

function IssueActionButtons(): JSX.Element {
  return (
    <div className="issue-action-buttons">
      <button>Share</button>
      <button>Feel</button>
      <button>Talk</button>
    </div>
  )
}

export default function IssueMetadata({ issue }: { issue: Issue }): JSX.Element {
  return (
    <div className="issue-overview">
      <div className="issue-metadata">
        <IssueBreadcrumbs site={issue.site} issueId={issue.id} />
        <div className="issue-title-row">
          <IssueStatusBadge status={issue.status} />
          <h2>{issue.title}</h2>
        </div>
      </div>
      <IssueActionButtons />
    </div>
  )
}
