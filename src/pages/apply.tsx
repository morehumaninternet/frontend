import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ApplicationForm from '../components/application-form'
import '../styles/index.css'


const ApplyPage = () => (
  <Layout>
    <SEO title="Apply" />
    <Hero>
      <Card className="join-card">
        <h2>Join</h2>
        <CardContent className="join-card-content">
          <ApplicationForm />
        </CardContent>
      </Card>
    </Hero>
  </Layout>
)

export default ApplyPage
