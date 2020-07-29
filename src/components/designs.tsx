import React from 'react'
import onDistanceChange from '../effects/onDistanceChange'


type DesignsProps = {
  designsRef: React.MutableRefObject<HTMLDivElement>
  manifestoRef: React.MutableRefObject<HTMLDivElement>
}


export default function Designs({ designsRef, manifestoRef }: DesignsProps): JSX.Element {
  const [designsContentClass, setDesignsContentClass] = React.useState('')

  Object.assign(window, { foo: designsRef.current })

  onDistanceChange(() => {
    const designsRect = designsRef.current!.getBoundingClientRect()

    if (designsRect.top > 0) {
      setDesignsContentClass('')
    } else if (designsRect.bottom > window.screen.height) {
      setDesignsContentClass('midscroll')
    } else {
      setDesignsContentClass('postscroll')
    }
  })

  return (
    <div className="designs" ref={designsRef}>
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