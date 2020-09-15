// tslint:disable:no-expression-statement no-this no-invalid-this
import delay from '../../utils/delay'
import { withNextButton } from '../../effects/useTour'

export const steps = Object.freeze([
  {
    text: ['The issue is now posted to the more human internet platform where the site’s maintainer can see and address it.'],
    attachTo: {
      element: '.issue-timeline',
      on: 'top',
    },
    ...withNextButton,
  },
  {
    beforeShowPromise(): Promise<any> {
      return delay(4000) // issue page waits 6 seconds before acknowledging; 4 seems enough here...
    },
    text: ['Looks like Devdiva22 was online and quickly addressed the issue in near real-time.'],
    attachTo: {
      element: '#diva-acknowledged',
      on: 'top',
    },
  },
])
