import React from 'react'

export default function IssueActionButtons({
  aggregates,
}: {
  aggregates: Issue['aggregates']
}): JSX.Element {
  return (
    <div className="issue-action-buttons">
      <div className="issue-action-buttons__item">
        <button>
          <img src="/flag-icon.svg" alt="Flag" />
        </button>
      </div>
      <div className="issue-action-buttons__item">
        <button>
          <img src="/share-icon.svg" alt="Share" />
        </button>
      </div>
      <div className="issue-action-buttons__item">
        <button>
          <img src="/hand-icon.svg" alt="+1" />
        </button>
        <p>{aggregates.upvotes.count}</p>
      </div>
      <div className="issue-action-buttons__item">
        <button>
          <img src="/comment-icon.svg" alt="Comment" />
        </button>
        <p>{aggregates.comments.count}</p>
      </div>
    </div>
  )
}
