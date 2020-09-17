import React, { useState, useEffect } from 'react'
import { sortBy } from 'lodash'
import { navigate } from 'gatsby'

import { LayoutWithSidebar } from '../components/shared/layout'
import useCurrentUser from '../effects/useCurrentUser'
import SEO from '../components/shared/seo'
import IssueBreadcrumbs from '../components/shared/issue-bread-crumbs'
import KanbanBoard from '../components/issues-page/kanban-board'
import { getSiteData } from '../clients/mockApi'
import KanbanData from '../components/issues-page/kanban-data'

const sortFns = {
  Recent: (issue: Issue) => -issue.initialReport.timestamp.getTime(),
  Upvotes: (issue: Issue) => -issue.aggregates.upvotes.count,
  Comments: (issue: Issue) => -issue.aggregates.comments.count,
}

const IssuesPage = (props: { location: Location }): JSX.Element => {
  const currentUser = useCurrentUser()

  const params = new URLSearchParams(props.location.search)
  if (!params.get('site')) {
    if (typeof window !== 'undefined') {
      return navigate('/404'), (<></>)
    }
  }

  const site: string = String(params.get('site'))

  const [siteData, setSiteData] = useState<SiteData | null>(null)

  const [sortOn, setSortOn] = useState<SortIssuesOn>('Upvotes')

  const sortIssues = (issues: readonly Issue[]) => sortBy(issues, sortFns[sortOn])

  // tslint:disable-next-line:no-expression-statement
  useEffect(() => {
    getSiteData(site).then(setSiteData) // tslint:disable-line:no-expression-statement
  }, [])

  // tslint:disable-next-line: no-expression-statement
  useEffect(() => {
    if (siteData === null) {
      return
    }

    const opened = sortIssues(siteData.issues.opened)
    const acknowledged = sortIssues(siteData.issues.acknowledged)
    const closed = sortIssues(siteData.issues.closed)

    const newSiteData: SiteData = {
      ...siteData,
      issues: { opened, acknowledged, closed },
    }

    // tslint:disable-next-line: no-expression-statement
    setSiteData(newSiteData)
  }, [sortOn])

  return (
    <LayoutWithSidebar mainClassName="issues" currentUser={currentUser} location={props.location}>
      <SEO pageTitle="Issues" />
      <IssueBreadcrumbs site={site} />
      {siteData ? (
        <>
          <KanbanData maintainer={siteData.maintainer} setSortBy={setSortOn} />
          <KanbanBoard siteData={siteData} setSiteData={setSiteData} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </LayoutWithSidebar>
  )
}

export default IssuesPage
