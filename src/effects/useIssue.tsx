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
  postComment(comment: { html: string }): Promise<void>
}

export default function useIssue({ params, api }: UseIssueDependencies): UseIssueReturn {
  const [issueState, setIssueState] = React.useState<IssueState>({ loading: true })

  React.useEffect(() => {
    api.getIssueBySiteAndId(params.site, params.issueId).then(issue => {
      setIssueState({ loading: false, issue })
    })
  }, [params.site, params.issueId])

  async function postComment(comment: { html: string }) {
    console.log('ZZZ', comment)
    alert(`comment to be posted: ${comment.html}`)
  }

  return {
    issueState,
    postComment,
  }
}
