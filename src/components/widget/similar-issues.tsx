import React from 'react'


type SimilarIssuesProps = {
  similarIssues: Issue[]
  noMatchingIssue(): void
  yesMatchingIssue(issue: Issue): void
}


export default function SimilarIssues({ similarIssues, noMatchingIssue, yesMatchingIssue }: SimilarIssuesProps): JSX.Element {
  return (
    <p>Similar Issues</p>
  )
}
