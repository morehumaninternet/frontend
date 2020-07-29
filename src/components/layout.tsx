import React from 'react'
import Footer from './footer'
import Header from './header'


type LayoutProps = {
  headerLinks?: React.ReactNode
  mainClassName: string
  logoAgainstHero: boolean
  headerRef?: React.RefObject<HTMLElement>
  children: React.ReactNode
}

const Layout = ({ headerLinks, logoAgainstHero, mainClassName, headerRef, children }: LayoutProps) => {
  return (
    <div className={`layout ${mainClassName}`}>
      <Header headerRef={headerRef} logoAgainstHero={logoAgainstHero}>
        {headerLinks}
      </Header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}


export default Layout
