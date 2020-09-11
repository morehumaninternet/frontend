import React from 'react'

export default function IssueStatusBadge({ status }: { status: IssueStatus }): JSX.Element {
  return <div className={`issue-status-badge ${status}`}>{status}</div>
}
