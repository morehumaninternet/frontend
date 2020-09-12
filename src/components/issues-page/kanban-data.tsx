import React from 'react'

import { Avatar } from '@material-ui/core'

type KanbanDataProps = {
  maintainer: User
  setSortBy: React.Dispatch<React.SetStateAction<SortIssuesOn>>
}

const KanbanData: React.FC<KanbanDataProps> = ({ maintainer, setSortBy }) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault() // tslint:disable-line:no-expression-statement
    setSortBy(e.target.value as SortIssuesOn) // tslint:disable-line:no-expression-statement
  }

  return (
    <div className="kanban-data">
      <div className="kanban-data__avatar">
        <Avatar src={maintainer.avatarUrl} />
        <div className="kanban-data__avatar-name">
          Maintainer <br />
          <strong>{maintainer.username}</strong>
        </div>
      </div>
      <div className="kanban-data__sort">
        <span>Sort order </span>
        <select name="sort-issues" id="sort-issues" onChange={onChange}>
          <option value="Upvotes">Upvotes</option>
          <option value="Comments">Comments</option>
          <option value="Recent">Recent</option>
        </select>
      </div>
    </div>
  )
}

export default KanbanData
