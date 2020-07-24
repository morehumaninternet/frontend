import React from 'react'
import HeaderLink from './link'


type HeaderProps = {
  children?: React.ReactNode
  headerRef?: React.MutableRefObject<HTMLElement>
  logoRef?: React.MutableRefObject<SVGSVGElement>
  logoFade?: number
}

const Header = ({ children, headerRef, logoRef, logoFade = 0 }: HeaderProps) => {
  return (
    <header ref={headerRef}>
      <HeaderLink logoRef={logoRef} logoFade={logoFade}/>
      {children}
    </header>
  )
}


export default Header
