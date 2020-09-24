import algoliasearch from 'algoliasearch'
import { createIssue } from './mockApi' // TODO - move this function to somewhere outside mockApi

import { issueFromJson } from './util'

// TODO - do something if they are not defined
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_ONLY_API_KEY)
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)

export async function searchIssues({ site, title }: { site: string; title?: string }): Promise<ReadonlyArray<Issue>> {
  const result = await index.search(title, { filters: `site:"${site}"` })
  const issues = result.hits.map(hit => {
    const { objectID, ...rest } = hit
    return issueFromJson(JSON.stringify({ id: objectID, ...rest })) // TODO - remove access attributes from rest
  })

  return issues
}

export async function postIssue(issuePostBody: IssuePostBody): Promise<Issue> {
  const issue = createIssue(issuePostBody)
  const issueStr = JSON.stringify(issue)

  // tslint:disable-next-line: no-expression-statement
  await fetch('/api/postIssue', {
    method: 'POST',
    body: issueStr,
  }) // TODO - do we want to handle any errors here?

  return issue
}
