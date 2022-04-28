import React from 'react'
import { Link } from 'gatsby'
import RoarLogo from './roar-logo'

type HeaderProps = {
  headerRef?: React.MutableRefObject<any>
  heroRef?: React.MutableRefObject<any>
  otherLinks?: ReadonlyArray<React.ReactNode>
}

export default function Header({ headerRef, heroRef, otherLinks }: HeaderProps): JSX.Element {
  return (
    <header className="roar" ref={headerRef as any}>
      <Link ref={heroRef} className="roar-home home active" to="/roar" aria-label="logo">
        <RoarLogo />
      </Link>
      {otherLinks && <div className="other-links">{otherLinks}</div>}
    </header>
  )
}
