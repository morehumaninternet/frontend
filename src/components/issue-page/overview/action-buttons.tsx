import React from 'react'
import { FlagIcon, ShareIcon, HandIcon, CommentIcon } from './action-icons'

export default function IssueActionButtons({ aggregates }: { aggregates: Issue['aggregates'] }): JSX.Element {
  return (
    <div className="issue-action-buttons">
      <div className="issue-action-buttons__item">
        <button aria-label="upvote">
          <HandIcon clicked={true} />
        </button>
        <p>{aggregates.upvotes.count}</p>
      </div>
      <div className="issue-action-buttons__item">
        <button aria-label="comment">
          <CommentIcon commented={true} />
        </button>
        <p>{aggregates.comments.count}</p>
      </div>
      <div className="issue-action-buttons__item">
        <button aria-label="share">
          <ShareIcon />
        </button>
      </div>
      <div className="issue-action-buttons__item">
        <button aria-label="flag">
          <FlagIcon />
        </button>
      </div>
    </div>
  )
}
