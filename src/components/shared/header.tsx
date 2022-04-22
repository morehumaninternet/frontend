/*
  Returns a header and internalSectionRefs which the caller must then use as
  ref attributes for each of the sections that the header can scroll to. The
  result is that on desktop when the header is fixed it will track which section
  is active and add an 'active' class to the relevant link. Also, if the header
  link is clicked it will scroll to the relevant section.
*/

// tslint:disable:no-expression-statement
import React from 'react'
import { kebabCase, map } from 'lodash'
import { Link } from 'gatsby'
import { MHIHomeLink } from './mhi-dots-logo'

type Section = 'hero' | 'Causes' | 'Contributors' | 'Join' /* | 'Workshops' */

type SectionRefs = {
  [section in Section]: React.MutableRefObject<any>
}

type UseHeaderReturn = {
  header: JSX.Element
  internalSectionRefs: SectionRefs
}

const links: { title: Section, isLast: boolean }[] = [
  {
    title: 'Causes',
    isLast: false,
  },
  {
    title: 'Contributors',
    isLast: false,
  },
  {
    title: 'Join',
    isLast: true,
  },
]

export const Header = () => (
  <header className="layout-new-header new-landing-page">
    <MHIHomeLink additionalClassNames="home" />
    <div className="other-links">
      {links.map(({ title, isLast }) => (
        <Link
          key={title}
          className={isLast
            ? 'mhi-button human-pink-bg btn btn--download'
            : `hide-on-mobile link umami--click--nav-bar-${title}`
          }
          to={`/#${kebabCase(title)}`}
        >
          {title}
        </Link>
      ))}
    </div>
  </header>
)

export function useHeader(location: Location): UseHeaderReturn {
  // Refs to each of the various sections, to be used by the caller
  const internalSectionRefs: SectionRefs = {
    hero: React.useRef<any>(),
    'Causes': React.useRef<any>(),
    'Contributors': React.useRef<any>(),
    // 'Workshops': React.useRef<any>(),
    'Join': React.useRef<any>(),
  }

  // Scroll to the relevant section of the page when the hash changes
  // e.g., /roar#learn-more scrolls to the Contributors section
  React.useEffect(() => {
    const hash = location.hash.slice(1)
    const sectionHashes = map(internalSectionRefs, (section, sectionKey) => ({ section, hash: kebabCase(sectionKey) }))
    const matchingHash = hash && sectionHashes.find(sectionHash => hash === sectionHash.hash)
    if (matchingHash) {
      // Not sure why this requires a timeout, but it seems to
      setTimeout(() => matchingHash.section.current.scrollIntoView())
    }
  }, [location.hash])

  return {
    header: <Header />,
    internalSectionRefs,
  }
}
