import React from 'react'
import HeaderLink from './link'


type HeaderProps = {
  children?: React.ReactNode
  headerRef?: React.MutableRefObject<HTMLElement>
  logoRef?: React.MutableRefObject<SVGSVGElement>
}

const Header = ({ children, headerRef, logoRef }: HeaderProps) => {
  return (
    <header ref={headerRef}>
      <HeaderLink logoRef={logoRef}/>
      {children}
    </header>
  )
}


export default Header
