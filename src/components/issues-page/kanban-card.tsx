import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { HandIcon, CommentIcon } from '../issue-page/overview/action-icons'

type KanbanCardProps = {
  id: string
  issue: Issue
  index: number
}

const KanbanCard: React.FC<KanbanCardProps> = ({ id, index, issue }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div id={id} className="kanban-card" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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
      )}
    </Draggable>
  )
}

export default KanbanCard
