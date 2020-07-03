import React from 'react'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SEO from '../components/seo'
import JoinCard from '../components/join-card'
import '../styles/index.scss'


const ApplyPage = () => (
  <Layout>
    <SEO title="Apply" />
    <Hero>
      <JoinCard />
    </Hero>
  </Layout>
)

export default ApplyPage
