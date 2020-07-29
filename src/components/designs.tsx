import React from 'react'



export default class Designs extends React.Component<
  { designsContentClass: string }
> {
  state = { designsContentClass: 'prescroll' }
  designsRef = React.createRef<HTMLDivElement>()
  designsContentRef = React.createRef<HTMLDivElement>()

  componentDidMount() {
    const designsContent = this.designsContentRef.current!

    let designsTop: number
    let designsBottom: number

    const totalScreens = 3

    const setDesignPositionCache = () => {
      const designs = this.designsRef.current!
      designsTop = designs.offsetTop
      designsBottom = designsTop + designs.offsetHeight
    }

    const nextStyle = () => {
      const { scrollY, innerHeight } = window

      if (scrollY < designsTop) {
        return 'position: static;'
      }

      if ((scrollY + innerHeight) >= designsBottom) {
        return 'position: absolute; bottom: 0;'
      }

      return 'position: fixed; top: 0;'
    }

    const runUpdate = () => {
      Object.assign(designsContent, {
        style: nextStyle()
      })

      const scrolledPastDistance = scrollY - designsTop
      const totalDistanceToGo = designsBottom - designsTop - innerHeight
      const changeAtDistance = totalDistanceToGo / totalScreens
      const visibleScreenIndex = Math.min(totalScreens - 1, Math.max(0, Math.floor(scrolledPastDistance / changeAtDistance)))

      const screens = designsContent.querySelectorAll('.mac-screen-container > .screens > .screen')
      Array.prototype.forEach.call(screens, (screen: any, i: number) => {
        const opacity = i === visibleScreenIndex ? 1 : 0
        screen.style.opacity = opacity
      })
    }

    const setDesignPositionCacheAndRunUpdate = () => {
      setDesignPositionCache()
      runUpdate()
    }

    setDesignPositionCacheAndRunUpdate()
    window.addEventListener('resize', setDesignPositionCacheAndRunUpdate)
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
              <img className="screen" src="/taskboard.png" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
