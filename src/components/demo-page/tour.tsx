// tslint:disable:no-expression-statement
import { useEffect } from 'react'
import { navigate } from 'gatsby'
import delay from '../../utils/delay'
import { withNextButton } from '../../effects/useTour'

/*
  Guide the user through having an issue and reporting it.
  Where no "Next" button is included, we include an "id" for the step so that separate handlers can determine what step they are on
  and continue the tour when certain conditions are met, e.g. writing "Checkout" for the issue title
*/

export const introStep = {
  text: [
    `With More Human Internet, users of your site can quickly and easily report issues or request features through a simple widget. Let's see it in action...`,
  ],
  ...withNextButton,
}

export const addToCartStep = {
  attachTo: {
    element: '.demo-content-inner',
    on: 'bottom',
  },
  text: [
    `Suppose you are shopping for a friend's birthday gift, and you've found the perfect item. Add the GoalCo 10x Superpower suit to your cart to continue...`,
  ],
}

export const checkoutStep = {
  attachTo: {
    element: '.demo-content-inner',
    on: 'bottom',
  },
  text: ['But when you click to checkout...'],
}

export const checkoutFailingStep = {
  beforeShowPromise(): Promise<any> {
    return delay(1500)
  },
  attachTo: {
    element: 'button.checkout',
    on: 'bottom',
  },
  text: [`Something's wrong. The button is spinning endlessly!`],
  ...withNextButton,
}

export const letsReportStep = {
  id: 'lets-report',
  attachTo: {
    element: '.more-human-internet-widget-boundary',
    on: 'bottom',
  },
  text: ["Let's report this issue. Site maintainers can layer the More Human Internet widget onto their site with a few lines of embedded code."],
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
  text: [`Let's write up the issue. Type "Checkout" to continue...`],
}

export const explainSimilarIssuesStep = {
  attachTo: {
    element: '.more-human-internet-similar-issues',
    on: 'left',
  },
  text: [
    "Looks like this site has some similar issues reported by other users. You could select an existing issue, but none of them fully describe what you're seeing.",
  ],
  ...withNextButton,
}

export const letsAmendIssueTitleStep = {
  id: 'lets-amend-issue-title',
  attachTo: {
    element: '.more-human-internet-widget-editor-issue-title-input',
    on: 'left',
  },
  text: [`Add some more detail. Type "Checkout is spinning when I try to buy the Supersuit" to continue...`],
}

export const postAsNewIssueStep = {
  id: 'post-as-new-issue',
  attachTo: {
    element: '.more-human-internet-widget-boundary',
    on: 'left',
  },
  text: [`Looks like this is a new issue, so click "Post as new issue" to continue`],
}

export const finalPostStep = {
  id: 'final-post',
  attachTo: {
    element: '.more-human-internet-widget-boundary',
    on: 'left',
  },
  text: [`The More Human Internet widget asks for additional detail to help the site's team address the issue. When you're finished, click "Post" to continue`],
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

export const onComplete = () => {
  navigate('/new-landing-page')
}
export const onCancel = () => {
  navigate('/new-landing-page')
}
