import React from 'react'
import { Layout } from '../shared/layout'
import Header from './header'

export default function PrivacyTosPage({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Layout additionalClassNames="privacy-tos-page" header={<Header />}>
      <div className="privacy-tos-section">{children}</div>
    </Layout>
  )
}
