import React from 'react'


export default function IssueTimestampText({ className, activity }: { className: string, activity: IssueActivity }): JSX.Element {
  const verb = activity.verb === 'comment' ? 'commented ' : ''

  return (
    <div className={className}>
      <strong>{activity.by.username}</strong> {verb}on {activity.timestamp.toDateString()}
    </div>
  )
}
