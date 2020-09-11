import React from 'react'
import Footer from './footer'
import Header from './header'
import Sidebar from './sidebar'

type LayoutProps = {
  additionalClassNames: string
  header?: React.ReactNode
  sidebar?: React.ReactNode
  children: React.ReactNode
}

type LayoutWithHeaderProps = {
  mainClassName: string
  children: React.ReactNode
  logoAgainstHero: boolean
  headerLinks?: React.ReactNode
  headerRef?: React.RefObject<HTMLElement>
}

type LayoutWithSidebarProps = {
  mainClassName: string
  location: Location
  currentUser: CurrentUser
  children: React.ReactNode
}

export const Layout = ({ header, sidebar, additionalClassNames, children }: LayoutProps) => {
  return (
    <div className={`layout ${additionalClassNames}`}>
      {header}
      {sidebar}
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export const LayoutWithHeader = ({ mainClassName, children, headerLinks, headerRef, logoAgainstHero }: LayoutWithHeaderProps) => (
  <Layout
    additionalClassNames={mainClassName + ' has-header'}
    header={
      <Header headerRef={headerRef} logoAgainstHero={logoAgainstHero}>
        {headerLinks}
      </Header>
    }
  >
    {children}
  </Layout>
)

export const LayoutWithSidebar = ({ mainClassName, location, currentUser, children }: LayoutWithSidebarProps) => (
  <Layout additionalClassNames={mainClassName + ' has-sidebar'} sidebar={<Sidebar location={location} currentUser={currentUser} />}>
    {children}
  </Layout>
)
