import React from 'react'
import Footer from './footer'
import Header from './header'
import '../styles/layout.css'


type LayoutProps = {
  headerLinks?: React.ReactNode
  children: React.ReactNode
}

const Layout = ({ headerLinks, children }: LayoutProps) => {
  return (
    <>
      <Header>
        {headerLinks}
      </Header>
      <main>{children}</main>
      <Footer />
    </>
  )
}


export default Layout
