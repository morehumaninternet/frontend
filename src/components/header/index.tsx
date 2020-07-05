import React from 'react'
import HeaderLink from './link'


type HeaderProps = {
  children?: React.ReactNode
  headerRef?: React.MutableRefObject<HTMLElement>
  logoRef?: React.MutableRefObject<SVGSVGElement>
  logoDistanceFromHeroBottom?: number
}

const Header = ({ children, headerRef, logoRef, logoDistanceFromHeroBottom = Infinity }: HeaderProps) => {
  const [logoFade, setLogoFade] = React.useState(0)

  React.useEffect(() => {
    if (!headerRef) return setLogoFade(0)
    const headerIsFixed = window.getComputedStyle(headerRef.current!).position === 'fixed'
    if (!headerIsFixed) return setLogoFade(0)
    if (logoDistanceFromHeroBottom > 100) return setLogoFade(0)
    const nextLogoFade = (100 - Math.max(0, logoDistanceFromHeroBottom)) / 100
    setLogoFade(nextLogoFade)
  }, [headerRef, logoDistanceFromHeroBottom])

  return (
    <header ref={headerRef}>
      <HeaderLink logoRef={logoRef} logoFade={logoFade}/>
      {children}
    </header>
  )
}


export default Header
