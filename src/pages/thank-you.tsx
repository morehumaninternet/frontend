import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SEO from '../components/seo'
import '../styles/index.css'


const ThankYouPage = () => (
  <Layout>
    <SEO title="Thank You" />
    <Hero>
      <Card className="join-card">
        <h2>Thank You</h2>
        <CardContent className="join-card-content">
          <p>

          </p>
        </CardContent>
      </Card>
    </Hero>
  </Layout>
)

export default ThankYouPage
