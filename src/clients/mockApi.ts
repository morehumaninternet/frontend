export type IssuePostBody = {
  site: string
  title: string
}

export type Issue = IssuePostBody & {
  id: number
}

function demoIssuesLocalStorageKey(site: string, id: number) {
  return `demo-issues:${site}:${id}`
}

export async function postIssue(issuePostBody: IssuePostBody): Promise<Issue> {
  const mockGeneratedIssueNumber = 323
  const issue: Issue = { id: mockGeneratedIssueNumber, ...issuePostBody }
  localStorage.setItem(
    demoIssuesLocalStorageKey(issuePostBody.site, mockGeneratedIssueNumber),
    JSON.stringify(issue)
  )
  return issue
}

export async function getIssueBySiteAndId(site: string, id: number): Promise<null | Issue> {
  try {
    const issueJson = localStorage.getItem(demoIssuesLocalStorageKey(site, id))
    if (!issueJson) return null
    return JSON.parse(issueJson)
  } catch (err) {
    return null
  }
}
