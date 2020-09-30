import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import KanbanCard from './kanban-card'

type KanbanColumnProps = {
  title: IssueStatus
  issues: readonly Issue[]
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, issues }) => {
  return (
    <div id={`col-${title}`} className="kanban__col">
      <div className={`kanban-title ${title}`}>
        {title} ({issues.length})
      </div>
      <Droppable droppableId={title}>
        {provided => (
          <div className="kanban-card-list" {...provided.droppableProps} ref={provided.innerRef}>
            {issues.map((issue, index) => (
              <KanbanCard id={`card-${issue.id}`} key={issue.id} index={index} issue={issue} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default KanbanColumn
