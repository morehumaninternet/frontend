export type IssuePostBody = {
  site: string
  title: string
  initialCommentBody: string
}

function demoIssuesLocalStorageKey(site: string, id: number) {
  return `demo-issues:${site}:${id}`
}

// TODO: typecheck, perhaps rely on a library
function issueFromJson(issueJson: string): Issue {
  const issue = JSON.parse(issueJson)

  issue.initialReport.timestamp = new Date(issue.initialReport.timestamp)
  for (const activity of issue.timeline) {
    activity.timestamp = new Date(activity.timestamp)
  }
  return issue
}

export async function postIssue(issuePostBody: IssuePostBody): Promise<Issue> {
  const mockGeneratedIssueNumber = 323
  const mockUser: User = { username: 'sillywalks' }

  const now = new Date()

  const issue: Issue = {
    id: mockGeneratedIssueNumber,
    title: issuePostBody.title,
    site: issuePostBody.site,
    status: 'Opened',
    initialReport: {
      by: mockUser,
      timestamp: now,
    },
    aggregates: {
      upvotes: {
        count: 1
      },
      comments: {
        count: 1
      },
    },
    timeline: [
      {
        verb: 'change status',
        by: mockUser,
        timestamp: now,
        status: 'Opened',
      },
      {
        verb: 'comment',
        by: mockUser,
        timestamp: now,
        comment: {
          html: issuePostBody.initialCommentBody,
        }
      }
    ]
  }

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
    return issueFromJson(issueJson)
  } catch (err) {
    return null
  }
}
