import React from 'react'

import KanbanCard from './kanban-card'

type KanbanColumnProps = {
  title: IssueStatus
  issues: readonly Issue[]
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, issues }) => {
  return (
    <div className="kanban__col">
      <div className={`kanban-title ${title}`}>
        {title} ({issues.length})
      </div>
      <div className="kanban-card-list">
        {issues.map((issue, index) => (
          <KanbanCard key={index} issue={issue} />
        ))}
      </div>
    </div>
  )
}

export default KanbanColumn
