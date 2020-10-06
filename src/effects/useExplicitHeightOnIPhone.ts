/*
  iPhone will change the value of 1vh once you start scrolling, so this effect explicitly sets the height of the element
  of any provided refs to be whatever the height is on the initial render if it detects the user is on an iPhone.
*/

// tslint:disable:readonly-array
import * as React from 'react'

export default function useExplicitHeightOnIPhone(...refs: React.MutableRefObject<any>[]): void {
  for (const ref of refs) {
    React.useEffect(() => {
      const isIPhone = navigator.userAgent.search('iPhone') >= 0
      if (isIPhone) {
        const element = ref.current!
        element.style.height = getComputedStyle(element).height // tslint:disable-line:no-expression-statement
      }
    }, [ref.current])
  }
}
