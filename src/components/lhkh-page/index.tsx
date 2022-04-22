import React from 'react'
import { Layout } from '../shared/layout'
import { Header } from '../shared/header'
import SEO from '../shared/seo'
import { lhkh, CausesSection } from '../shared/causes'

const LHKHPage = (): JSX.Element => {
  return (
    <Layout
      additionalClassNames="new-landing-page"
      header={<Header />}
    >
      <SEO />
      <CausesSection
        causes={[lhkh]}
      />
    </Layout>
  )
}

export default LHKHPage
