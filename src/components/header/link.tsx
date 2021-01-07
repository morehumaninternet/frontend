import React from 'react'
import { Link } from 'gatsby'
import Logo from './logo'


export default function HeaderLink({ logoAgainstHero }: { logoAgainstHero: boolean }): JSX.Element {
  return (
    <Link className="home-link" to="/" aria-label="More Human Internet Home" >
      <Logo againstHero={logoAgainstHero} />
    </Link>
  )
}
