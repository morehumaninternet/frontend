import React from 'react'
import Footer from './footer'
import Header from './header'


type LayoutProps = {
  headerLinks?: React.ReactNode
  mainClassName: string
  headerRef?: React.MutableRefObject<HTMLElement>
  children: React.ReactNode
}

const Layout = ({ mainClassName, headerLinks, headerRef, children }: LayoutProps) => {
  return (
    <div className={`layout ${mainClassName}`}>
      <Header headerRef={headerRef}>
        {headerLinks}
      </Header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}


export default Layout
