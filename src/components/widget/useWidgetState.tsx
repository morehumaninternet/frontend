// tslint:disable:no-expression-statement
import React from 'react'
import { SimilarIssuesState } from './similar-issues'
import debounceDefer from '../../utils/debounceDefer'
import useCurrentUser from '../../effects/useCurrentUser'
import { issueHref } from '../../utils/href'

export type WidgetProps = {
  tour: any
  siteOrigin: string
  navigate: (href: string) => void
  api: {
    postIssue(issue: {
      id?: number
      user?: User
      site: string
      title: string
      initialCommentHtml: string
      aggregates?: IssueAggregates
      status?: IssueStatus
    }): Promise<Issue>
    searchIssues(opts: { site: string; title?: string }): Promise<ReadonlyArray<Issue>>
  }
}

export type WidgetState = {
  open: boolean
  setOpen(open: boolean): void
  submitting: boolean
  postAsNewIssue: boolean
  setPostAsNewIssue(postAsNewIssue: boolean): void
  issueTitle: string
  setIssueTitle(issueTitle: string): void
  setIssueInitialCommentHtml(issueInitialCommentHtml: string): void
  similarIssuesState: SimilarIssuesState
  postIssue(): any
  anyIssueTitle: boolean
  issueTitleLongEnoughToSubmit: boolean
  issueTitleLongEnoughToSearchFor: boolean
  reasonCantPostAsNewIssue: null | string
}

export default function useWidgetState({ siteOrigin, api, navigate }: WidgetProps): WidgetState {
  const searchIssues = debounceDefer(api.searchIssues, 200)

  const [open, setOpen] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [postAsNewIssue, setPostAsNewIssue] = React.useState(false)
  const [issueTitle, setIssueTitle] = React.useState('')
  const [issueInitialCommentHtml, setIssueInitialCommentHtml] = React.useState('')
  const [similarIssuesState, setSimilarIssuesState] = React.useState<SimilarIssuesState>({ searching: false, similarIssues: [] })

  const anyIssueTitle = issueTitle.length > 0
  const issueTitleLongEnoughToSearchFor = issueTitle.length > 5
  const issueTitleLongEnoughToSubmit = issueTitle.length > 9

  const reasonCantPostAsNewIssue = similarIssuesState.searching
    ? 'Searching for similar issues'
    : !issueTitleLongEnoughToSubmit
    ? 'Issue title must be longer'
    : similarIssuesState.similarIssues.length > 3
    ? 'Too many similar issues, please refine the title'
    : null
  const currentUser = useCurrentUser()

  const postIssue = async () => {
    if (!currentUser.loaded) {
      throw new Error(`Cannot post an issue for a nonexistent user`)
    }

    setSubmitting(true)

    const issue = await api.postIssue({
      site: siteOrigin,
      title: issueTitle,
      user: currentUser.user,
      initialCommentHtml: issueInitialCommentHtml,
    })

    navigate(issueHref(issue))
  }

  React.useEffect(() => {
    setPostAsNewIssue(false)
    if (issueTitleLongEnoughToSearchFor) {
      setSimilarIssuesState({ searching: true, similarIssues: [] })
      searchIssues({ site: siteOrigin, title: issueTitle }).then(similarIssues =>
        setSimilarIssuesState({
          searching: false,
          similarIssues,
        })
      )
    } else {
      setSimilarIssuesState({
        searching: false,
        similarIssues: [],
      })
    }
  }, [issueTitle])

  return {
    open: open || submitting, // If submitting, keep the widget open
    setOpen,
    submitting,
    postAsNewIssue,
    setPostAsNewIssue,
    issueTitle,
    setIssueTitle,
    setIssueInitialCommentHtml,
    similarIssuesState,
    postIssue,
    anyIssueTitle,
    issueTitleLongEnoughToSubmit,
    issueTitleLongEnoughToSearchFor,
    reasonCantPostAsNewIssue,
  }
}
