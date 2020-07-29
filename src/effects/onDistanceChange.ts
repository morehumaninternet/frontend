import React from 'react'


export default function onDistanceChange(callback: () => void) {
  React.useEffect(() => {
    callback()
    again()

    function again() {
      window.requestAnimationFrame(() => {
        callback()
        again()
      })
    }
  })
}


// export default function onDistanceChange(callback: () => void) {
//   React.useEffect(() => {
//     callback()

//     window.addEventListener('scroll', callback)
//     window.addEventListener('resize', callback)

//     return () => {
//       window.removeEventListener('scroll', callback)
//       window.removeEventListener('resize', callback)
//     }
//   })
// }
