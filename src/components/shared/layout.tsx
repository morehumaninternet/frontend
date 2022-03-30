import React, { HTMLAttributes } from 'react'
import Footer from './footer'
import Sidebar from './sidebar'

type LayoutProps = {
  additionalClassNames?: string
  announcement?: React.ReactNode
  header?: React.ReactNode
  sidebar?: React.ReactNode
  children: React.ReactNode
  style?: any
}

type LayoutWithSidebarProps = {
  mainClassName: string
  location: Location
  currentUser: CurrentUser
  children: React.ReactNode
}

export const Layout = ({ announcement, header, sidebar, additionalClassNames, style, children }: LayoutProps) => {
  return (
    <div className={`layout ${additionalClassNames || ''}`} style={style}>
      {announcement}
      {header}
      {sidebar}
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export const LayoutWithSidebar = ({ mainClassName, location, currentUser, children }: LayoutWithSidebarProps) => (
  <Layout additionalClassNames={mainClassName + ' has-sidebar'} sidebar={<Sidebar location={location} currentUser={currentUser} />}>
    {children}
  </Layout>
)
