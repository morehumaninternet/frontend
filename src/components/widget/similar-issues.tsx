import React from 'react'
import { Link } from 'gatsby'

export type SimilarIssuesState = { searching: true } | { searching: false; similarIssues: Issue[] }

type SimilarIssuesProps = {
  similarIssuesState: SimilarIssuesState
  issueTitleLongEnoughToSearchFor: boolean
}

function SimilarIssueLink({ issue }: { issue: Issue }): JSX.Element {
  return (
    <Link className="more-human-internet-similar-issue-link" to={`/issue?site=${issue.site}&id=${issue.id}`}>
      {issue.title}
    </Link>
  )
}

export default function SimilarIssues({ similarIssuesState, issueTitleLongEnoughToSearchFor }: SimilarIssuesProps): JSX.Element {
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
    </div>
  )
}
