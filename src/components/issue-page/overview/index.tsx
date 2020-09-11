import React from 'react'
import IssueStatusBadge from '../status-badge'
import IssueActionButtons from './action-buttons'
import IssueBreadcrumbs from '../../shared/issue-bread-crumbs'

export default function IssueOverview({ issue }: { issue: Issue }): JSX.Element {
  return (
    <div className="issue-overview">
      <div className="issue-metadata">
        <IssueBreadcrumbs site={issue.site} issueId={issue.id} />
        <div className="issue-title-row">
          <IssueStatusBadge status={issue.status} />
          <h2>{issue.title}</h2>
          <IssueActionButtons aggregates={issue.aggregates} />
        </div>
      </div>
    </div>
  )
}
