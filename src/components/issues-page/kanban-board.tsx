import React from 'react'

import KanbanColumn from './kanban-column'

type KanbanBoardProps = {
  [k in IssueStatus]: readonly Issue[]
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ opened, acknowledged, closed }) => {
  return (
    <div className="kanban">
      <KanbanColumn title="opened" issues={opened} />
      <KanbanColumn title="acknowledged" issues={acknowledged} />
      <KanbanColumn title="closed" issues={closed} />
    </div>
  )
}

export default KanbanBoard
