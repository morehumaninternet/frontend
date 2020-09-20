/*
  Functions related to creating a tour via https://shepherdjs.dev/
  We cannot use react-shepherd unfortunately because importing that script immediately refers to the window, failing the production build
*/

// tslint:disable:no-expression-statement no-this no-invalid-this
import { useState, useEffect, DependencyList } from 'react'

declare var Shepherd: any

type TourArgs = {
  steps: readonly any[]
  onComplete?: () => void
}

export const stylesHref = 'https://shepherdjs.dev/dist/css/shepherd.css'

export const scriptSrc = 'https://shepherdjs.dev/dist/js/shepherd.min.js'

// Include these whenever you want to include a "Next" button
export const withNextButton = {
  buttons: [
    {
      classes: 'human-blue-bg',
      text: 'Next',
      action(): void {
        this.next()
      },
    },
  ],
}

// Start the tour when Shepherd is available, resolving with the tour when that has happened.
// See https://shepherdjs.dev/docs/tutorial-02-usage.html for information about steps to be added
// Note that if you want the tour to continue after some other event has happened, you'll need to handle that separately
export function startTour({ steps, onComplete }: TourArgs): Promise<any> {
  if (typeof Shepherd === 'undefined') {
    let resolve: (value: any) => any // tslint:disable-line:no-let
    const script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement
    script.addEventListener('load', () => startTour({ steps }).then(resolve))
    return new Promise(r => (resolve = r))
  }

  const tour = new Shepherd.Tour({
    defaultStepOptions: { cancelIcon: { enabled: true } },
    useModalOverlay: true,
  })

  steps.forEach(step => tour.addStep(step))

  if (onComplete) {
    tour.once('complete', onComplete)
  }

  tour.start()

  return Promise.resolve(tour)
}

// Create and return a "tour" state variable, which will take the value of the activeTour when startTour has resolved
export function useTour(tourArgs: TourArgs, runTour?: () => boolean, deps?: DependencyList): any {
  const [tour, setTour] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && !tour && (!runTour || runTour())) {
      startTour(tourArgs).then(setTour)
    }
  }, deps || [])

  return tour
}
