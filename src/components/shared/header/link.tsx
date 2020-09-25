import React from 'react'
import { Link } from 'gatsby'
import Logo from './logo'
import { homeHref } from '../../../utils/href'

export default function HeaderLink({ logoAgainstHero }: { logoAgainstHero: boolean }): JSX.Element {
  return (
    <Link className="home-link" to={homeHref()} aria-label="More Human Internet Home">
      <Logo againstHero={logoAgainstHero} />
    </Link>
  )
}
