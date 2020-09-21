import { issueFromJson } from './util'

export async function searchIssues({ site, title }: { site: string; title?: string }): Promise<ReadonlyArray<Issue>> {
  // const issue = issueFromJson(localStorage.getItem(key)!)
  throw new Error('Implement!')
}

export async function postIssue(issuePostBody: IssuePostBody): Promise<Issue> {
  throw new Error('Implement!')
}
