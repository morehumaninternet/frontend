import React from 'react'
import onDistanceChange from '../effects/onDistanceChange'



export default function Designs(): JSX.Element {
  const ref = React.useRef<HTMLDivElement>()
  const [designsContentClass, setDesignsContentClass] = React.useState('prescroll')

  // React.useEffect(() => {
  //   const foo = ref.current!.querySelector('.designs-content')

  //   function again() {

  //   }
  // }, [])


  onDistanceChange(() => {
    const designsRect = ref.current!.getBoundingClientRect()
    console.log('designsRect', designsRect)

    if (designsRect.top > 0) {
      setDesignsContentClass('prescroll')
    } else if (designsRect.bottom > window.screen.availHeight) {
      setDesignsContentClass('midscroll')
    } else {
      setDesignsContentClass('postscroll')
    }
  }, [5])

  return (
    <div className="designs" ref={ref as any}>
      <div className={`designs-content ${designsContentClass}`}>
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