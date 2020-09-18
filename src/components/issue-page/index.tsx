// tslint:disable:no-expression-statement
import React from 'react'
import IssueMetadata from './overview'
import IssueTimelineView, { IssueTimelineViewProps } from './timeline'
import { useTour, withNextButton } from '../../effects/useTour'

export type LoadedIssueContentProps = {
  avatarUrl?: string
  issue: Issue
  postComment: IssueTimelineViewProps['postComment']
  changeStatus(user: User, status: IssueStatus, comment: { html: string }): Promise<void>
}

function useDemo(issue: Issue, postComment: LoadedIssueContentProps['postComment'], changeStatus: LoadedIssueContentProps['changeStatus']): void {
  if (issue.status === 'acknowledged') {
    setTimeout(() => {
      changeStatus({ username: 'devdiva', avatarUrl: '/devdiva.png' }, 'closed', {
        html: `<div id="diva-fixed">Deployed a fix that seems to be fixing the issue. Definitely leave a comment and reopen this issue if you're still being affected!</div>`,
      })
    }, 2000)
  }
}

export default function LoadedIssueContent({ avatarUrl, issue, postComment, changeStatus }: LoadedIssueContentProps): JSX.Element {
  useDemo(issue, postComment, changeStatus)

  const steps = Object.freeze([
    {
      text: ['The issue is now posted to the more human internet platform where the site’s maintainer can see and address it.'],
      attachTo: {
        element: '.issue-timeline',
        on: 'top',
      },
      ...withNextButton,
    },
    {
      beforeShowPromise(): Promise<any> {
        return changeStatus({ username: 'devdiva', avatarUrl: '/devdiva.png' }, 'acknowledged', {
          html: `<div id="diva-acknowledged">I am able to reproduce this on our end, sorry about that! We'll get working on a fix right away</div>`,
        })
      },
      text: ['Looks like Devdiva22 was online and quickly addressed the issue in near real-time.'],
      attachTo: {
        element: '#diva-acknowledged',
        on: 'top',
      },
      ...withNextButton,
    },
    {
      text: ['Devdiva22 reports the problem is now fixed. Customer will be able to successfully checkout.'],
      attachTo: {
        element: '#diva-fixed',
        on: 'top',
      },
    }
  ])
  const tour = useTour({ steps: steps })

  return (
    <div className="issue-body">
      <IssueMetadata issue={issue} />
      <IssueTimelineView avatarUrl={avatarUrl} timeline={issue.timeline} postComment={postComment} />
    </div>
  )
}
