/* Can probably be made generic if/when this is a good idea */
import React from 'react'

export type IssueParamsChecking = { state: 'checking' }
export type IssueParamsNotOk = { state: 'not ok'; error: string }
export type IssueParamsOk = {
  state: 'ok'
  params: { site: string; issueId: number }
}
export type IssueParams = IssueParamsChecking | IssueParamsNotOk | IssueParamsOk

export default function useIssueParams(props: { location: Location }): IssueParams {
  const [issueParams, setIssueParams] = React.useState<IssueParams>({
    state: 'checking',
  })

  // tslint:disable-next-line:no-expression-statement
  React.useEffect(() => {
    const params = new URLSearchParams(props.location.search)

    const site = params.get('site')
    if (!site) {
      return setIssueParams({
        state: 'not ok',
        error: 'query param `site` is required',
      })
    }

    const issueId = parseInt(params.get('id')!, 10)
    if (!issueId) {
      return setIssueParams({
        state: 'not ok',
        error: 'query param `issueId`, an integer, is required',
      })
    }

    return setIssueParams({ state: 'ok', params: { site, issueId } })
  }, [props.location.search])

  return issueParams
}
