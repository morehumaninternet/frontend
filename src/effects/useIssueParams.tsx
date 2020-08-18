/* Can probably be made generic if/when this is a good idea */
import React from 'react'


export type IssueParams =
 | { state: 'checking' }
 | { state: 'not ok', error: string }
 | { state: 'ok', params: { site: string, issueId: number } }

export default function useIssueParams(props: { location: { search: string } }): IssueParams {

  const [issueParams, setIssueParams] = React.useState<IssueParams>({ state: 'checking' })

  React.useEffect(() => {

    const params = new URLSearchParams(props.location.search)

    const site = params.get('site')
    if (!site) {
      return setIssueParams({ state: 'not ok', error: 'query param `site` is required' })
    }

    const issueId = parseInt(params.get('id')!)
    if (!issueId) {
      return setIssueParams({ state: 'not ok', error: 'query param `issueId`, an integer, is required' })
    }

    return setIssueParams({ state: 'ok', params: { site, issueId } })

  }, [props.location.search])

  return issueParams
}
