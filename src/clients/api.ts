import algoliasearch from 'algoliasearch'
import { createIssue } from './util'

import { issueFromJson } from './util'

if (!process.env.GATSBY_ALGOLIA_APP_ID || !process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY || !process.env.GATSBY_ALGOLIA_INDEX_NAME) {
  throw new Error(
    'Some environment variables are missing. The required variables are GATSBY_ALGOLIA_APP_ID, GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY and GATSBY_ALGOLIA_INDEX_NAME'
  )
}

const client = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY)
const index = client.initIndex(process.env.GATSBY_ALGOLIA_INDEX_NAME)

export async function searchIssues({ site, title }: { site: string; title?: string }): Promise<ReadonlyArray<Issue>> {
  const result = await index.search(title, { filters: `site:"${site}"` })
  const issues = result.hits.map(hit => {
    const { objectID, ...rest } = hit
    // Algolia uses 'objectID' as the record ID
    return issueFromJson(JSON.stringify({ id: objectID, ...rest }))
  })

  return issues
}

export async function postIssue(issuePostBody: IssuePostBody): Promise<Issue> {
  const issue = createIssue(issuePostBody)

  // Algolia uses 'objectID' as the record ID
  const { id, ...rest } = issue
  const algoliaObj = { objectID: id, ...rest }
  const algoliaData = JSON.stringify(algoliaObj)

  // tslint:disable-next-line: no-expression-statement
  await fetch('/api/postIssue', {
    method: 'POST',
    body: algoliaData,
  })

  return issue
}
