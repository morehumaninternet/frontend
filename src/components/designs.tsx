import React from 'react'
import { forEach, max, range } from 'lodash'
import numPixels from '../utils/numPixels'


export default class Designs extends React.Component {

  designsRef = React.createRef<HTMLDivElement>()
  designsContentContainerRef = React.createRef<HTMLDivElement>()

  // elements & settings, should not change once component has mounted
  designs: HTMLDivElement
  designsContentContainer: HTMLDivElement
  designsContent: HTMLDivElement
  macContainer: HTMLDivElement
  mac: HTMLImageElement
  screens: NodeListOf<HTMLImageElement>
  explanationsContainer: HTMLDivElement
  explanations: NodeListOf<HTMLDivElement>
  isSafari: boolean
  isIPhone: boolean

  // styles, should only change on resize
  designsTop: number
  designsBottom: number
  isDesignsContentFlexRow: boolean

  cacheElementsAndSettings() {
    this.designs = this.designsRef.current!
    this.designsContentContainer = this.designsContentContainerRef.current!
    this.designsContent = this.designsContentContainer.querySelector<HTMLDivElement>('.designs-content')!

    this.macContainer = this.designsContent.querySelector<HTMLDivElement>('.mac-container')!
    this.mac = this.macContainer.querySelector<HTMLImageElement>('img.mac')!

    this.screens = this.macContainer.querySelectorAll<HTMLImageElement>('.mac-container > .screens > .screen')
    this.explanationsContainer = this.designsContent.querySelector<HTMLDivElement>('.explanations-container')!
    this.explanations = this.explanationsContainer.querySelectorAll<HTMLDivElement>('.explanation')

    if (this.screens.length !== 1 + this.explanations.length) {
      throw new Error(`Must have 1 more screen than explanation`)
    }

    this.isSafari = navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0
    this.isIPhone = navigator.userAgent.search("iPhone") >= 0
  }

  cacheStyles() {
    this.designsTop = this.designs.offsetTop
    this.designsBottom = this.designsTop + this.designs.offsetHeight
    this.isDesignsContentFlexRow = getComputedStyle(this.designsContent).flexDirection === 'row'
  }

  // Workaround for bug described here https://stackoverflow.com/questions/19119910/safari-height-100-element-inside-a-max-height-element
  safariWorkaround() {
    let setHeightExplicitly = false

    if (this.isSafari) {
      if (!this.isIPhone || this.isDesignsContentFlexRow) {
        setHeightExplicitly = true
      }
    }

    this.macContainer.style.height = setHeightExplicitly ? getComputedStyle(this.macContainer).maxHeight : ''
  }

  nextContentContainerStyle() {
    const { scrollY, innerHeight } = window

    if (scrollY < this.designsTop) {
      return 'position: static;'
    }

    if ((scrollY + innerHeight) >= this.designsBottom) {
      return 'position: absolute; bottom: 0;'
    }

    return 'position: fixed; top: 0;'
  }

  visibleScreenIndex(): number {
    const scrolledPastDistance = scrollY - this.designsTop
    const totalDistanceToGo = this.designsBottom - this.designsTop - innerHeight

    const changeAtDistance = totalDistanceToGo / this.screens.length
    return Math.min(this.screens.length - 1, Math.max(0, 1 + Math.floor(scrolledPastDistance / changeAtDistance)))
  }

  styleScreens(macRect: DOMRect, visibleScreenIndex: number) {
    const padding = .03 * macRect.width

    forEach(this.screens, (screen, i) => {
      const show = i === visibleScreenIndex
      screen.style.opacity = show ? '1' : '0'

      screen.style.width = `${macRect.width - (2 * padding)}px`
      screen.style.top = `${padding}px`
      screen.style.left = `${macRect.left - this.macContainer.getBoundingClientRect().left + padding}px`
    })
  }

  styleExplanations(macRect: DOMRect, visibleScreenIndex: number, useCard: boolean) {
    const visibleExplanationIndex = visibleScreenIndex - 1

    forEach(this.explanations, (explanation, i) => {
      const show = i === visibleExplanationIndex
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
  }

  tallestExplanationHeight(): number {
    return max(
      Array.from(this.explanations).map(explanation =>
        numPixels(explanation, 'height')
      )
    )!
  }

  // The text explanations are positioned absolutely so they appear in the same place, so we explicitly set the height
  // of the container so that it is included in the cascade and everything appears vertically centered
  setExplanationsContainerHeight(useCard: boolean) {
    if (this.isDesignsContentFlexRow) return

    this.explanationsContainer.style.height = useCard
      ? '0'
      : `${this.tallestExplanationHeight()}px`
  }

  onScroll() {
    Object.assign(this.designsContentContainer, { style: this.nextContentContainerStyle() })
    const visibleScreenIndex = this.visibleScreenIndex()
    const macRect = this.mac.getBoundingClientRect()
    const useCard = !this.isDesignsContentFlexRow && (macRect.left > 240)
    this.styleScreens(macRect, visibleScreenIndex)
    this.styleExplanations(macRect, visibleScreenIndex, useCard)
    this.setExplanationsContainerHeight(useCard)
  }

  onResize() {
    this.cacheStyles()
    this.safariWorkaround()
    this.onScroll()
  }

  componentDidMount() {
    this.cacheElementsAndSettings()
    this.onResize()
    this.mac.addEventListener('load', () => this.onResize())
    window.addEventListener('resize', () => this.onResize())
    window.addEventListener('scroll', () => this.onScroll())
  }

  componentDidUpdate() {
    throw new Error('This component should never be updated by a parent')
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
