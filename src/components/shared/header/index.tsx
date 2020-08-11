import React from 'react'
import HeaderLink from './link'


type HeaderProps = {
  children?: React.ReactNode
  logoAgainstHero: boolean
  headerRef?: React.RefObject<HTMLElement>
}

const Header = ({ children, logoAgainstHero, headerRef }: HeaderProps) => {
  return (
    <header ref={headerRef}>
      <HeaderLink logoAgainstHero={logoAgainstHero} />
      {children}
    </header>
  )
}


export default Header
