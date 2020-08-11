import React from 'react'


export default function IssueStatusBadge({ status }: { status: IssueStatus }): JSX.Element {
  return <p>{status}</p>
}
