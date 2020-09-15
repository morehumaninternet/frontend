// tslint:disable:no-expression-statement no-this no-invalid-this
import delay from '../../utils/delay'

declare var Shepherd: any

const steps = Object.freeze([
  {
    text: ['The issue is now posted to the more human internet platform where the site’s maintainer can see and address it.'],
    attachTo: {
      element: '.issue-timeline',
      on: 'top',
    },
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
    buttons: [
      {
        classes: 'human-pink-bg',
        text: 'Exit',
        action(): void {
          this.cancel()
        },
      },
      {
        classes: 'human-blue-bg',
        text: 'Next',
        action(): void {
          this.next()
        },
        disabled: true
      },
    ],
  },
])

export function startTour(): any {
  if (typeof Shepherd === 'undefined') {
    const script = document.querySelector('script[src="https://shepherdjs.dev/dist/js/shepherd.min.js"]') as HTMLScriptElement
    script.addEventListener('load', () => startTour())
    return
  }
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: { enabled: true },
      buttons: [
        {
          classes: 'human-pink-bg',
          text: 'Exit',
          action(): void {
            this.cancel()
          },
        },
        {
          classes: 'human-blue-bg',
          text: 'Next',
          action(): void {
            this.next()
          },
        },
      ],
    },
    useModalOverlay: true,
  })

  steps.forEach(step => tour.addStep(step))

  tour.once('complete', () => {
    const postButton = document.querySelector('button.post') as HTMLButtonElement
    postButton.click() // tslint:disable-line:no-expression-statement
  })

  tour.start()  

  return tour
}
