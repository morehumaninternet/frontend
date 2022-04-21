/*
  Returns a header and internalSectionRefs which the caller must then use as
  ref attributes for each of the sections that the header can scroll to. The
  result is that on desktop when the header is fixed it will track which section
  is active and add an 'active' class to the relevant link. Also, if the header
  link is clicked it will scroll to the relevant section.
*/

// tslint:disable:no-expression-statement
import React from 'react'
import { forEach, kebabCase, map } from 'lodash'
// @ts-ignore
import { Link } from 'gatsby'
import { UAParser } from 'ua-parser-js'
import Header from '../header'

type Section = 'hero' | 'How it works' | 'Learn more' | 'Community'

type SectionRefs = {
  [section in Section]: React.MutableRefObject<any>
}

type UseHeaderReturn = {
  header: JSX.Element
  internalSectionRefs: SectionRefs
  dotsRef: React.MutableRefObject<any>
}

export default function useHeader(location: Location, navigator?: Navigator): UseHeaderReturn {
  const [downloadButtonText, setDownloadButtonText] = React.useState<string>('Install the free extension')

  // Refs to each of the various sections, to be used by the caller
  const internalSectionRefs: SectionRefs = {
    hero: React.useRef<any>(),
    'How it works': React.useRef<any>(),
    'Learn more': React.useRef<any>(),
    Community: React.useRef<any>(),
  }

  // Refs to each of the links
  const internalLinkRefs: SectionRefs = {
    hero: React.useRef<any>(),
    'How it works': React.useRef<any>(),
    'Learn more': React.useRef<any>(),
    Community: React.useRef<any>(),
  }

  const dotsRef = React.useRef<any>()

  const headerRef = React.useRef<HTMLDivElement>()

  // Add/remove the active class depending on which section is scrolled to, only relevant if the header is fixed
  React.useEffect(() => {
    const headerElement = headerRef.current!

    let headerIsFixed = getComputedStyle(headerElement).position === 'fixed' // tslint:disable-line:no-let

    let shrink = false // tslint:disable-line:no-let

    function onScroll(): void {
      if (!headerIsFixed) return

      const headerBottom = headerElement.getBoundingClientRect().bottom

      // Add/remove the shrink class to the header when the dots get close/move away
      if (dotsRef.current) {
        const dotsRect = dotsRef.current.getBoundingClientRect()
        const dotsTop = dotsRect.top
        const dotsDistance = dotsTop - headerBottom
        shrink = shrink ? dotsDistance < 60 : dotsDistance < 20
        if (shrink) {
          headerElement.classList.add('shrink')
        } else {
          headerElement.classList.remove('shrink')
        }
      }

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
  }, [])

  // The extension is only available for Chrome on Desktop
  React.useEffect(() => {
    if (!navigator) return
    const parsed = new UAParser().setUA(navigator.userAgent).getResult()
    if (parsed.device.type) {
      setDownloadButtonText('Available on Desktop')
    } else if (parsed.browser.name !== 'Chrome') {
      setDownloadButtonText('Available for Chrome')
    }
  }, [navigator?.userAgent])

  // Scroll to the relevant section of the page when the hash changes
  // e.g., /roar#learn-more scrolls to the learn more section
  React.useEffect(() => {
    const hash = location.hash.slice(1)
    const sectionHashes = map(internalSectionRefs, (section, sectionKey) => ({ section, hash: kebabCase(sectionKey) }))
    const matchingHash = hash && sectionHashes.find(sectionHash => hash === sectionHash.hash)
    if (matchingHash) {
      // Not sure why this requires a timeout, but it seems to
      setTimeout(() => matchingHash.section.current.scrollIntoView())
    }
  }, [location.hash])

  // The actual header
  const header = (
    <Header
      headerRef={headerRef}
      heroRef={internalLinkRefs.hero}
      otherLinks={['How it works', 'Learn more', 'Community']
        .map((section: Section) => (
          <a
            key={section}
            className={`hide-on-mobile link umami--click--nav-bar-${section}`}
            ref={internalLinkRefs[section] as any}
            onClick={() => internalSectionRefs[section].current!.scrollIntoView({ block: 'center' })}
          >
            {section}
          </a>
        ))
        .concat([
          <a
            key="install-btn"
            className="mhi-button btn btn--download"
            rel="noopener noreferrer"
            href="https://chrome.google.com/webstore/detail/roar/jfcmnmgckhjcflmljjgjjilmjhbgdfkc"
          >
            {downloadButtonText}
          </a>,
        ])}
    />
  )

  return {
    header,
    internalSectionRefs,
    dotsRef,
  }
}
