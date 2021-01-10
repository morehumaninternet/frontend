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
import RoarLogo from './roar-logo'


type Section = 'hero' | 'How it works' | 'Learn more' | 'Community'

type SectionRefs = {
  [section in Section]: React.MutableRefObject<any>
}

type UseHeaderReturn = {
  header: JSX.Element
  internalSectionRefs: SectionRefs
}

export default function useHeader(location: Location): UseHeaderReturn {

  // Refs to each of the various sections, to be used by the caller
  const internalSectionRefs: SectionRefs = {
    'hero': React.useRef<any>(),
    'How it works': React.useRef<any>(),
    'Learn more': React.useRef<any>(),
    'Community': React.useRef<any>(),
  }

  // Refs to each of the links
  const internalLinkRefs: SectionRefs = {
    'hero': React.useRef<any>(),
    'How it works': React.useRef<any>(),
    'Learn more': React.useRef<any>(),
    'Community': React.useRef<any>(),
  }

  const headerRef = React.useRef<HTMLDivElement>()

  // Add/remove the active class depending on which section is scrolled to, only relevant if the header is fixed
  React.useEffect(
    () => {
      const headerElement = headerRef.current!

      let headerIsFixed = getComputedStyle(headerElement).position === 'fixed' // tslint:disable-line:no-let

      function onScroll(): void {
        if (!headerIsFixed) return

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
    },
    []
  )

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
    <header className="layout-new-header" ref={headerRef as any}>
      <Link ref={internalLinkRefs.hero} className="roar-home active" to="/roar" aria-label="logo">
        <RoarLogo />
      </Link>
      <div className="other-links">
        {['How it works', 'Learn more', 'Community'].map((section: Section) => (
          <a
            key={section}
            className={`hide-on-mobile internal-link umami--click--nav-bar-${section}`}
            ref={internalLinkRefs[section] as any}
            onClick={() => internalSectionRefs[section].current!.scrollIntoView({ block: 'center' })}
          >
            {section}
          </a>
        ))}
        <a
          className="mhi-button btn btn--download"
          rel="noopener noreferrer"
          href="https://chrome.google.com/webstore/detail/roar/jfcmnmgckhjcflmljjgjjilmjhbgdfkc"
        >
          Install the free extension
        </a>
      </div>
    </header>
  )

  return {
    header,
    internalSectionRefs,
  }
}
