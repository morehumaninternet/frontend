// tslint:disable:no-expression-statement
import { navigate } from 'gatsby'
import delay from '../../utils/delay'
import drawRipple from '../../animations/ripple'

/*
  Guide the user through having an issue and reporting it. Where clicking the "next"
  button results in a ripple, not going to the next card, we include an "id" for the
  step so that separate handlers can determine what step they are on and continue
  the tour when certain conditions are met, e.g. writing "Checkout" for the issue title
*/

declare var Shepherd: any
let tourTimer: any // tslint:disable-line:no-let

export const introStep: TourStep = {
  text: [
    `With More Human Internet, users of your site can quickly and easily report issues or request features through a simple widget. Let's see it in action...`,
  ],
}

export const addToCartStep: TourStep = {
  attachTo: {
    element: '.demo-content-inner',
    on: 'bottom',
  },
  text: [
    `Suppose you are shopping for a friend's birthday gift, and you've found the perfect item. Add the GoalCo 10x Superpower suit to your cart to continue...`,
  ],
  onNextClick(): void {
    drawRipple(document.querySelector('button.add-to-cart')!)
  },
}

export const checkoutStep: TourStep = {
  attachTo: {
    element: '.demo-content-inner',
    on: 'bottom',
  },
  text: ['But when you click to checkout...'],
  onNextClick(): void {
    drawRipple(document.querySelector('button.checkout')!)
  },
}

export const checkoutFailingStep: TourStep = {
  beforeShowPromise(): Promise<any> {
    return delay(1500)
  },
  attachTo: {
    element: 'button.checkout',
    on: 'bottom',
  },
  text: [`Something's wrong. The button is spinning endlessly!`],
}

export const letsReportStep: TourStep = {
  id: 'lets-report',
  attachTo: {
    element: '.more-human-internet-widget-boundary',
    on: 'bottom',
  },
  text: ["Let's report this issue. Site maintainers can layer the More Human Internet widget onto their site with a few lines of embedded code."],
  onNextClick(): void {
    drawRipple(document.querySelector('.more-human-internet-widget-boundary')!)
  },
}

export const letsWriteIssueTitleStep: TourStep = {
  id: 'lets-write-issue-title',
  beforeShowPromise(): Promise<any> {
    return delay(300)
  },
  attachTo: {
    element: '.more-human-internet-widget-editor-issue-title-input',
    on: 'left',
  },
  text: [`Let's write up the issue. Type "Checkout" to continue...`],
  when: {
    show: () => {
      tourTimer = setTimeout(() => {
        Shepherd.activeTour
          .getCurrentStep()
          .updateStepOptions({ text: 'The first step in reporting issue is to give it a title. So type "Checkout" to continue the demo.' })
      }, 8000)
    },
    hide: () => {
      clearTimeout(tourTimer)
    },
  },
  onNextClick(): void {
    drawRipple(document.querySelector('.more-human-internet-widget-editor-issue-title-input')!)
  },
}

export const explainSimilarIssuesStep: TourStep = {
  attachTo: {
    element: '.more-human-internet-similar-issues',
    on: 'left',
  },
  text: [
    "Looks like this site has some similar issues reported by other users. You could select an existing issue, but none of them fully describe what you're seeing.",
  ],
}

export const letsAmendIssueTitleStep: TourStep = {
  id: 'lets-amend-issue-title',
  attachTo: {
    element: '.more-human-internet-widget-editor-issue-title-input',
    on: 'left',
  },
  text: [`Add some more detail. Type "Checkout is spinning when I try to buy the Supersuit" to continue...`],
  when: {
    show: () => {
      tourTimer = setTimeout(() => {
        Shepherd.activeTour
          .getCurrentStep()
          .updateStepOptions({ text: `Let's add a more specific title. To continue demo, type "Checkout is spinning when I try to buy the Supersuit"` })
      }, 8000)
    },
    hide: () => {
      clearTimeout(tourTimer)
    },
  },
  onNextClick(): void {
    drawRipple(document.querySelector('.more-human-internet-widget-editor-issue-title-input')!)
  },
}

export const postAsNewIssueStep: TourStep = {
  id: 'post-as-new-issue',
  attachTo: {
    element: '.more-human-internet-widget-boundary',
    on: 'left',
  },
  text: [`Looks like this is a new issue, so click "Post as new issue" to continue`],
  onNextClick(): void {
    drawRipple(document.querySelector('button.post')!)
  },
}

export const finalPostStep: TourStep = {
  id: 'final-post',
  attachTo: {
    element: '.more-human-internet-widget-boundary',
    on: 'left',
  },
  text: [`The More Human Internet widget asks for additional detail to help the site's team address the issue. When you're finished, click "Post" to continue`],
  onNextClick(): void {
    drawRipple(document.querySelector('button.post')!)
  },
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

export const onCancel = () => {
  navigate('/new-landing-page')
}
