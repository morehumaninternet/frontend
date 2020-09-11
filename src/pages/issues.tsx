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
  Recent: (issue: Issue) => issue.initialReport.timestamp.getTime(),
  Upvotes: (issue: Issue) => issue.aggregates.upvotes.count,
  Comments: (issue: Issue) => issue.aggregates.comments.count,
}

const IssuesPage = (props: { location: Location }): JSX.Element => {
  const currentUser = useCurrentUser()

  const params = new URLSearchParams(props.location.search)
  if (!params.get('site')) {
    if (typeof window !== 'undefined') {
      navigate('/404')
    }
  }
  const site: string = String(params.get('site'))

  const [siteData, setSiteData] = useState<SiteData | null>(null)

  const [sortOn, setSortOn] = useState<SortIssuesOn>('Upvotes')

  const sortIssues = (issues: readonly Issue[]) => sortBy(issues, sortFns[sortOn])

  useEffect(() => {
    getSiteData(site).then(setSiteData)
  }, [])

  return (
    <LayoutWithSidebar mainClassName="issues" currentUser={currentUser} location={props.location}>
      <SEO pageTitle="Issues" />
      <IssueBreadcrumbs site={site} />
      {siteData ? (
        <>
          <KanbanData maintainer={siteData.maintainer} setSortBy={setSortOn} />
          <KanbanBoard
            opened={sortIssues(siteData.issues.opened)}
            acknowledged={sortIssues(siteData.issues.acknowledged)}
            closed={sortIssues(siteData.issues.closed)}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </LayoutWithSidebar>
  )
}

export default IssuesPage
