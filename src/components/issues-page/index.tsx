import React, { useState, useEffect } from 'react'
import { sortBy } from 'lodash'
import { navigate } from 'gatsby'

import { LayoutWithSidebar } from '../shared/layout'
import useCurrentUser from '../../effects/useCurrentUser'
import SEO from '../shared/seo'
import IssueBreadcrumbs from '../shared/issue-bread-crumbs'
import KanbanBoard from './kanban-board'
import { getSiteData } from '../../clients/mockApi'
import KanbanData from './kanban-data'
import { useTour, withNextButton, scriptSrc, stylesHref } from '../../effects/useTour'

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

  // tslint:disable-next-line: no-expression-statement
  useTour(
    {
      steps: [
        {
          text: ['On this page, you as the maintainer can see all the issues across your website...'],
          ...withNextButton,
        },
        {
          text: ["These are issues that users have reported. This columns is only visible to the site's maintainer, so that we can screen hooligans"],
          attachTo: {
            element: '#col-opened',
            on: 'top',
          },
          ...withNextButton,
        },
        {
          text: ['By acknowledging issues, you indicate to users that you agree something is an issue and make the issue publicly visible'],
          attachTo: {
            element: '#col-acknowledged',
            on: 'top',
          },
          ...withNextButton,
        },
        {
          text: ["These are issues that are either fixed or won't fix. These are held in case issues resurface."],
          attachTo: {
            element: '#col-closed',
            on: 'top',
          },
          ...withNextButton,
        },
        {
          text: [
            'By default, issues are organized by how many people indicated they are experiencing them, you can also sort by number of comments or recency.',
          ],
          attachTo: {
            element: '#sort-issues',
            on: 'bottom',
          },
          ...withNextButton,
        },
        {
          text: ['You can click and drag the card to close the issue.'],
          attachTo: {
            element: '#card-500',
            on: 'right',
          },
          scrollTo: { behavior: 'smooth', block: 'center' },
          ...withNextButton,
        },
        {
          text: ['You have completed the tour. Have a suggestion? Feel free to open an issue on our home page'],
          buttons: [
            {
              classes: 'human-pink-bg',
              text: 'Go home',
              action(): void {
                // tslint:disable-next-line: no-invalid-this no-this no-expression-statement
                this.complete()
              },
            },
          ],
        },
      ],
      onComplete: () => {
        if (typeof window !== 'undefined') {
          // tslint:disable-next-line: no-expression-statement
          navigate('/')
        }
      },
    },
    // Run tour only on goalco.com
    () => site === 'goalco.com'
  )

  return (
    <LayoutWithSidebar mainClassName="issues" currentUser={currentUser} location={props.location}>
      <SEO
        pageTitle="Issues"
        links={[
          {
            rel: 'stylesheet',
            type: 'text/css',
            href: stylesHref,
          },
        ]}
        scripts={[{ type: 'text/javascript', src: scriptSrc }]}
      />
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
