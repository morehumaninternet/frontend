/*
  Returns a header and associated objects/functions with the following capabilities:
    1. Links that can scroll to various internal sections. The caller must then use the
       returned `internalSectionRefs` as ref attributes in the corresponding element
    2. The css variable corresponding to blue/white is set so that the logo and links
       fade from white to blue as you scroll past a provided fadeAtRef.
       See src/styles/components/header.scss
    3. A makeAndTrackRef function is returned so that elements will fade out from full
       opacity to zero opacity as they move toward the header. The caller must add a
       ref attribute as in ref={makeAndTrackRef()} for any element where this effect
       is desired.
*/

// tslint:disable:no-expression-statement
import React from 'react'
import { forEach } from 'lodash'
// @ts-ignore
import { LocalizedLink } from 'gatsby-theme-i18n'
import setLogoFade from '../../utils/setLogoFade'
import { MHIDotsLogo } from '../shared/mhi-dots-logo'


type Section = 'start' | 'about' | 'why' | 'join'

type UseHeaderProps = {
  location: Location
  fadeAtRef?: React.MutableRefObject<any>
}

type SectionRefs = {
  [section in Section]: React.MutableRefObject<any>
}

type UseHeaderReturn = {
  header: JSX.Element
  internalSectionRefs: SectionRefs
  makeAndTrackRef(): React.MutableRefObject<any>
}

export default function useHeader({
  location,
  fadeAtRef,
}: UseHeaderProps): UseHeaderReturn {
  const internalSections: ReadonlyArray<Section> = ['start', 'about', 'why', 'join']

  const refsToTrack: React.MutableRefObject<HTMLElement>[] = [] // tslint:disable-line:readonly-array

  const makeAndTrackRef = (): React.MutableRefObject<any> => {
    const ref = React.useRef()
    refsToTrack.push(ref as any)
    return ref as any
  }

  const internalSectionRefs: SectionRefs = internalSections.reduce(
    (refs, section) => ({
      ...refs,
      [section]: React.useRef<HTMLElement>(),
    }),
    {} as any
  )

  const internalLinkRefs: SectionRefs = internalSections.reduce(
    (refs, section) => ({
      ...refs,
      [section]: React.useRef<HTMLElement>(),
    }),
    {} as any
  )

  const headerRef = React.useRef<HTMLDivElement>()

  React.useEffect(
    () => {
      const headerElement = headerRef.current!

      let headerIsFixed = getComputedStyle(headerElement).position === 'fixed' // tslint:disable-line:no-let

      function onScroll(): void {
        if (!headerIsFixed) return

        const headerBottom = headerElement.getBoundingClientRect().bottom

        refsToTrack.forEach(ref => {
          if (!ref.current) return
          const rect = ref.current.getBoundingClientRect()
          if (!rect.height || !rect.width) return
          const elementTop = rect.top
          const elementDistance = elementTop - headerBottom
          const elementOpacity = Math.max(0, Math.min(1, (elementDistance + 10) / 100))
          ref.current.style.opacity = String(elementOpacity)
        })

        const screenMidpoint = screen.availHeight / 2

        const currentSection = Object.keys(internalSectionRefs).find((section: Section) => {
          const ref = internalSectionRefs[section]
          const { top, bottom } = ref.current!.getBoundingClientRect()
          return top <= screenMidpoint && bottom >= screenMidpoint
        })!

        // If there is no current section, leave whatever link is already active as active
        if (currentSection) {
          forEach(internalLinkRefs, (ref, key) => {
            if (key === currentSection) {
              ref.current!.classList.add('active')
            } else {
              ref.current!.classList.remove('active')
            }
          })
        }

        if (fadeAtRef) {
          const fadeAtTop = fadeAtRef.current!.getBoundingClientRect().top
          const pixelsUntilPostSky2 = fadeAtTop - headerBottom
          const startFadingAt = 250

          if (pixelsUntilPostSky2 > startFadingAt) {
            setLogoFade(0)
          } else if (pixelsUntilPostSky2 <= 0) {
            setLogoFade(1)
          } else {
            setLogoFade((startFadingAt - pixelsUntilPostSky2) / startFadingAt)
          }
        }
      }

      function onResize(): void {
        headerIsFixed = getComputedStyle(headerElement).position === 'fixed'
        onScroll()
      }

      onScroll()
      addEventListener('scroll', onScroll, { passive: true })
      addEventListener('resize', onResize)

      return () => {
        removeEventListener('scroll', onScroll)
        removeEventListener('resize', onResize)
      }
    },
    refsToTrack.map(ref => ref.current)
  )

  React.useEffect(() => {
    const hash = location.hash.slice(1)
    if (hash && internalSections.includes(hash as any)) {
      // Not sure why this requires a timeout, but it seems to
      setTimeout(() => internalSectionRefs[hash as Section].current.scrollIntoView())
    }
  }, [location.hash])

  function InternalLink({ section }: { section: Section }): JSX.Element {
    return (
      <div className="link__container">
        <a
          key={section}
          className={`hide-on-mobile umami--click--nav-bar-${section}`}
          ref={internalLinkRefs[section] as any}
          onClick={() => internalSectionRefs[section].current!.scrollIntoView({ block: 'center' })}
        >
          {section}
        </a>
      </div>
    )
  }

  const header = (
    <header className="layout-new-header mhi" ref={headerRef as any}>
      <div className="link__container">
        <LocalizedLink key="roar-link" className="hide-on-mobile" to="/roar">
          Roar!
        </LocalizedLink>
      </div>

      <InternalLink section="about" />
      <a
        className={`logo home umami--click--nav-bar-start`}
        aria-label="More Human Internet"
        ref={internalLinkRefs.start as any}
        onClick={() => internalSectionRefs.start.current!.scrollIntoView({ block: 'center' })}
      >
        <MHIDotsLogo additionalClassNames="against-hero" />
      </a>
      <InternalLink section="why" />
      <InternalLink section="join" />
    </header>
  )

  return {
    header,
    makeAndTrackRef,
    internalSectionRefs,
  }
}
