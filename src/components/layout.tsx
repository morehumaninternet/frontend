import React from 'react'
import Footer from './footer'
import Header from './header'
import '../styles/layout.scss'


type LayoutProps = {
  headerLinks?: React.ReactNode
  mainClassName?: string
  children: React.ReactNode
}

const Layout = ({ headerLinks, mainClassName, children }: LayoutProps) => {
  return (
    <>
      <Header>
        {headerLinks}
      </Header>
      <main className={mainClassName}>{children}</main>
      <Footer />
    </>
  )
}


export default Layout
