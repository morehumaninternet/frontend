import React from 'react'
import Footer from './footer'
import Header from './header'


type LayoutProps = {
  headerLinks?: React.ReactNode
  mainClassName: string
  headerRef?: React.MutableRefObject<HTMLElement>
  logoRef?: React.MutableRefObject<SVGSVGElement>
  children: React.ReactNode
}

const Layout = ({ mainClassName, headerLinks,headerRef, logoRef, children }: LayoutProps) => {
  return (
    <div className={`layout ${mainClassName}`}>
      <Header headerRef={headerRef} logoRef={logoRef}>
        {headerLinks}
      </Header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}


export default Layout
