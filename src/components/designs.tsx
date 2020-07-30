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

      const macContainer = designsContent.querySelector('.mac-container')!
      const mac = macContainer.querySelector('img.mac')!

      const screens = macContainer.querySelectorAll<HTMLImageElement>('.mac-container > .screens > .screen')

      const macRect = mac.getBoundingClientRect()

      // const explanations = designsContent.querySelectorAll<HTMLDivElement>('.explanations > .explanation')

      // if (screens.length !== 1 + explanations.length) {
      //   throw new Error(`Must have 1 more screen than explanation`)
      // }

      const changeAtDistance = totalDistanceToGo / screens.length
      const visibleScreenIndex = Math.min(screens.length - 1, Math.max(0, Math.floor(scrolledPastDistance / changeAtDistance)))

      const padding = 15

      range(screens.length).forEach(i => {
        const show = i === visibleScreenIndex
        const screen = screens[i]
        if (show) {
          screen.style.opacity = '1'
          screen.style.width = `${macRect.width - (2 * padding)}px`
          screen.style.top = `${padding}px`
          screen.style.left = `${padding}px`
        } else {
          screen.style.opacity = '0'
        }

        // const explanation = explanations[i + 1]
        // if (explanation) explanation.style.display = show ? 'block' : 'none'
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
          <div className="mac-container">
            <img className="mac" src="/imac.svg" />
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

{}

/* <div className="explanations">
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
</div> */
