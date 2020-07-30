import React from 'react'
import { range } from 'lodash'
import numPixels from '../utils/numPixels'


export default class Designs extends React.Component {

  designsRef = React.createRef<HTMLDivElement>()
  designsContentRef = React.createRef<HTMLDivElement>()

  componentDidMount() {
    const designsContent = this.designsContentRef.current!
    const macContainer = designsContent.querySelector('.mac-container')!
    const mac = macContainer.querySelector('img.mac')!

    const screens = macContainer.querySelectorAll<HTMLImageElement>('.mac-container > .screens > .screen')
    const explanations = designsContent.querySelectorAll<HTMLDivElement>('.explanations > .explanation')

    if (screens.length !== 1 + explanations.length) {
      throw new Error(`Must have 1 more screen than explanation`)
    }

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

      const macRect = mac.getBoundingClientRect()

      const changeAtDistance = totalDistanceToGo / screens.length
      const visibleScreenIndex = Math.min(screens.length - 1, Math.max(0, 1 + Math.floor(scrolledPastDistance / changeAtDistance)))

      const padding = .03 * macRect.width

      range(screens.length).forEach(i => {
        const show = i === visibleScreenIndex
        const screen = screens[i]
        const explanation = explanations[i - 1]

        if (show) {
          screen.style.opacity = '1'
          screen.style.width = `${macRect.width - (2 * padding)}px`
          screen.style.top = `${padding}px`
          screen.style.left = `${padding}px`

          if (explanation) {
            explanation.style.display = 'block'
            if (macRect.left > 240) {
              explanation.style.position = 'absolute'
              explanation.style.top = `${.35 * macRect.height}px`
              explanation.style.left = '-200px'
            } else {
              explanation.style.position = 'fixed'
              explanation.style.top = `${macRect.bottom - numPixels(getComputedStyle(explanation).height) - 10}px`
              explanation.style.left = `${macRect.left + 10}px`
            }
          }
        } else {
          screen.style.opacity = '0'
          if (explanation) {
            explanation.style.display = 'none'
          }
        }
      })
    }

    const setDesignPositionCacheAndRunUpdate = () => {
      setDesignPositionCache()
      runUpdate()
    }

    setDesignPositionCacheAndRunUpdate()
    mac.addEventListener('load', setDesignPositionCacheAndRunUpdate)

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
            <div className="explanations">
              <div className="explanation">
                <h2>A widget to post issues</h2>
                <p>People can report issues they encounter online</p>
              </div>
              <div className="explanation">
                <h2>A timeline to discuss issues</h2>
                <p>People can have conversations with website maintainers</p>
              </div>
              <div className="explanation">
                <h2>A taskboard to track issues</h2>
                <p>Maintainers may track progress and sort issues by how many people are experiencing them</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
