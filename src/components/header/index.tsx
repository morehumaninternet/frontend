import React from 'react'
import HeaderLink from './link'


type HeaderProps = {
  children?: React.ReactNode
  headerRef?: React.RefObject<HTMLElement>
}

const Header = ({ children, headerRef }: HeaderProps) => {
  return (
    <header ref={headerRef}>
      <HeaderLink />
      {children}
    </header>
  )
}


export default Header
