import React from 'react'


function IssueChangeStatusView({ activity }: { activity: IssueActivityChangeStatus }): JSX.Element {
  return (
    <div>

    </div>
  )
}

function IssueCommentView({ activity }: { activity: IssueActivityComment }): JSX.Element {
  return (
    <div>

    </div>
  )
}

function IssueActivityView({ activity }: { activity: IssueActivity }): JSX.Element {
  switch (activity.verb) {
    case 'change status': return <IssueChangeStatusView activity={activity} />
    case 'comment': return <IssueCommentView activity={activity} />
    default: throw new Error(`Unknown activity verb: ${(activity as any).verb}`)
  }
}

export default function IssueTimelineView({ timeline }: { timeline: IssueTimeline }): JSX.Element {
  return (
    <>
      {timeline.map((activity, i) => (
        <IssueActivityView key={i} activity={activity} />
      ))}
    </>
  )
}
