import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SEO from '../components/seo'


export default function ThankYouPage() {
  return (
    <Layout>
      <SEO title="Thank You" />
      <Hero>
        <Card>
          <h2>Thank You</h2>
          <CardContent className="thank-you">
            <p>
              We appreciate your submission!<br />Someone from our team will get in touch with you shortly.
            </p>
          </CardContent>
        </Card>
      </Hero>
    </Layout>
  )
}
