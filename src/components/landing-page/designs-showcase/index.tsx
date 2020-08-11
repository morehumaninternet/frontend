import React from 'react'
import { forEach, max } from 'lodash'
import numPixels from '../../../utils/numPixels'
import MacWithScreens from './mac-with-screens'


const Explanations = () => (
  <>
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
  </>
)

export default class DesignsShowcase extends React.Component {

  designsRef = React.createRef<HTMLDivElement>()
  designsContentContainerRef = React.createRef<HTMLDivElement>()

  containerPosition: 'static' | 'fixed' | 'absolute' = 'static'
  visibleScreenIndex: number

  // elements & settings, should not change once component has mounted
  designs: HTMLDivElement
  designsContentContainer: HTMLDivElement
  designsContent: HTMLDivElement
  header: HTMLHeadElement
  macContainer: HTMLDivElement
  mac: HTMLImageElement
  macImage: HTMLElement
  screens: NodeListOf<HTMLElement>
  explanationsContainerCards: HTMLDivElement
  explanationsContainerTexts: HTMLDivElement
  explanationsCards: NodeListOf<HTMLDivElement>
  explanationsTexts: NodeListOf<HTMLDivElement>
  isSafari: boolean
  isIPhone: boolean

  // styles, should only change on resize
  designsTop: number
  designsBottom: number
  isDesignsContentFlexRow: boolean
  explanationCardLeftOffset: number
  useCard: boolean

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

    this.header = this.designsContent.querySelector<HTMLHeadElement>('h1')!
    this.macContainer = this.designsContent.querySelector<HTMLDivElement>('.mac-container')!
    this.mac = this.macContainer.querySelector<HTMLImageElement>('.mac-with-screens')!
    this.macImage = this.mac.querySelector<HTMLElement>('g#mac-with-screens')!

    this.screens = this.mac.querySelectorAll<HTMLElement>('.screen')
    this.explanationsContainerCards = this.designsContent.querySelector<HTMLDivElement>('.explanations-container.cards')!
    this.explanationsContainerTexts = this.designsContent.querySelector<HTMLDivElement>('.explanations-container.texts')!
    this.explanationsCards = this.explanationsContainerCards.querySelectorAll<HTMLDivElement>('.explanation')
    this.explanationsTexts = this.explanationsContainerTexts.querySelectorAll<HTMLDivElement>('.explanation')

    if (this.screens.length !== 1 + this.explanationsCards.length) {
      throw new Error(`Must have 1 more screen than explanation`)
    }
    if (this.explanationsCards.length !== this.explanationsTexts.length) {
      throw new Error(`Must have equal explanations of both types`)
    }

    this.isSafari = navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0
    this.isIPhone = navigator.userAgent.search("iPhone") >= 0
  }

  cacheStyles() {
    this.designsTop = this.designs.offsetTop
    this.designsBottom = this.designsTop + this.designs.offsetHeight
    this.isDesignsContentFlexRow = getComputedStyle(this.designsContent).flexDirection === 'row'
    const macContainerRect = this.macContainer.getBoundingClientRect()
    const macImageRect = this.macImage.getBoundingClientRect()
    const macImageLeftOffset = macImageRect.left - macContainerRect.left
    this.explanationCardLeftOffset = macImageLeftOffset - 180
    this.useCard = this.explanationCardLeftOffset >= 0
    this.styleExplanations()
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

  showVisibleScreen() {
    const stringIndex = String(this.visibleScreenIndex)
    forEach(this.screens, (screen, i) => {
      const show = screen.id[0] === stringIndex
      screen.style.opacity = show ? '1' : '0'
    })
  }

  showVisibleExplanation() {
    const visibleExplanationIndex = this.visibleScreenIndex - 1

    forEach([this.explanationsCards, this.explanationsTexts], explanations => {
      forEach(explanations, (explanation, i) => {
        const show = i === visibleExplanationIndex
        explanation.style.opacity = show ? '1' : '0'
      })
    })
  }

  tallestExplanationHeight(): number {
    return max(
      Array.from(this.explanationsTexts).map(explanation =>
        numPixels(explanation, 'height')
      )
    )!
  }

  styleExplanations() {
    if (this.isDesignsContentFlexRow) {
      this.explanationsCards.forEach(card => card.style.display = 'none')
      this.explanationsTexts.forEach(text => text.style.display = 'none')
      this.explanationsContainerTexts.style.height = '0'
    } else if (this.useCard) {
      this.explanationsCards.forEach(card => card.style.display = 'block')
      this.explanationsTexts.forEach(text => text.style.display = 'none')
      this.explanationsContainerTexts.style.height = '0'
      forEach(this.explanationsCards, (explanation) => {
        explanation.style.left = `${this.explanationCardLeftOffset}px`
      })
    } else {
      this.explanationsCards.forEach(card => card.style.display = 'none')
      this.explanationsTexts.forEach(text => text.style.display = 'block')
      this.explanationsContainerTexts.style.minHeight = `${this.tallestExplanationHeight()}px`
    }
  }

  onScroll() {
    this.setContainerPosition()
    const lastVisibleScreenIndex = this.visibleScreenIndex
    this.setVisibleScreenIndex()
    if (this.visibleScreenIndex !== lastVisibleScreenIndex) {
      this.showVisibleScreen()
      this.showVisibleExplanation()
      if (this.isDesignsContentFlexRow) {
        if (this.visibleScreenIndex === 0) {
          this.header.style.display = ''
          this.macContainer.style.display = 'none'
        } else {
          this.header.style.display = 'none'
          this.macContainer.style.display = ''
        }
      }
    }
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
            <h1>What we're building</h1>
            <div className="mac-container">
              <MacWithScreens className="mac-with-screens" />
              <div className="explanations-container cards">
                <Explanations />
              </div>
            </div>
            <div className="explanations-container texts">
              <Explanations />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
