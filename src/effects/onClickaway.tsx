import React from 'react'
import hasParent from '../utils/hasParent'


export default function onClickaway(ref: any, callback: () => void) {
  React.useEffect(() => {
    function listener(event: MouseEvent) {
      if (!hasParent(event.target as any, ref.current!)) {
        callback()
      }
    }

    document.addEventListener('click', listener)

    return () => document.removeEventListener('click', listener)
  })
}
