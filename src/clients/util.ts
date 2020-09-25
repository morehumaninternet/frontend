// TODO: typecheck, perhaps rely on a library
export function issueFromJson(issueJson: string): Issue {
  const issue = JSON.parse(issueJson)

  issue.initialReport.timestamp = new Date(issue.initialReport.timestamp) // tslint:disable-line:no-expression-statement
  for (const activity of issue.timeline) {
    activity.timestamp = new Date(activity.timestamp) // tslint:disable-line:no-expression-statement
  }
  return issue
}

export function createIssue(opts: Partial<IssuePostBody> = {}): Issue {
  const site = opts.site || defaultSite
  const id = opts.id || randomId(site)
  const user = opts.user || {
    username: 'sillywalks',
    avatarUrl: 'https://github.com/will-weiss.png?size=71',
  }
  const title = opts.title || "Checkout isn't working"
  const status = opts.status || 'opened'
  const aggregates = opts.aggregates || {
    upvotes: { count: 1 },
    comments: { count: 1 },
  }

  const commentHtml = opts.initialCommentHtml || defaultCommentHtml

  const now = new Date()

  return {
    id,
    title,
    site,
    status,
    initialReport: {
      by: user,
      timestamp: now,
    },
    aggregates,
    timeline: [
      {
        verb: 'change status',
        by: user,
        timestamp: now,
        status: 'opened',
      },
      {
        verb: 'comment',
        by: user,
        timestamp: now,
        comment: { html: commentHtml },
      },
    ],
  }
}
