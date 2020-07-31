import React from 'react'
import { forEach, max, range } from 'lodash'
import numPixels from '../utils/numPixels'


const isSafari = navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0
const isIPhone = navigator.userAgent.search("iPhone") >= 0


export default class Designs extends React.Component {

  designsRef = React.createRef<HTMLDivElement>()
  designsContentContainerRef = React.createRef<HTMLDivElement>()

  componentDidMount() {
    const designsContentContainer = this.designsContentContainerRef.current!
    const designsContent = designsContentContainer.querySelector<HTMLDivElement>('.designs-content')!

    const macContainer = designsContent.querySelector<HTMLDivElement>('.mac-container')!
    const mac = macContainer.querySelector('img.mac')!

    const screens = macContainer.querySelectorAll<HTMLImageElement>('.mac-container > .screens > .screen')
    const explanationsContainer = designsContent.querySelector<HTMLDivElement>('.explanations-container')!
    const explanations = explanationsContainer.querySelectorAll<HTMLDivElement>('.explanation')

    if (screens.length !== 1 + explanations.length) {
      throw new Error(`Must have 1 more screen than explanation`)
    }

    let designsTop: number
    let designsBottom: number
    let isDesignsContentFlexRow: boolean

    const setDesignPositionCache = () => {
      const designs = this.designsRef.current!
      designsTop = designs.offsetTop
      designsBottom = designsTop + designs.offsetHeight
      isDesignsContentFlexRow = getComputedStyle(designsContent).flexDirection === 'row'
      let setHeightExplicitly = false

      // Workaround for bug described here https://stackoverflow.com/questions/19119910/safari-height-100-element-inside-a-max-height-element
      if (isSafari) {
        if (!isIPhone || isDesignsContentFlexRow) {
          setHeightExplicitly = true
        }
      }

      macContainer.style.height = setHeightExplicitly ? getComputedStyle(macContainer).maxHeight : ''
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
      Object.assign(designsContentContainer, {
        style: nextStyle()
      })

      const scrolledPastDistance = scrollY - designsTop
      const totalDistanceToGo = designsBottom - designsTop - innerHeight

      const changeAtDistance = totalDistanceToGo / screens.length
      const visibleScreenIndex = Math.min(screens.length - 1, Math.max(0, 1 + Math.floor(scrolledPastDistance / changeAtDistance)))

      const macRect = mac.getBoundingClientRect()
      const padding = .03 * macRect.width

      const useCard = !isDesignsContentFlexRow && (macRect.left > 240)

      forEach(screens, (screen, i) => {
        const show = i === visibleScreenIndex
        screen.style.opacity = show ? '1' : '0'

        screen.style.width = `${macRect.width - (2 * padding)}px`
        screen.style.top = `${padding}px`
        screen.style.left = `${macRect.left - macContainer.getBoundingClientRect().left + padding}px`
      })

      forEach(explanations, (explanation, i) => {
        const show = i === visibleScreenIndex - 1
        explanation.style.opacity = show ? '1' : '0'

        if (useCard) {
          explanation.classList.remove('text')
          explanation.classList.add('card')
          explanation.style.top = `${macRect.top + .35 * macRect.height}px`
          explanation.style.left = `${macRect.left - 200}px`
        } else {
          explanation.classList.remove('card')
          explanation.classList.add('text')
          explanation.style.top = '0'
          explanation.style.left = ''
        }
      })

      if (!isDesignsContentFlexRow) {
        const tallestExplanationHeight = max(
          Array.from(explanations).map(explanation =>
            numPixels(explanation, 'height')
          )
        )

        explanationsContainer.style.height = (
          useCard
            ? '0'
            : `${tallestExplanationHeight}px`
        )
      }
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
        <div className="designs-content-container" ref={this.designsContentContainerRef}>
          <div className="designs-content">
            <div className="header-container">
              <h1>What we're building</h1>
            </div>
            <div className="mac-container">
              <img className="mac" src="/imac.svg" />
              <div className="screens">
                <img className="screen" src="/widget-closed.png" />
                <img className="screen" src="/widget-open.png" />
                <img className="screen" src="/issue-detail.png" />
                <img className="screen" src="/taskboard.png" />
              </div>
            </div>
            <div className="explanations-container">
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
