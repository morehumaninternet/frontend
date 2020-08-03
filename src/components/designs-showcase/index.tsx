import React from 'react'
import { forEach, max } from 'lodash'
import numPixels from '../../utils/numPixels'
import MacWithScreens from './mac-with-screens'


export default class DesignsShowcase extends React.Component {

  designsRef = React.createRef<HTMLDivElement>()
  designsContentContainerRef = React.createRef<HTMLDivElement>()

  containerPosition: 'static' | 'fixed' | 'absolute' = 'static'
  visibleScreenIndex: number = 0

  // elements & settings, should not change once component has mounted
  designs: HTMLDivElement
  designsContentContainer: HTMLDivElement
  designsContent: HTMLDivElement
  macContainer: HTMLDivElement
  mac: HTMLImageElement
  screens: NodeListOf<HTMLElement>
  explanationsContainer: HTMLDivElement
  explanations: NodeListOf<HTMLDivElement>
  isSafari: boolean
  isIPhone: boolean

  // styles, should only change on resize
  designsTop: number
  designsBottom: number
  isDesignsContentFlexRow: boolean

  listenForArrowPress() {
    addEventListener('keydown', event => {
      const up = event.keyCode === 38
      const down = event.keyCode === 40
      if (!up && !down) return
      if (this.containerPosition !== 'fixed') return

      event.preventDefault()

      const direction = down ? 1 : -1
      const nextVisibleScreenIndex = this.visibleScreenIndex + direction


      if (nextVisibleScreenIndex === 0) {
        return window.scroll(0, this.designsTop - 150)
      } else if (nextVisibleScreenIndex >= this.screens.length) {
        return window.scroll(0, this.designsBottom - innerHeight + 150)
      }

      const totalDistanceToGo = this.designsBottom - this.designsTop - innerHeight
      const changeAtDistance = totalDistanceToGo / (this.screens.length - 1)
      const x = changeAtDistance * (nextVisibleScreenIndex - 1)
      const nextScrollDistance = 1 + x + this.designsTop
      window.scroll(0, nextScrollDistance)
    })
  }

  cacheElementsAndSettings() {
    this.designs = this.designsRef.current!
    this.designsContentContainer = this.designsContentContainerRef.current!
    this.designsContent = this.designsContentContainer.querySelector<HTMLDivElement>('.designs-content')!

    this.macContainer = this.designsContent.querySelector<HTMLDivElement>('.mac-container')!
    this.mac = this.macContainer.querySelector<HTMLImageElement>('.mac-with-screens')!

    this.screens = this.mac.querySelectorAll<HTMLElement>('.screen')
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

  nextContainerPosition(): this['containerPosition'] {
    if (scrollY < this.designsTop) return 'static'
    if ((scrollY + innerHeight) >= this.designsBottom) return 'absolute'
    return 'fixed'
  }

  setContainerPosition() {
    this.containerPosition = this.nextContainerPosition()
    const classes = ['static', 'fixed', 'absolute']
    classes.forEach(className => {
      if (className === this.containerPosition) {
        this.designsContentContainer.classList.add(className)
      } else {
        this.designsContentContainer.classList.remove(className)
      }
    })
  }

  setVisibleScreenIndex() {
    const scrolledPastDistance = scrollY - this.designsTop
    const totalDistanceToGo = this.designsBottom - this.designsTop - innerHeight

    const changeAtDistance = totalDistanceToGo / (this.screens.length - 1)
    this.visibleScreenIndex = Math.min(this.screens.length - 1, Math.max(0, 1 + Math.floor(scrolledPastDistance / changeAtDistance)))
  }

  styleScreens() {
    const stringIndex = String(this.visibleScreenIndex)
    forEach(this.screens, (screen, i) => {
      const show = screen.id[0] === stringIndex
      screen.style.opacity = show ? '1' : '0'
    })
  }

  styleExplanations(macRect: DOMRect, useCard: boolean) {
    const visibleExplanationIndex = this.visibleScreenIndex - 1

    forEach(this.explanations, (explanation, i) => {
      const show = i === visibleExplanationIndex
      explanation.style.opacity = show ? '1' : '0'

      if (useCard) {
        explanation.classList.remove('text')
        explanation.classList.add('card')
        explanation.style.top = `${macRect.top + .35 * macRect.height}px`
        explanation.style.left = `${macRect.left + 20}px`
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
    this.setContainerPosition()
    this.setVisibleScreenIndex()
    const macRect = this.mac.getBoundingClientRect()
    const useCard = !this.isDesignsContentFlexRow && (macRect.left > 100)
    this.styleScreens()
    this.styleExplanations(macRect, useCard)
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
    window.addEventListener('resize', () => this.onResize())
    window.addEventListener('scroll', () => this.onScroll())
    this.listenForArrowPress()
  }

  componentDidUpdate() {
    // throw new Error('This component should never be updated by a parent')
  }

  render() {
    return (
      <div className="designs" ref={this.designsRef}>
        <div className="designs-content-container static" ref={this.designsContentContainerRef}>
          <div className="designs-content">
            <div className="header-container">
              <h1>What we're building</h1>
            </div>
            <div className="mac-container">
              <MacWithScreens className="mac-with-screens" />
            </div>
            <div className="explanations-container">
              <div className="explanation">
                <h2 className="report-issues">A widget to report issues</h2>
                <p>People can post issues they encounter online</p>
              </div>
              <div className="explanation">
                <h2>A timeline to discuss issues</h2>
                <p>People can have conversations with website maintainers</p>
              </div>
              <div className="explanation">
                <h2>A taskboard to manage issues</h2>
                <p>Maintainers may track progress and sort issues by how many people are experiencing them</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
