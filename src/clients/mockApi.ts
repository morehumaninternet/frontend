export type IssuePostBody = {
  id?: number
  user?: User
  site: string
  title: string
  initialCommentHtml: string
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

export const defaultCommentHtml = `
  <strong>Steps</strong>
  <br>
  <ol>
    <li>I added the Goalco supersuit to my cart</li>
    <li>I entered in the credit card details for my American Express card</li>
    <li>I clicked the checkout button</li>
  </ol>

  <strong>Observations</strong>
  <br>
  <p>The spinner kept spinning endlessly</p>

  <strong>Expectations</strong>
  <br>
  <p>The order should have went through and I should have received a confirmation email</p>
`

function createIssue(opts: Partial<IssuePostBody> = {}): Issue {
  const id = opts.id || 323
  const user = opts.user || { username: 'sillywalks' }
  const title = opts.title || "Checkout isn't working"

  const commentHtml = opts.initialCommentHtml || defaultCommentHtml

  const now = new Date()

  return {
    id,
    title,
    site: opts.site || 'goalco.com',
    status: 'Opened',
    initialReport: {
      by: user,
      timestamp: now,
    },
    aggregates: {
      upvotes: { count: 1 },
      comments: { count: 1 },
    },
    timeline: [
      {
        verb: 'change status',
        by: user,
        timestamp: now,
        status: 'Opened',
      },
      {
        verb: 'comment',
        by: user,
        timestamp: now,
        comment: { html: commentHtml }
      }
    ]
  }
}

export async function postIssue(issuePostBody: IssuePostBody): Promise<Issue> {
  const issue = createIssue(issuePostBody)

  localStorage.setItem(
    demoIssuesLocalStorageKey(issuePostBody.site, issue.id),
    JSON.stringify(issue)
  )
  return issue
}

export async function getIssueBySiteAndId(site: string, id: number): Promise<null | Issue> {
  try {
    const issueJson = localStorage.getItem(demoIssuesLocalStorageKey(site, id))
    // If no issue is returned, just make one for the demo
    if (!issueJson) {
      return createIssue({ id, site })
    }
    return issueFromJson(issueJson)
  } catch (err) {
    return null
  }
}

export async function postComment(
  site: string,
  id: number,
  user: User,
  comment: { html: string }
): Promise<void> {
  const issue = (await getIssueBySiteAndId(site, id))!

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

  localStorage.setItem(
    demoIssuesLocalStorageKey(site, id),
    JSON.stringify(nextIssue)
  )
}
