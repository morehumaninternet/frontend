import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import Hero from '../components/shared/hero'
import Layout from '../components/shared/layout'
import SEO from '../components/shared/seo'


export default function ThankYouPage() {
  return (
    <Layout
      mainClassName="thank-you"
      logoAgainstHero={true}
    >
      <SEO pageTitle="Thank You" />
      <Hero additionalClassNames="thank-you">
        <Card>
          <h2>Thank You</h2>
          <CardContent className="thank-you">
            <p>
              We appreciate your interest!<br />Someone from our team will get in touch with you shortly.
            </p>
          </CardContent>
        </Card>
      </Hero>
    </Layout>
  )
}
