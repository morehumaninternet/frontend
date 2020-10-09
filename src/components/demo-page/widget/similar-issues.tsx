import React from 'react'
// @ts-ignore
import { LocalizedLink } from 'gatsby-theme-i18n'
import { issueHref } from '../../../utils/href'

export type SimilarIssuesState = {
  searching: boolean
  similarIssues: ReadonlyArray<Issue>
}

type SimilarIssuesProps = {
  similarIssuesState: SimilarIssuesState
  anyIssueTitle: boolean
  issueTitleLongEnoughToSubmit: boolean
  issueTitleLongEnoughToSearchFor: boolean
}

declare var Shepherd: any

function SimilarIssueLink({ issue }: { issue: Issue }): JSX.Element {
  // The links shouldn't go anywhere if there's a tour
  const props = Shepherd.activeTour ? {} : { to: issueHref(issue) }
  return (
    <LocalizedLink className="more-human-internet-similar-issue-link" {...props}>
      {issue.title}
    </LocalizedLink>
  )
}

export default function SimilarIssues({
  similarIssuesState,
  anyIssueTitle,
  issueTitleLongEnoughToSubmit,
  issueTitleLongEnoughToSearchFor,
}: SimilarIssuesProps): JSX.Element {
  return (
    <div className="more-human-internet-similar-issues">
      {similarIssuesState.searching ? (
        <p>Looking for similar issues...</p>
      ) : similarIssuesState.similarIssues.length ? (
        <>
          <p>Similar Issues</p>
          <div className="more-human-internet-similar-issue-links">
            {similarIssuesState.similarIssues.map(issue => (
              <SimilarIssueLink key={issue.id} issue={issue} />
            ))}
          </div>
        </>
      ) : (
        issueTitleLongEnoughToSearchFor && <p>No similar issues found</p>
      )}
      {anyIssueTitle &&
        !issueTitleLongEnoughToSubmit &&
        (similarIssuesState.similarIssues.length ? (
          <p>Please choose from among the similar issues or specify your issue in more detail to post it</p>
        ) : (
          <p>Please specify your issue in more detail to post it</p>
        ))}
    </div>
  )
}
