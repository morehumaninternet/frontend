import React from 'react'
import { cloneDeep } from 'lodash'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import KanbanColumn from './kanban-column'
import useCurrentUser from '../../effects/useCurrentUser'
import { changeStatus } from '../../clients/mockApi'

type MutableFilteredIssues = {
  // tslint:disable-next-line: readonly-array
  [status in IssueStatus]: Issue[]
}

type KanbanBoardProps = {
  siteData: SiteData
  setSiteData: React.Dispatch<React.SetStateAction<SiteData | null>>
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ siteData, setSiteData }) => {
  const currentUser = useCurrentUser()

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    // Check if the user dragged the item outside of any draggable zone
    if (!destination) {
      return
    }

    // Check if the user dragged the item back to the same spot
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    if (!currentUser.loaded) {
      throw new Error(`Cannot update an issue with a nonexistent user`)
    }

    const sourceStatus = source.droppableId as IssueStatus
    const destinationStatus = destination.droppableId as IssueStatus
    const issue: Issue = siteData.issues[sourceStatus][source.index]

    if (sourceStatus !== destinationStatus) {
      // tslint:disable-next-line: no-expression-statement
      changeStatus({
        site: issue.site,
        id: issue.id,
        user: currentUser.user,
        status: destinationStatus,
        comment: { html: `<div>Changed status from ${sourceStatus} to ${destinationStatus}</div>` },
      })
    }

    const newIssues = cloneDeep(siteData.issues) as MutableFilteredIssues

    // Removing the issue from the source column and inserting it to the destination column
    // tslint:disable:no-expression-statement
    newIssues[sourceStatus].splice(source.index, 1)
    newIssues[destinationStatus].splice(destination.index, 0, issue)
    setSiteData({
      ...siteData,
      issues: newIssues,
    })
    // tslint:enable:no-expression-statement
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        <KanbanColumn title="opened" issues={siteData.issues.opened} />
        <KanbanColumn title="acknowledged" issues={siteData.issues.acknowledged} />
        <KanbanColumn title="closed" issues={siteData.issues.closed} />
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard
