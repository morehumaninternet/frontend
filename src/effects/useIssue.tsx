import React from 'react'
import * as mockApi from '../clients/mockApi'


export type IssueStateLoading = { loading: true }
export type IssueStateLoaded = { loading: false, issue: Maybe<Issue> }
export type IssueState = IssueStateLoading | IssueStateLoaded

export type UseIssueDependencies = {
  params: { site: string, issueId: number },
  api: typeof mockApi
}

export type UseIssueReturn = {
  issueState: IssueState
  postComment(user: User, comment: { html: string }): Promise<void>
  changeStatus(user: User, status: IssueStatus): Promise<void>
}

export default function useIssue({ params, api }: UseIssueDependencies): UseIssueReturn {
  const [issueState, setIssueState] = React.useState<IssueState>({ loading: true })

  React.useEffect(() => {
    api.getIssueBySiteAndId(params.site, params.issueId).then(issue => {
      setIssueState({ loading: false, issue })
    })
  }, [params.site, params.issueId])

  function postComment(user: User, comment: { html: string }) {
    if (issueState.loading) {
      throw new Error('Posting comments while the issue is loading should not be possible')
    }
    const { issue } = issueState

    if (!issue) {
      throw new Error('Posting comments for a nonexistent issue should not be possible')
    }

    const nextTimeline: IssueTimeline = issue.timeline.concat([{
      verb: 'comment',
      by: user, // TODO: store user state somewhere?
      timestamp: new Date(),
      comment
    }])

    const nextIssue: Issue = {
      ...issue,
      aggregates: {
        ...issue.aggregates,
        comments: {
          count: issue.aggregates.comments.count + 1,
        }
      },
      timeline: nextTimeline
    }

    setIssueState({ loading: false, issue: nextIssue })

    return api.postComment(issue.site, issue.id, user, comment)
  }

  function changeStatus(user: User, status: IssueStatus) {
    if (issueState.loading) {
      throw new Error('Posting comments while the issue is loading should not be possible')
    }
    const { issue } = issueState

    if (!issue) {
      throw new Error('Posting comments for a nonexistent issue should not be possible')
    }

    const nextTimeline: IssueTimeline = issue.timeline.concat([{
      verb: 'change status',
      by: user, // TODO: store user state somewhere?
      timestamp: new Date(),
      status
    }])

    const nextIssue: Issue = {
      ...issue,
      status,
      timeline: nextTimeline
    }

    setIssueState({ loading: false, issue: nextIssue })

    return api.changeStatus(issue.site, issue.id, user, status)
  }

  return {
    issueState,
    postComment,
    changeStatus,
  }
}
