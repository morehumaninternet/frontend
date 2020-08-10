import React from 'react'
import * as mockApi from '../clients/mockApi'


export type IssueState =
  | { loading: true }
  | {
      loading: false,
      issue: { id: number, site: string, title: string, initialCommentBody: string }
    }


export default function useIssue(
  props: { location: { search: string } },
  api: typeof mockApi
): { issueState: IssueState } {

  const [issueState, setIssueState] = React.useState<IssueState>({ loading: true })

  React.useEffect(() => {

    const params = new URLSearchParams(props.location.search)

    const site = params.get('site')

    if (!site) throw new Error('site required in query params')
    const issueId = parseInt(params.get('id')!)

    if (!issueId) throw new Error('issueId integer required in query params')

    api.getIssueBySiteAndId(site, issueId).then(issue => {
      setIssueState({
        loading: false,
        issue: {
          id: issueId,
          site: site,
          title: issue!.title,
          initialCommentBody: issue!.initialCommentBody,
        }
      })
    })
  }, [props.location.search])

  return {
    issueState
  }
}
