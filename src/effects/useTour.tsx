/*
  Functions related to creating a tour via https://shepherdjs.dev/
  We cannot use react-shepherd unfortunately because importing that script immediately refers to the window, failing the production build
*/

// tslint:disable:no-expression-statement no-this no-invalid-this
import { useState, useEffect, DependencyList } from 'react'

declare var Shepherd: any

export const stylesHref = 'https://shepherdjs.dev/dist/css/shepherd.css'

export const scriptSrc = 'https://shepherdjs.dev/dist/js/shepherd.min.js'

// Start the tour when Shepherd is available, resolving with the tour when that has happened.
// See https://shepherdjs.dev/docs/tutorial-02-usage.html for information about steps to be added
// Note that if you want the tour to continue after some other event has happened, you'll need to handle that separately
export function startTour({ steps, onComplete, onCancel }: TourArgs): Promise<any> {
  if (typeof Shepherd === 'undefined') {
    let resolve: (value: any) => any // tslint:disable-line:no-let
    const script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement
    script.addEventListener('load', () => startTour({ steps, onComplete, onCancel }).then(resolve))
    return new Promise(r => (resolve = r))
  }

  const tour = new Shepherd.Tour({
    defaultStepOptions: { cancelIcon: { enabled: false } },
    useModalOverlay: true,
  })

  steps.forEach(stepArgs => {
    const { nextText, onNextClick, buttons, attachTo, scrollTo, ...rest } = stepArgs

    tour.addStep({
      ...rest,
      attachTo,
      scrollTo: scrollTo || (attachTo && { behavior: 'smooth', block: 'center' }),
      buttons: buttons || [
        {
          classes: 'human-pink-bg',
          text: 'Exit',
          action(): void {
            this.cancel()
          },
        },
        {
          classes: 'human-blue-bg',
          text: nextText || 'Next',
          action(): void {
            if (onNextClick) {
              onNextClick.call(this)
            } else {
              this.next()
            }
          },
        },
      ],
    })
  })

  if (onComplete) {
    tour.once('complete', onComplete)
  }

  if (onCancel) {
    tour.once('cancel', onCancel)
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

  useEffect(() => {
    return () => {
      if (tour) tour.complete()
    }
  }, [tour])

  return tour
}
