import React from 'react'



export default class Designs extends React.Component<{}, { designsContentClass: string }> {
  state = { designsContentClass: 'prescroll' }
  designsRef = React.createRef<HTMLDivElement>()
  designsContentRef = React.createRef<HTMLDivElement>()

  componentDidMount() {
    const designsContent = this.designsContentRef.current!
    let designsRefTop = this.designsRef.current!.offsetTop

    const runUpdate = () => {
      const { scrollY } = window

      if (scrollY < designsRefTop) {
        Object.assign(designsContent, {
          style: 'position: static;'
        })
      } else {
        Object.assign(designsContent, {
          style: 'position: fixed; top: 0;'
        })
      }

      // if (designsRect.bottom > window.screen.availHeight) {
      //   designsContent.classList.remove('postscroll')
      //   designsContent.classList.remove('prescroll')
      //   designsContent.classList.add('midscroll')
      // } else {
      //   designsContent.classList.remove('midscroll')
      //   designsContent.classList.remove('prescroll')
      //   designsContent.classList.add('postscroll')
      // }
    }

    window.addEventListener('resize', () => {
      designsRefTop = this.designsRef.current!.offsetTop
      runUpdate()
    })

    window.addEventListener('scroll', runUpdate)
  }

  render() {
    return (
      <div className="designs" ref={this.designsRef}>
        <div className="designs-content" ref={this.designsContentRef}>
          <h1>What we're building</h1>
          <div className="mac-screen-container">
            <img className="mac" src="/mhi_imac_mockup2.png" />
            <div className="screens">
              <img className="screen" src="/widget-open.png" />
              <img className="screen" src="/issue-detail.png" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// function Designs(): JSX.Element {
//   const ref = React.useRef<HTMLDivElement>()
//   const designsContentRef = React.useRef<HTMLDivElement>()

//   onDistanceChange(() => {
//     const designsRect = ref.current!.getBoundingClientRect()

//     if (designsRect.top > 0) {
//       designsContentRef.current!.style.setProperty('position', 'static')
//     } else if (designsRect.bottom > window.screen.availHeight) {
//       designsContentRef.current!.style.setProperty('position', 'fixed')
//       designsContentRef.current!.style.setProperty('top', '0')
//     } else {
//       designsContentRef.current!.style.setProperty('position', 'absolute')
//       designsContentRef.current!.style.setProperty('bottom', '0')
//     }
//   }, [5])


// }


// export default function Designs(): JSX.Element {
//   const ref = React.useRef<HTMLDivElement>()
//   const designsContentRef = React.useRef<HTMLDivElement>()

//   // const { documentElement } = document
//   // const [designsContentClass, setDesignsContentClass] = React.useState('prescroll')

//   // React.useEffect(() => {
//   //   const foo = ref.current!.querySelector('.designs-content')

//   //   function again() {

//   //   }
//   // }, [])


//   // onDistanceChange(() => {
//   //   const designsRect = ref.current!.getBoundingClientRect()


//   //   if (designsRect.top > 0) {
//   //     foo.classList.remove('postscroll')
//   //     foo.classList.remove('midscroll')
//   //     foo.classList.add('prescroll')
//   //   } else if (designsRect.bottom > window.screen.availHeight) {
//   //     foo.classList.remove('postscroll')
//   //     foo.classList.remove('prescroll')
//   //     foo.classList.add('midscroll')
//   //   } else {
//   //     foo.classList.remove('midscroll')
//   //     foo.classList.remove('prescroll')
//   //     foo.classList.add('postscroll')
//   //   }
//   // }, [5])

//   // function onAnimationFrame() {

//   // }

//   onDistanceChange(() => {
//     const designsRect = ref.current!.getBoundingClientRect()

//     if (designsRect.top > 0) {
//       designsContentRef.current!.style.setProperty('position', 'static')
//     } else if (designsRect.bottom > window.screen.availHeight) {
//       designsContentRef.current!.style.setProperty('position', 'fixed')
//       designsContentRef.current!.style.setProperty('top', '0')
//     } else {
//       designsContentRef.current!.style.setProperty('position', 'absolute')
//       designsContentRef.current!.style.setProperty('bottom', '0')
//     }
//   }, [5])

//   return (
//     <div className="designs" ref={ref as any}>
//       <div className="designs-content" ref={designsContentRef as any}>
//         <h1>What we're building</h1>
//         <div className="mac-screen-container">
//           <img className="mac" src="/mhi_imac_mockup2.png" />
//           <div className="screens">
//             <img className="screen" src="/widget-open.png" />
//             <img className="screen" src="/issue-detail.png" />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }