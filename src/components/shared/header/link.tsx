import React from 'react'
// @ts-ignore
import { LocalizedLink } from 'gatsby-theme-i18n'
import Logo from './logo'

export default function HeaderLink({ logoAgainstHero }: { logoAgainstHero: boolean }): JSX.Element {
  return (
    <LocalizedLink className="home-link" to="/" aria-label="More Human Internet Home">
      <Logo againstHero={logoAgainstHero} />
    </LocalizedLink>
  )
}
