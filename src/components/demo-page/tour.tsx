// tslint:disable:no-expression-statement
import delay from '../../utils/delay'
import { withNextButton } from '../../effects/useTour'

export const steps = Object.freeze([
  {
    text: [
      'With More Human Internet people using your site can let you know of any issues they are having, or features they would like to see, so that you can help them out',
    ],
    ...withNextButton,
  },
  {
    attachTo: {
      element: '.demo-content-inner',
      on: 'bottom',
    },
    text: ['Suppose someone is shopping on your site, add the GoalCo 10× superpower suit to your cart to continue'],
  },
  {
    attachTo: {
      element: '.demo-content-inner',
      on: 'bottom',
    },
    text: ['But when they click to checkout...'],
  },
  {
    attachTo: {
      element: 'button.checkout',
      on: 'bottom',
    },
    text: ['Hm, this is taking longer than usual...'],
    ...withNextButton,
  },
  {
    id: 'lets-report',
    attachTo: {
      element: '.more-human-internet-widget-boundary',
      on: 'bottom',
    },
    text: ["Let's report the issue. This widget can be layered on top your website with a few lines of embedded code."],
  },
  {
    beforeShowPromise(): Promise<any> {
      return delay(300)
    },
    attachTo: {
      element: '.more-human-internet-widget-editor-issue-title-input',
      on: 'left',
    },
    text: ['They type the issue they are seeing...'],
    when: {
      hide(): void {
        const { editor } = document.querySelector('.more-human-internet-widget-editor-issue-title-input > trix-editor') as any
        editor.insertString('Checkout')
      },
    },
  },
  {
    attachTo: {
      element: '.more-human-internet-similar-issues',
      on: 'left',
    },
    text: ['If there are similar issues, they can select those rather than report a duplicate issue'],
    when: {
      hide(): void {
        const { editor } = document.querySelector('.more-human-internet-widget-editor-issue-title-input > trix-editor') as any
        editor.insertString(" isn't working for an American Express credit card")
      },
    },
  },
  {
    attachTo: {
      element: 'button.post',
      on: 'left',
    },
    text: ['When their issue is adequately specified they may post a new issue'],
    when: {
      hide(): void {
        const postButton = document.querySelector('button.post') as HTMLButtonElement
        postButton.click() // tslint:disable-line:no-expression-statement
      },
    },
  },
  {
    attachTo: {
      element: '.more-human-internet-widget-editor-issue-body-input',
      on: 'left',
    },
    text: ['People give additional context to help developers pinpoint the issue. These templates may be configured for each site.'],
    when: {
      hide(): void {
        const { editor } = document.querySelector('.more-human-internet-widget-editor-issue-body-input > trix-editor') as any
        editor.loadHTML(`
        <strong>Steps I followed</strong>
        <ol>
        <li>I added the Goalco supersuit to my cart</li>
        <li>I entered in the credit card details for my American Express card</li>
        <li>I clicked the checkout button</li>
        </ol>

        <strong>What I Observed</strong>
        <br>
        The spinner kept spinning endlessly
        <br>
        <br>
        <strong>What I Expected</strong>
        <br>
        My purchase should have gone through and I should have received a confirmation email with the order details
        `)
      },
    },
  },
  {
    attachTo: {
      element: 'button.post',
      on: 'left',
    },
    text: ["When they're done they can post their issue. Notifications may be configured so that you're aware of this issue and can respond in near real-time"],
  },
])

export function onComplete(): void {
  const postButton = document.querySelector('button.post') as HTMLButtonElement
  postButton.click()
}
