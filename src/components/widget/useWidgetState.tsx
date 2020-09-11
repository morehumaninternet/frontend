import React from 'react'
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl'
import { SimilarIssuesState } from './similar-issues'
import debounceDefer from '../../utils/debounceDefer'

import * as mockApi from '../../clients/mockApi'
import useCurrentUser from '../../effects/useCurrentUser'

const searchIssues = debounceDefer(mockApi.searchIssues, 200)

export type WidgetProps = { navigate: (href: string) => void }

export type WidgetState = {
  open: boolean
  setOpen(open: boolean): void
  submitting: boolean
  postAsNewIssue: boolean
  setPostAsNewIssue(postAsNewIssue: boolean): void
  setIssueTitle(issueTitle: string): void
  setIssueInitialCommentHtml(issueInitialCommentHtml: string): void
  similarIssuesState: SimilarIssuesState
  postIssue(): any
  anyIssueTitle: boolean
  issueTitleLongEnoughToSubmit: boolean
  issueTitleLongEnoughToSearchFor: boolean
  reasonCantPostAsNewIssue: null | string
}

export default function useWidgetState({ navigate }: WidgetProps): WidgetState {
  const intl = useIntl()
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

    const issue = await mockApi.postIssue({
      site: 'goalco.com',
      title: issueTitle,
      user: currentUser.user,
      initialCommentHtml: issueInitialCommentHtml,
    })

    navigate(`/${intl.locale}/issue?site=${issue.site}&id=${issue.id}`)
  }

  React.useEffect(() => {
    setPostAsNewIssue(false)
    if (issueTitleLongEnoughToSearchFor) {
      setSimilarIssuesState({ searching: true, similarIssues: [] })
      searchIssues(issueTitle).then(similarIssues =>
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
