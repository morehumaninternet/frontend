import React from 'react'
import IssueStatusBadge from './status-badge'
import { Avatar } from '@material-ui/core'


function IssueTimestampText({ className, activity }: { className: string, activity: IssueActivity }): JSX.Element {
  const verb = activity.verb === 'comment' ? 'commented ' : ''

  return (
    <div className={className}>
      <strong>{activity.by.username}</strong> {verb}on {activity.timestamp.toDateString()}
    </div>
  )
}

function IssueActivityChangeStatusView({ activity }: { activity: IssueActivityChangeStatus }): JSX.Element {
  return (
    <div className="issue-activity change-status">
      <IssueStatusBadge status={activity.status} />
      <IssueTimestampText className="timestamp-text" activity={activity} />
    </div>
  )
}

function IssueActivityCommentView({ activity }: { activity: IssueActivityComment }): JSX.Element {
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

function IssueActivityView({ activity }: { activity: IssueActivity }): JSX.Element {
  switch (activity.verb) {
    case 'change status': return <IssueActivityChangeStatusView activity={activity} />
    case 'comment': return <IssueActivityCommentView activity={activity} />
    default: throw new Error(`Unknown activity verb: ${(activity as any).verb}`)
  }
}

function IssueAddComment(): JSX.Element {
  const ref: React.MutableRefObject<HTMLDivElement> = React.useRef() as any

  return (
    <div className="issue-add-comment">
      <Avatar src="https://github.com/will-weiss.png?size=71"/>
      <div
        className="issue-add-comment-editor"
        ref={ref}
        dangerouslySetInnerHTML={{ __html: `<trix-editor></trix-editor>` }}
      />
    </div>
  )
}

export default function IssueTimelineView({ timeline }: { timeline: IssueTimeline }): JSX.Element {
  return (
    <div className="issue-timeline">
      {timeline.map((activity, i) => (
        <IssueActivityView key={i} activity={activity} />
      ))}
      <IssueAddComment />
    </div>
  )
}
