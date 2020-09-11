import React from 'react'

const IssueBreadcrumbs = ({ site, issueId }: { site: string; issueId?: number }): JSX.Element => {
  return (
    <div>
      <div className="issue-breadcrumbs">
        <img src="/goalco.ico" /> {site} / Issues {issueId && `/ ${issueId}`}
      </div>
      <div></div>
    </div>
  )
}

export default IssueBreadcrumbs
