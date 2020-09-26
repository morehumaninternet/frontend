const defaultSite = 'goalco.com'
const localStorageKeyPrefix = 'demo-issues'

const defaultCommentHtml = `
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

function demoIssuesLocalStorageKey(site: string, id: number): string {
  return `${localStorageKeyPrefix}:${site}:${id}`
}

// TODO: typecheck, perhaps rely on a library
function issueFromJson(issueJson: string): Issue {
  const issue = JSON.parse(issueJson)

  issue.initialReport.timestamp = new Date(issue.initialReport.timestamp) // tslint:disable-line:no-expression-statement
  for (const activity of issue.timeline) {
    activity.timestamp = new Date(activity.timestamp) // tslint:disable-line:no-expression-statement
  }
  return issue
}

function randomId(site: string): number {
  const keys = Object.keys(localStorage)
  const idSpace = Math.max(1000, keys.length * 2)
  while (true) {
    const id = 1 + Math.floor(idSpace * Math.random())
    const key = demoIssuesLocalStorageKey(site, id)
    if (!localStorage.getItem(key)) {
      return id
    }
  }
}

function createIssue(opts: Partial<IssuePostBody> = {}): Issue {
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

export { defaultSite, localStorageKeyPrefix, demoIssuesLocalStorageKey, issueFromJson, randomId, createIssue }
