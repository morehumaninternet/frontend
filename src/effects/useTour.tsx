import { useState, useEffect } from 'react'

// tslint:disable:no-expression-statement no-this no-invalid-this
declare var Shepherd: any

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

type TourArgs = { steps: readonly any[]; onComplete?: () => void }

export function startTour({ steps, onComplete }: TourArgs): Promise<any> {
  if (typeof Shepherd === 'undefined') {
    let resolve: (value: any) => any // tslint:disable-line:no-let
    const script = document.querySelector('script[src="https://shepherdjs.dev/dist/js/shepherd.min.js"]') as HTMLScriptElement
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

export function useTour(tourArgs: TourArgs): any {
  const [tour, setTour] = useState<any>(null)

  // tslint:disable:no-expression-statement
  useEffect(() => {
    if (typeof window !== 'undefined' && !tour) {
      startTour(tourArgs).then(setTour)
    }
  }, [])

  return tour
}
