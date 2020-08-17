import React from 'react'
import IssueStatusBadge from '../status-badge'
import IssueTimestampText from './timestamp-text'
import { Avatar } from '@material-ui/core'


function IssueActivityChangeStatusRow({ activity }: { activity: IssueActivityChangeStatus }): JSX.Element {
  return (
    <div className="issue-activity change-status">
      <IssueStatusBadge status={activity.status} />
      <IssueTimestampText className="timestamp-text" activity={activity} />
    </div>
  )
}

function IssueActivityCommentRow({ activity }: { activity: IssueActivityComment }): JSX.Element {
  return (
    <div className="issue-activity comment">
      <Avatar src="https://github.com/will-weiss.png?size=71"/>
      <div className="comment-bubble">
        <IssueTimestampText className="comment-by" activity={activity} />
        <div className="comment-body">
          <div dangerouslySetInnerHTML={{ __html: activity.comment.html }} />
        </div>
      </div>
    </div>
  )
}

export default function IssueActivityRow({ activity }: { activity: IssueActivity }): JSX.Element {
  switch (activity.verb) {
    case 'change status': return <IssueActivityChangeStatusRow activity={activity} />
    case 'comment': return <IssueActivityCommentRow activity={activity} />
    default: throw new Error(`Unknown activity verb: ${(activity as any).verb}`)
  }
}
