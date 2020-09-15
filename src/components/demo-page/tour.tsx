// tslint:disable:no-expression-statement
import { useEffect } from 'react'
import delay from '../../utils/delay'
import { withNextButton } from '../../effects/useTour'

/*
  Guide the user through having an issue and reporting it.
  Where no "Next" button is included, we include an "id" for the step so that separate handlers can determine what step they are on
  and continue the tour when certain conditions are met, e.g. writing "Checkout" for the issue title
*/

export const introStep = {
  text: [
    'With More Human Internet people using your site can let you know of any issues they are having, or features they would like to see, so that you can help them out',
  ],
  ...withNextButton,
}

export const addToCartStep = {
  attachTo: {
    element: '.demo-content-inner',
    on: 'bottom',
  },
  text: ['Suppose someone is shopping on your site, add the GoalCo 10× superpower suit to your cart to continue'],
}

export const checkoutStep = {
  attachTo: {
    element: '.demo-content-inner',
    on: 'bottom',
  },
  text: ['But when they click to checkout...'],
}

export const checkoutFailingStep = {
  beforeShowPromise(): Promise<any> {
    return delay(1500)
  },
  attachTo: {
    element: 'button.checkout',
    on: 'bottom',
  },
  text: ['Hm, this is taking a bit long...'],
  ...withNextButton,
}

export const letsReportStep = {
  id: 'lets-report',
  attachTo: {
    element: '.more-human-internet-widget-boundary',
    on: 'bottom',
  },
  text: ["Let's report the issue. This widget can be layered on top your website with a few lines of embedded code."],
}

export const letsWriteIssueTitleStep = {
  id: 'lets-write-issue-title',
  beforeShowPromise(): Promise<any> {
    return delay(300)
  },
  attachTo: {
    element: '.more-human-internet-widget-editor-issue-title-input',
    on: 'left',
  },
  text: [`Let's write up the issue title. Type "Checkout" to continue`],
}

export const explainSimilarIssuesStep = {
  attachTo: {
    element: '.more-human-internet-similar-issues',
    on: 'left',
  },
  text: [
    "We can see that similar issues have already been posted. We could choose from these, but they don't describe our issue. Let's write up the issue in more detail.",
  ],
  ...withNextButton,
}

export const letsAmendIssueTitleStep = {
  id: 'lets-amend-issue-title',
  attachTo: {
    element: '.more-human-internet-widget-editor-issue-title-input',
    on: 'left',
  },
  text: [`Include the information that you were trying to buy the "supersuit" to continue`],
}

export const postAsNewIssueStep = {
  id: 'post-as-new-issue',
  attachTo: {
    element: '.more-human-internet-widget-boundary',
    on: 'left',
  },
  text: [`Looks like that issue hasn't been reported before, so click "Post as new issue" to continue`],
}

export const finalPostStep = {
  id: 'final-post',
  attachTo: {
    element: '.more-human-internet-widget-boundary',
    on: 'left',
  },
  text: [`Let's give some additional context to help the site pinpoint the issue. When you're done click "Post" to continue`],
}

export const steps = Object.freeze([
  introStep,
  addToCartStep,
  checkoutStep,
  checkoutFailingStep,
  letsReportStep,
  letsWriteIssueTitleStep,
  explainSimilarIssuesStep,
  letsAmendIssueTitleStep,
  postAsNewIssueStep,
  finalPostStep,
])
