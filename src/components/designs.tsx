import React from 'react'
import { range } from 'lodash'

export default class Designs extends React.Component {

  designsRef = React.createRef<HTMLDivElement>()
  designsContentRef = React.createRef<HTMLDivElement>()

  componentDidMount() {
    const designsContent = this.designsContentRef.current!

    let designsTop: number
    let designsBottom: number

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

      const screens = designsContent.querySelectorAll<HTMLImageElement>('.mac-screen-container > .screens > .screen')
      const explanations = designsContent.querySelectorAll<HTMLDivElement>('.explanations > .explanation')

      if (screens.length !== explanations.length) {
        throw new Error(`Must have equal screens & explanations`)
      }

      const changeAtDistance = totalDistanceToGo / screens.length
      const visibleScreenIndex = Math.min(screens.length - 1, Math.max(0, Math.floor(scrolledPastDistance / changeAtDistance)))

      range(screens.length).forEach(i => {
        const show = i === visibleScreenIndex
        screens[i].style.opacity = show ? '1' : '0'
        explanations[i].style.display = show ? 'block' : 'none'
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
          <div className="explanations">
            <div className="explanation">
              <h1>What we're building</h1>
            </div>
            <div className="explanation">
              <h2>A widget to post issues</h2>
              People can report issues they encounter online
            </div>
            <div className="explanation">
              <h2>A timeline to discuss issues</h2>
              People can have conversations with website maintainers
            </div>
            <div className="explanation">
              <h2>A taskboard to track issues</h2>
              Maintainers may track progress and sort issues by how many people are experiencing them
            </div>
          </div>
          <div className="mac-screen-container">
            <img className="mac" src="/mhi_imac_mockup.png" />
            <div className="screens">
              <img className="screen" src="/widget-closed.png" />
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