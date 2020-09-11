import React from 'react'

import { HandIcon, CommentIcon } from '../issue-page/overview/action-icons'

type KanbanCardProps = {
  issue: Issue
}

const KanbanCard: React.FC<KanbanCardProps> = ({ issue }) => {
  return (
    <div className="kanban-card">
      <div className="kanban-card-description">{issue.title}</div>
      <div className="kanban-card-info">
        {/* TODO - change the "clicked" logic */}
        <HandIcon clicked={issue.aggregates.upvotes.count % 3 === 0} />
        <div className="kanban-card-upvotes">{issue.aggregates.upvotes.count}</div>
        {/* TODO - change the "commented" logic */}
        <CommentIcon commented={issue.aggregates.comments.count === 10} />
        <div className="kanban-card-comments">{issue.aggregates.comments.count}</div>
      </div>
    </div>
  )
}

export default KanbanCard
