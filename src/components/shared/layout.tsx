import React, { HTMLAttributes } from 'react'
import Footer from './footer'

type LayoutProps = {
  additionalClassNames?: string
  announcement?: React.ReactNode
  header?: React.ReactNode
  children: React.ReactNode
  style?: any
}

export const Layout = ({ announcement, header, additionalClassNames, style, children }: LayoutProps) => {
  return (
    <div className={`layout ${additionalClassNames || ''}`} style={style}>
      {announcement}
      {header}
      <main>{children}</main>
      <Footer />
    </div>
  )
}
