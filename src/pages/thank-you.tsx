import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, CardContent } from '@material-ui/core'
import Hero from '../components/shared/hero'
import { LayoutWithHeader } from '../components/shared/layout'
import SEO from '../components/shared/seo'

export default function ThankYouPage(): JSX.Element {
  return (
    <LayoutWithHeader mainClassName="thank-you" logoAgainstHero={true}>
      <SEO pageTitle="Thank You" />
      <Hero additionalClassNames="thank-you">
        <Card>
          <h2>
            <FormattedMessage id="thank_you_header" />
          </h2>
          <CardContent className="thank-you">
            <p>
              <FormattedMessage id="thank_you_card_content1" />
              <br />
              <FormattedMessage id="thank_you_card_content2" />
            </p>
          </CardContent>
        </Card>
      </Hero>
    </LayoutWithHeader>
  )
}
