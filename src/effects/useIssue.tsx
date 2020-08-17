import React from 'react'
import * as mockApi from '../clients/mockApi'


export type IssueStateLoading = { loading: true }
export type IssueStateLoaded = { loading: false, issue: Maybe<Issue> }
export type IssueState =  IssueStateLoading | IssueStateLoaded

export type UseIssueDependencies = {
  params: { site: string, issueId: number },
  api: typeof mockApi
}

export type UseIssueReturn = {
  issueState: IssueState
  postComment(user: User, comment: { html: string }): Promise<void>
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

    const nextTimeline = issue.timeline.concat([{
      verb: 'comment',
      by: user, // TODO: store user state somewhere?
      timestamp: new Date(),
      comment
    }])

    const nextIssue = {
      ...issue,
      timeline: nextTimeline
    }

    setIssueState({ loading: false, issue: nextIssue })

    return api.postComment(issue.site, issue.id, user, comment)
  }

  return {
    issueState,
    postComment,
  }
}
