import React from 'react'

export default function IssueActionButtons({
  aggregates,
}: {
  aggregates: Issue['aggregates']
}): JSX.Element {
  return (
    <div className="issue-action-buttons">
      <button>Share</button>
      <button>Feel</button>
      <button>Talk</button>
    </div>
  )
}
