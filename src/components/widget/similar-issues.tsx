import React from 'react'
import { Link } from 'gatsby'
import { issueHref } from '../../utils/href'

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

function SimilarIssueLink({ issue }: { issue: Issue }): JSX.Element {
  return (
    <Link className="more-human-internet-similar-issue-link" to={issueHref(issue)}>
      {issue.title}
    </Link>
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
