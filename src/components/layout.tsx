/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

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
      <div>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}


export default Layout
