import { FixedObject } from 'gatsby-image'

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

type Action<T extends string> = { type: T }
type ActionWithPayload<T extends string, P extends object> = Action<T> & { payload: P }
type ActionWithError<T extends string> = Action<T> & { error: { message: string } }

type ChangeStatusInitiate = ActionWithPayload<'CHANGE_STATUS_INITIATE', { user: User; status: IssueStatus; comment: { html: string } }>
type PostCommentInitiate = ActionWithPayload<'POST_COMMENT_INITIATE', { user: User; comment: { html: string } }>

type IssuePageAction =
  | ActionWithPayload<'PAGE_LOAD', { search: string }>
  | ActionWithPayload<'CURRENT_USER_LOAD_SUCCESS', { user: User }>
  | ActionWithError<'CURRENT_USER_LOAD_ERROR'>
  | ActionWithPayload<'INITIAL_ISSUE_LOAD_SUCCESS', { issue: Issue }>
  | ActionWithError<'INITIAL_ISSUE_LOAD_ERROR'>
  | ChangeStatusInitiate
  | Action<'CHANGE_STATUS_SUCCESS'>
  | ActionWithError<'CHANGE_STATUS_ERROR'>
  | PostCommentInitiate
  | Action<'POST_COMMENT_SUCCESS'>
  | ActionWithError<'POST_COMMENT_ERROR'>
  | Action<'DISMISS_ERROR'>

type IssueParamsChecking = { state: 'checking' }
type IssueParamsNotOk = { state: 'not ok'; error: string }
type IssueParamsOk = {
  state: 'ok'
  params: { site: string; issueId: number }
}

type IssueParams = IssueParamsChecking | IssueParamsNotOk | IssueParamsOk

type IssueStateLoading = { loading: true; issue?: undefined }
type IssueStateLoaded = { loading: false; issue: Maybe<Issue> }
type IssueState = IssueStateLoading | IssueStateLoaded

type IssueActionInProgress = { priorState: IssuePageState; action: ChangeStatusInitiate | PostCommentInitiate }

type IssuePageState = {
  params: IssueParams
  currentUser: CurrentUser
  issueState: IssueState
  actionInProgress: null | IssueActionInProgress
  error: null | { message: string }
}

type IssuePostBody = {
  id?: number
  user?: User
  site: string
  title: string
  initialCommentHtml: string
  aggregates?: IssueAggregates
  status?: IssueStatus
}

type PostIssueInitiate = Action<'POST_ISSUE_INITIATE'>
type SimilarIssuesSearchInitiate = Action<'SIMILAR_ISSUES_SEARCH_INITIATE'>

type WidgetAction =
  | Action<'OPEN_WIDGET'>
  | Action<'CLOSE_WIDGET'>
  | Action<'CLICK_IS_NEW_ISSUE'>
  | ActionWithPayload<'UPDATE_ISSUE_TITLE', { title: string }>
  | ActionWithPayload<'UPDATE_ISSUE_COMMENT_HTML', { html: string }>
  | SimilarIssuesSearchInitiate
  | ActionWithPayload<'SIMILAR_ISSUES_SEARCH_SUCCESS', { similarIssues: readonly Issue[] }>
  | ActionWithError<'SIMILAR_ISSUES_SEARCH_ERROR'>
  | PostIssueInitiate
  | ActionWithPayload<'POST_ISSUE_SUCCESS', { issue: Issue }>
  | ActionWithError<'POST_ISSUE_ERROR'>

type WidgetActionInProgress = { priorState: WidgetState; action: PostIssueInitiate | SimilarIssuesSearchInitiate }

type WidgetState = {
  open: boolean
  editingIssue: {
    title: string
    commentHtml: string
  }
  isNewIssue: boolean
  similarIssues: readonly Issue[]
  postedIssue: null | Issue
  actionInProgress: null | WidgetActionInProgress
  error: null | { message: string }
}

type TeamMember = {
  name: string
  title: string
  background_color: string
  background_shape: 'square' | 'circle'
  fixed: FixedObject | undefined
}
