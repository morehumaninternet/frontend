type Maybe<T> = null | undefined | T

type User = {
  username: string
  avatarUrl?: string
}

type CurrentUser = { loaded: false } | { loaded: true; user: User }

type IssueStatus = 'opened' | 'acknowledged' | 'closed'

type SortIssuesOn = 'Recent' | 'Upvotes' | 'Comments'

type IssueComment = {
  html: string
}

type IssueActivityOf<Verb, AdditionalData = {}> = AdditionalData & {
  verb: Verb
  by: User
  timestamp: Date
}

type IssueActivityChangeStatus = IssueActivityOf<'change status', { status: IssueStatus }>

type IssueActivityComment = IssueActivityOf<'comment', { comment: IssueComment }>

type IssueActivity = IssueActivityChangeStatus | IssueActivityComment

type IssueTimeline = ReadonlyArray<IssueActivity>

type IssueAggregates = {
  upvotes: {
    count: number
  }
  comments: {
    count: number
  }
}

type Issue = {
  id: number
  title: string
  site: string
  status: IssueStatus
  initialReport: {
    by: User
    timestamp: Date
  }
  aggregates: IssueAggregates
  timeline: IssueTimeline
}

type SiteData = {
  site: string
  maintainer: User
  issues: {
    [status in IssueStatus]: readonly Issue[]
  }
}
