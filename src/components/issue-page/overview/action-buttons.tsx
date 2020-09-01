import React from "react"

export default function IssueActionButtons({
  aggregates,
}: {
  aggregates: Issue["aggregates"]
}): JSX.Element {
  return (
    <div className="issue-action-buttons">
      <img
        className="issue-action-buttons__item"
        src="/flag-icon.svg"
        alt="Flag"
      />
      <img
        className="issue-action-buttons__item"
        src="/share-icon.svg"
        alt="Share"
      />
      <img
        className="issue-action-buttons__item"
        src="/hand-icon.svg"
        alt="+1"
      />
      <img
        className="issue-action-buttons__item"
        src="/comment-icon.svg"
        alt="Comment"
      />
    </div>
  )
}
