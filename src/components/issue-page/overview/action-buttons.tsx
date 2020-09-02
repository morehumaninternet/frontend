import React from 'react'
import { FlagIcon, ShareIcon, HandIcon, CommentIcon } from './action-icons'

export default function IssueActionButtons({
  aggregates,
}: {
  aggregates: Issue['aggregates']
}): JSX.Element {
  return (
    <div className="issue-action-buttons">
      <div className="issue-action-buttons__item">
        <button>
          <FlagIcon />
        </button>
      </div>
      <div className="issue-action-buttons__item">
        <button>
          <ShareIcon />
        </button>
      </div>
      <div className="issue-action-buttons__item">
        <button>
          <HandIcon clicked={true} />
        </button>
        <p>{aggregates.upvotes.count}</p>
      </div>
      <div className="issue-action-buttons__item">
        <button>
          <CommentIcon />
        </button>
        <p>{aggregates.comments.count}</p>
      </div>
    </div>
  )
}
