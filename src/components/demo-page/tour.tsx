import React from 'react'
import { ShepherdTour } from 'react-shepherd'
import delay from '../../utils/delay'

export default function DemoTour({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <ShepherdTour
      tourOptions={{
        defaultStepOptions: {
          cancelIcon: { enabled: true },
          buttons: [
            {
              classes: 'human-pink-bg',
              text: 'Exit',
              action() {
                this.cancel()
              },
            },
            {
              classes: 'human-blue-bg',
              text: 'Next',
              action() {
                this.next()
              },
            },
          ],
        },
        useModalOverlay: true,
      }}
      steps={[
        {
          text: [
            'With More Human Internet people using your site can let you know of any issues they are having, or features they would like to see, so that you can help them out',
          ],
        },
        {
          attachTo: {
            element: '.demo-content-inner',
            on: 'bottom',
          },
          text: ['Suppose someone is shopping on your site...'],
          when: {
            hide() {
              const addToCartButton = document.querySelector(
                'button.add-to-cart'
              ) as HTMLButtonElement
              addToCartButton.click() // tslint:disable-line:no-expression-statement
            },
          },
        },
        {
          attachTo: {
            element: '.demo-content-inner',
            on: 'bottom',
          },
          text: ['But when they click to checkout...'],
          when: {
            hide() {
              const checkoutButton = document.querySelector(
                'button.checkout'
              ) as HTMLButtonElement
              checkoutButton.click() // tslint:disable-line:no-expression-statement
            },
          },
        },
        {
          attachTo: {
            element: 'button.checkout',
            on: 'bottom',
          },
          text: ["The spinner doesn't stop spinning"],
        },
        {
          attachTo: {
            element: '.more-human-internet-widget-boundary',
            on: 'bottom',
          },
          text: [
            'The issue may be reported with our widget that is layered on top your website with a few lines of embedded code.',
          ],
          when: {
            hide() {
              const widgetBoundary = document.querySelector(
                '.more-human-internet-widget-boundary'
              ) as HTMLDivElement
              widgetBoundary.click() // tslint:disable-line:no-expression-statement
            },
          },
        },
        {
          beforeShowPromise: function () {
            return delay(300)
          },
          attachTo: {
            element: '.more-human-internet-widget-editor-issue-title-input',
            on: 'left',
          },
          text: ['They type the issue they are seeing...'],
          when: {
            hide() {
              const { editor } = document.querySelector(
                '.more-human-internet-widget-editor-issue-title-input > trix-editor'
              ) as any
              editor.insertString('Checkout')
            },
          },
        },
        {
          attachTo: {
            element: '.more-human-internet-similar-issues',
            on: 'left',
          },
          text: [
            'If there are similar issues, they can select those rather than report a duplicate issue',
          ],
          when: {
            hide() {
              const { editor } = document.querySelector(
                '.more-human-internet-widget-editor-issue-title-input > trix-editor'
              ) as any
              editor.insertString(
                " isn't working for an American Express credit card"
              )
            },
          },
        },
        {
          attachTo: {
            element: 'button.post',
            on: 'left',
          },
          text: [
            'When their issue is adequately specified they may post a new issue',
          ],
          when: {
            hide() {
              const postButton = document.querySelector(
                'button.post'
              ) as HTMLButtonElement
              postButton.click() // tslint:disable-line:no-expression-statement
            },
          },
        },
        {
          attachTo: {
            element: '.more-human-internet-widget-editor-issue-body-input',
            on: 'left',
          },
          text: [
            'People give additional context to help developers pinpoint the issue. These templates may be configured for each site.',
          ],
          when: {
            hide() {
              const { editor } = document.querySelector(
                '.more-human-internet-widget-editor-issue-body-input > trix-editor'
              ) as any
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
              // editor
            },
          },
        },
        {
          attachTo: {
            element: 'button.post',
            on: 'left',
          },
          text: [
            "When they're done they can post their issue. Notifications may be configured so that you're aware of this issue and can respond in near real-time",
          ],
          when: {
            complete() {
              console.log('complete')
              const postButton = document.querySelector(
                'button.post'
              ) as HTMLButtonElement
              postButton.click() // tslint:disable-line:no-expression-statement
            },
          },
        },
      ]}
    >
      {children}
    </ShepherdTour>
  )
}
