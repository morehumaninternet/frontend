import React from 'react'
import Footer from './footer'
import Header from './header'


type LayoutProps = {
  headerLinks?: React.ReactNode
  mainClassName?: string
  headerRef?: React.MutableRefObject<HTMLElement>
  logoRef?: React.MutableRefObject<SVGSVGElement>
  logoDistanceFromHeroBottom?: number
  children: React.ReactNode
}

const Layout = ({ headerLinks, mainClassName, headerRef, logoRef, logoDistanceFromHeroBottom, children }: LayoutProps) => {
  return (
    <div className={`layout ${mainClassName}`}>
      <Header headerRef={headerRef} logoRef={logoRef} logoDistanceFromHeroBottom={logoDistanceFromHeroBottom}>
        {headerLinks}
      </Header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}


export default Layout
