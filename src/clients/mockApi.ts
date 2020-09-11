import delay from '../utils/delay'

// tslint:disable:no-expression-statement
export type IssuePostBody = {
  id?: number
  user?: User
  site: string
  title: string
  initialCommentHtml: string
  aggregates?: IssueAggregates
  status?: IssueStatus
}

export const defaultSite = 'goalco.com'

const localStorageKeyPrefix = 'demo-issues'

function demoIssuesLocalStorageKey(site: string, id: number): string {
  return `${localStorageKeyPrefix}:${site}:${id}`
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
  const status = opts.status || 'Opened'
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
    status: status,
    initialReport: {
      by: user,
      timestamp: now,
    },
    aggregates: aggregates,
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
        comment: { html: commentHtml },
      },
    ],
  }
}

function getInLocalStorage(site: string, id: number): null | Issue {
  const issueJson = localStorage.getItem(demoIssuesLocalStorageKey(site, id))
  return issueJson ? issueFromJson(issueJson) : null
}

function setInLocalStorage(issue: Issue): Issue {
  localStorage.setItem(demoIssuesLocalStorageKey(issue.site, issue.id), JSON.stringify(issue))
  return issue
}

export async function postIssue(issuePostBody: IssuePostBody): Promise<Issue> {
  await delay(1000)
  return setInLocalStorage(createIssue(issuePostBody))
}

export async function getSiteData(site: string): Promise<SiteData | null> {
  try {
    const issues = await searchIssues(site)
    return {
      site: defaultSite,
      maintainer: {
        avatarUrl: '/devdiva.png',
        username: 'devdiva22',
      },
      issues: {
        opened: issues.filter(issue => issue.status === 'Opened'),
        acknowledged: issues.filter(issue => issue.status === 'Acknowledged'),
        closed: issues.filter(issue => issue.status === 'Closed'),
      },
    }
  } catch (err) {
    return null
  }
}

export async function getIssueBySiteAndId(site: string, id: number): Promise<null | Issue> {
  try {
    return getInLocalStorage(site, id) || createIssue({ id, site })
  } catch (err) {
    return null
  }
}

export async function postComment({ site, id, user, comment }: { site: string; id: number; user: User; comment: { html: string } }): Promise<any> {
  const issue = (await getIssueBySiteAndId(site, id))!

  const nextTimeline: IssueTimeline = issue.timeline.concat([
    {
      verb: 'comment',
      by: user,
      timestamp: new Date(),
      comment,
    },
  ])

  const nextIssue: Issue = {
    ...issue,
    aggregates: {
      ...issue.aggregates,
      comments: {
        count: issue.aggregates.comments.count + 1,
      },
    },
    timeline: nextTimeline,
  }

  return setInLocalStorage(nextIssue)
}

export async function changeStatus({
  site,
  id,
  user,
  status,
  comment,
}: {
  site: string
  id: number
  user: User
  status: IssueStatus
  comment: { html: string }
}): Promise<any> {
  const issue = (await getIssueBySiteAndId(site, id))!

  const now = new Date()

  const nextTimeline: IssueTimeline = issue.timeline.concat([
    {
      verb: 'comment',
      by: user,
      timestamp: now,
      comment,
    },
    {
      verb: 'change status',
      by: user, // TODO: store user state somewhere?
      timestamp: now,
      status,
    },
  ])

  const nextIssue: Issue = {
    ...issue,
    status,
    timeline: nextTimeline,
  }

  return setInLocalStorage(nextIssue)
}

export async function searchIssues(site: string, title?: string): Promise<ReadonlyArray<Issue>> {
  const localStorageSitePrefix = `${localStorageKeyPrefix}:${site}`
  const search = new RegExp(title || '.*', 'i')
  const matches: Issue[] = [] // tslint:disable-line:readonly-array
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(localStorageSitePrefix)) {
      const issue = issueFromJson(localStorage.getItem(key)!)
      if (search.test(issue.title)) {
        matches.push(issue)
      }
    }
  })
  return matches
}

function setDefaultIssues(): void {
  if (typeof window === 'undefined') return

  const IssuesData: ReadonlyArray<Partial<IssuePostBody>> = [
    {
      id: 500,
      status: 'Opened',
      title: "Checking isn't working",
      aggregates: {
        upvotes: {
          count: 26,
        },
        comments: {
          count: 10,
        },
      },
    },
    {
      id: 501,
      status: 'Opened',
      title: "Your FAQ page talks about being able to customize the suit but I don't see how I can do that",
      aggregates: {
        upvotes: {
          count: 18,
        },
        comments: {
          count: 12,
        },
      },
    },
    {
      id: 502,
      status: 'Opened',
      title: 'Privacy is key. Can you turn off the auto post to facebook?',
      aggregates: {
        upvotes: {
          count: 2,
        },
        comments: {
          count: 2,
        },
      },
    },
    {
      id: 503,
      status: 'Acknowledged',
      title: "The site doesn't work on mobile and it keeps crashing the browser",
      aggregates: {
        upvotes: {
          count: 22,
        },
        comments: {
          count: 8,
        },
      },
    },
    {
      id: 504,
      status: 'Acknowledged',
      title: "I want to sync my other devices to the suit but I'm unable to get the goalibulator to work correctly",
      aggregates: {
        upvotes: {
          count: 2,
        },
        comments: {
          count: 2,
        },
      },
    },
    {
      id: 505,
      status: 'Closed',
      title: 'I keep getting a 401 error but when I reload the page it works fine.',
      aggregates: {
        upvotes: {
          count: 21,
        },
        comments: {
          count: 17,
        },
      },
    },
    {
      id: 506,
      status: 'Closed',
      title: "The Apple Pay feature doesn't function for some reason.",
      aggregates: {
        upvotes: {
          count: 19,
        },
        comments: {
          count: 10,
        },
      },
    },
    {
      id: 507,
      status: 'Closed',
      title: "The cart doesn't show anything after I tried adding the suit to my cart.",
      aggregates: {
        upvotes: {
          count: 2,
        },
        comments: {
          count: 2,
        },
      },
    },
  ]

  IssuesData.map(issueData => {
    const site = issueData.site || defaultSite
    const id = issueData.id || randomId(site)
    if (!getInLocalStorage(site, id)) {
      setInLocalStorage(createIssue(issueData))
    }
  })
}

setDefaultIssues()
