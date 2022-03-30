import React from 'react'
import { Link } from 'gatsby'
import MHIDotsLogo from '../shared/mhi-dots-logo'

// import { MHIRotatingLogo } from './rotating-logo'

type HeaderProps = {
  headerRef?: React.MutableRefObject<any>
  heroRef?: React.MutableRefObject<any>
  otherLinks?: ReadonlyArray<React.ReactNode>
}

export default function Header({ headerRef, heroRef, otherLinks }: HeaderProps): JSX.Element {
  return (
    <header className="layout-new-header new-landing-page" ref={headerRef as any}>
      <Link ref={heroRef} className="roar-home home active" to="/" aria-label="logo">
        <MHIDotsLogo />
      </Link>
      {otherLinks && <div className="other-links">{otherLinks}</div>}
    </header>
  )
}
