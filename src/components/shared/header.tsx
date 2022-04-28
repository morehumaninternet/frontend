// tslint:disable:no-expression-statement
import React from 'react'
import { kebabCase, map } from 'lodash'
import { Link } from 'gatsby'
import { MHIHomeLink } from './mhi-dots-logo'

type HeaderProps = {
  location?: Location
  internalSectionRefs?: SectionRefs
}

export type Section = 'Causes' | 'Contributors' | 'Join' /* | 'Workshops' */

export type SectionRefs = {
  [section in Section]: React.MutableRefObject<any>
}

const links: readonly { title: Section, isLast: boolean }[] = [
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

export const Header = ({ location, internalSectionRefs }: HeaderProps) => {
  // Scroll to the relevant section of the page when the hash changes
  // e.g., /roar#learn-more scrolls to the Contributors section
  if (location && internalSectionRefs) {
    React.useEffect(() => {
      const hash = location.hash.slice(1)
      const sectionHashes = map(internalSectionRefs, (section, sectionKey) => ({ section, hash: kebabCase(sectionKey) }))
      const matchingHash = hash && sectionHashes.find(sectionHash => hash === sectionHash.hash)
      if (matchingHash) {
        // Not sure why this requires a timeout, but it seems to
        setTimeout(() => matchingHash.section.current.scrollIntoView())
      }
    }, [location.hash])
  }

  return (
    <header className="new-landing-page">
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
}
