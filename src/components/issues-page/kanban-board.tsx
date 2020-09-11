import React from 'react'

import KanbanColumn from './kanban-column'

type KanbanBoardProps = {
  openedIssues: readonly Issue[]
  acknowledgedIssues: readonly Issue[]
  closedIssues: readonly Issue[]
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ openedIssues, acknowledgedIssues, closedIssues }) => {
  return (
    <div className="kanban">
      <KanbanColumn title="Opened" issues={openedIssues} />
      <KanbanColumn title="Acknowledged" issues={acknowledgedIssues} />
      <KanbanColumn title="Closed" issues={closedIssues} />
    </div>
  )
}

export default KanbanBoard
