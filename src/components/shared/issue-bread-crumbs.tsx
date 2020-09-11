import React from 'react'

const IssueBreadcrumbs = ({ site, issueId, iconSrc = '/goalco.ico' }: { site: string; issueId?: number; iconSrc?: string }): JSX.Element => {
  return (
    <div className="issue-breadcrumbs">
      <img src={iconSrc} /> {site} / Issues {issueId && `/ ${issueId}`}
    </div>
  )
}

export default IssueBreadcrumbs
