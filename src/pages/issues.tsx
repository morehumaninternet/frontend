import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'

import { LayoutWithSidebar } from '../components/shared/layout'
import useCurrentUser from '../effects/useCurrentUser'
import SEO from '../components/shared/seo'
import IssueBreadcrumbs from '../components/shared/issue-bread-crumbs'
import KanbanBoard from '../components/issues-page/kanban-board'
import { getSiteData } from '../clients/mockApi'
import KanbanData from '../components/issues-page/kanban-data'

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

  const [sortBy, setSortBy] = useState<SortIssuesBy>('Upvotes')
  const sortIssues = (issues: Issue[]): Issue[] => {
    switch (sortBy) {
      case 'Recent':
        return issues.sort((issueA: Issue, issueB: Issue) => {
          return issueB.initialReport.timestamp.getTime() - issueA.initialReport.timestamp.getTime()
        })
      case 'Upvotes':
        return issues.sort((issueA: Issue, issueB: Issue) => {
          return issueB.aggregates.upvotes.count - issueA.aggregates.upvotes.count
        })
      case 'Comments':
        return issues.sort((issueA: Issue, issueB: Issue) => {
          return issueB.aggregates.comments.count - issueA.aggregates.comments.count
        })
    }
  }

  useEffect(async () => {
    setSiteData(await getSiteData(site))
  }, [])

  return (
    <LayoutWithSidebar mainClassName="issues" currentUser={currentUser} location={props.location}>
      <SEO pageTitle="Issues" />
      <IssueBreadcrumbs site={site} />
      {siteData ? (
        <>
          <KanbanData maintainer={siteData.maintainer} setSortBy={setSortBy} />
          <KanbanBoard
            openedIssues={sortIssues(siteData.issues.opened)}
            acknowledgedIssues={sortIssues(siteData.issues.acknowledged)}
            closedIssues={sortIssues(siteData.issues.closed)}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </LayoutWithSidebar>
  )
}

export default IssuesPage
