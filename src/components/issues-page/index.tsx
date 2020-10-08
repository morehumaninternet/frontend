import React, { useState, useEffect } from 'react'
import { sortBy } from 'lodash'

import { LayoutWithSidebar } from '../shared/layout'
import useCurrentUser from '../../effects/useCurrentUser'
import SEO from '../shared/seo'
import IssueBreadcrumbs from '../shared/issue-bread-crumbs'
import KanbanBoard from './kanban-board'
import { getSiteData } from '../../clients/mockApi'
import KanbanData from './kanban-data'
import { useTour, scriptSrc, stylesHref } from '../../effects/useTour'
import SimpleFeedbackWidget from '../simple-feedback-widget'
import drawRipple from '../../animations/ripple'

declare var Shepherd: any

const sortFns = {
  Recent: (issue: Issue) => -issue.initialReport.timestamp.getTime(),
  Upvotes: (issue: Issue) => -issue.aggregates.upvotes.count,
  Comments: (issue: Issue) => -issue.aggregates.comments.count,
}

const IssuesPage = ({ location, navigate }: PageProps): JSX.Element => {
  const currentUser = useCurrentUser()

  const params = new URLSearchParams(location.search)
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
  const tour = useTour(
    {
      steps: [
        {
          text: ['On this page, you as the maintainer can see all the issues across your website...'],
        },
        {
          text: [
            'These are issues that users have reported. This column is only visible to the you as the site maintainer, so that issues can be screened before they are acknowledged publicly',
          ],
          attachTo: {
            element: '#col-opened',
            on: 'top',
          },
          scrollTo: false,
        },
        {
          text: ['By acknowledging, you indicate to users that you agree something is an issue and make the issue publicly visible'],
          attachTo: {
            element: '#col-acknowledged',
            on: 'top',
          },
          scrollTo: false,
        },
        {
          text: [
            "Closing an issue indicates are you either have fixed or won't fix an issue. These are held in case issues resurface so conversation may continue",
          ],
          attachTo: {
            element: '#col-closed',
            on: 'top',
          },
          scrollTo: false,
        },
        {
          text: [
            'By default, issues are organized by how many people indicated they are experiencing them, you can also sort by number of comments or recency.',
          ],
          attachTo: {
            element: '.kanban-data__sort',
            on: 'bottom',
          },
          scrollTo: { behavior: 'smooth', block: 'nearest' },
        },
        {
          id: 'change-status',
          text: ['Click and drag a card to change its status'],
          attachTo: {
            element: '.kanban',
            on: 'top',
          },
          scrollTo: { behavior: 'smooth', block: 'nearest' },
          onNextClick(): void {
            // tslint:disable-next-line: no-expression-statement
            Shepherd.activeTour
              ?.getCurrentStep()
              .updateStepOptions({ text: `Let's acknowledge an issue. Click the card and drag it over to the Acknowledged column.` })
            return drawRipple(document.getElementById('card-500')!)
          },
        },
        {
          text: [`Awesome! You've just let your users know that you've seen their issue`],
        },
        {
          text: [`That concludes the tour. Sign up for our beta to get this functionality on your site.`],
          nextText: 'Sign up',
          onNextClick(): void {
            this.complete() // tslint:disable-line:no-this no-invalid-this no-expression-statement
          },
        },
      ],
      onCancel: () => navigate('/'),
      onComplete: () => navigate('/#join'),
    },
    // Run tour only on goalco.com
    () => site === 'goalco.com'
  )

  function setSiteDataAndAdvanceTour(nextSiteData: SiteData): void {
    setSiteData(nextSiteData) // tslint:disable-line:no-expression-statement
    if (tour && tour.currentStep.id === 'change-status') {
      tour.next() // tslint:disable-line:no-expression-statement
    }
  }

  return (
    <LayoutWithSidebar mainClassName="issues" currentUser={currentUser} location={location}>
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
          <KanbanBoard siteData={siteData} setSiteData={setSiteDataAndAdvanceTour} />
        </>
      ) : (
        <p>Loading...</p>
      )}
      <SimpleFeedbackWidget />
    </LayoutWithSidebar>
  )
}

export default IssuesPage
