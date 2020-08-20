import React from 'react'


type SimilarIssuesProps = {
  similarIssues: Issue[]
  noMatchingIssue(): void
  yesMatchingIssue(issue: Issue): void
}


export default function SimilarIssues({ similarIssues, noMatchingIssue, yesMatchingIssue }: SimilarIssuesProps): JSX.Element {
  console.log('similarssues', similarIssues)
  return (
    <div className="similar-issues">
      <p>Similar Issues</p>
      {similarIssues.map(similarIssue => (
        <div key={similarIssue.id} className="similar-issue">
          {similarIssue.title}
        </div>
      ))}
    </div>
  )
}
