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
    <div className={`layout ${mainClassName}`}>
      <Header>
        {headerLinks}
      </Header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}


export default Layout
