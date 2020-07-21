import React from 'react'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SEO from '../components/seo'
import JoinCard from '../components/join-card'


const ApplyPage = () => (
  <Layout>
    <SEO pageTitle="Apply" />
    <Hero additionalClassNames="join">
      <JoinCard />
    </Hero>
  </Layout>
)

export default ApplyPage
