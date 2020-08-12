import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { useIntl } from "gatsby-plugin-react-intl"
export default function ThankYouPage() {
  const intl = useIntl()
  return (
    <Layout
      mainClassName="thank-you"
      logoAgainstHero={true}
    >
      <SEO pageTitle="Thank You" />
      <Hero additionalClassNames="thank-you">
        <Card>
          <h2>{intl.formatMessage({ id: "ThankYou-Title" })}</h2>
          <CardContent className="thank-you">
            <p>
            {intl.formatMessage({ id: "ThankYou-BodyLine1" })}
             <br />{intl.formatMessage({ id: "ThankYou-BodyLine2" })}
            </p>
          </CardContent>
        </Card>
      </Hero>
    </Layout>
  )
}
