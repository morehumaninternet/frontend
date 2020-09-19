/*
  An effect to run the tour for the issue page.
  In this case, the steps call changeStatus, so that dependency is injected here.
*/
import { useTour, withNextButton } from './useTour'

type ChangeStatus = (user: User, status: IssueStatus, comment: { html: string }) => void

export default function useIssueTour(changeStatus: ChangeStatus): any {
  return useTour({
    steps: [
      {
        text: ['The issue is now posted to the more human internet platform where the site’s maintainer can see and address it.'],
        attachTo: {
          element: '.issue-timeline',
          on: 'top',
        },
        ...withNextButton,
        when: {
          hide(): void {
            return changeStatus({ username: 'devdiva', avatarUrl: '/devdiva.png' }, 'acknowledged', {
              html: `<div id="diva-acknowledged">I am able to reproduce this on our end, sorry about that! We'll get working on a fix right away</div>`,
            })
          },
        },
      },
      {
        text: ['Looks like Devdiva22 was online and quickly addressed the issue in near real-time.'],
        attachTo: {
          element: '#diva-acknowledged',
          on: 'top',
        },
        ...withNextButton,
        when: {
          hide(): void {
            return changeStatus({ username: 'devdiva', avatarUrl: '/devdiva.png' }, 'closed', {
              html: `<div id="diva-fixed">Deployed a fix that seems to be fixing the issue. Definitely leave a comment and reopen this issue if you're still being affected!</div>`,
            })
          },
        },
      },
      {
        text: ['Devdiva22 reports the problem is now fixed. Customer will be able to successfully checkout.'],
        attachTo: {
          element: '#diva-fixed',
          on: 'top',
        },
      },
    ],
  })
}
