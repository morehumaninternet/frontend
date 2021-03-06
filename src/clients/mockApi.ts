// tslint:disable:no-expression-statement
import { cloneDeep, escapeRegExp } from 'lodash'
import { issueFromJson, createIssue, defaultSite, randomId, localStorageKeyPrefix, demoIssuesLocalStorageKey } from './util'
import delay from '../utils/delay'

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
    const issues = await searchIssues({ site })
    return {
      site,
      maintainer: {
        avatarUrl: '/devdiva.png',
        username: 'devdiva22',
      },
      issues: {
        opened: issues.filter(issue => issue.status === 'opened'),
        acknowledged: issues.filter(issue => issue.status === 'acknowledged'),
        closed: issues.filter(issue => issue.status === 'closed'),
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

  const nextAggregates = cloneDeep(issue.aggregates)
  nextAggregates.comments.count += 1

  const nextIssue: Issue = {
    ...issue,
    aggregates: nextAggregates,
    status,
    timeline: nextTimeline,
  }

  return setInLocalStorage(nextIssue)
}

function* siteIssuesInLocalStorage(site: string): Generator<Issue> {
  const localStorageSitePrefix = `${localStorageKeyPrefix}:${site}`
  for (const key in localStorage) {
    if (key.startsWith(localStorageSitePrefix)) {
      yield issueFromJson(localStorage.getItem(key)!)
    }
  }
}

export async function searchIssues({ site, title }: { site: string; title?: string }): Promise<ReadonlyArray<Issue>> {
  const escapedTitle = escapeRegExp(title)
  const search = new RegExp(escapedTitle || '.*', 'i')
  const onDemoPage = location.pathname.includes('demo')
  const matches: Issue[] = [] // tslint:disable-line:readonly-array

  for (const issue of siteIssuesInLocalStorage(site)) {
    const titleLower = issue.title.toLowerCase()
    // Ignore issues titled "supersuit" on the demo page or any default issues that got added
    if (onDemoPage && (titleLower.includes('supersuit') || titleLower === "checkout isn't working")) continue
    // Ignore issues that have the exact same title
    if (matches.some(match => match.title === issue.title)) continue
    if (search.test(issue.title)) {
      matches.push(issue)
      if (onDemoPage && matches.length >= 5) break
    }
  }

  return matches
}

function setDefaultIssues(): void {
  if (typeof window === 'undefined') return

  const IssuesData: ReadonlyArray<Partial<IssuePostBody>> = [
    {
      id: 500,
      status: 'opened',
      title: "Checking out isn't working when I try to buy the jetpack",
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
      status: 'opened',
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
      status: 'opened',
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
      status: 'acknowledged',
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
      status: 'acknowledged',
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
      status: 'closed',
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
      status: 'closed',
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
      status: 'closed',
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
    {
      id: 508,
      status: 'opened',
      title: "I tried to checkout to buy the moondust, but it didn't accept my card",
      aggregates: {
        upvotes: {
          count: 29,
        },
        comments: {
          count: 4,
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
