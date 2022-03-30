import React from 'react'
import { Link } from 'gatsby'
import { MHIHomeLink } from '../shared/mhi-dots-logo'

// import { MHIRotatingLogo } from './rotating-logo'

type HeaderProps = {
  headerRef?: React.MutableRefObject<any>
  heroRef?: React.MutableRefObject<any>
  otherLinks?: ReadonlyArray<React.ReactNode>
}

export default function Header({ headerRef, heroRef, otherLinks }: HeaderProps): JSX.Element {
  return (
    <header className="layout-new-header new-landing-page" ref={headerRef as any}>
      <MHIHomeLink additionalClassNames="home" />
      {otherLinks && <div className="other-links">{otherLinks}</div>}
    </header>
  )
}
