import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, CardContent } from '@material-ui/core'
import Hero from './shared/hero'
import { LayoutWithHeader } from './shared/layout'
import SEO from './shared/seo'

export default function ThankYouPage({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <LayoutWithHeader mainClassName="thank-you" logoAgainstHero={true}>
      <SEO pageTitle="Thank You" />
      <Hero additionalClassNames="thank-you">
        <Card>
          <h2>
            <FormattedMessage id="thank_you_header" />
          </h2>
          <CardContent className="thank-you">{children}</CardContent>
        </Card>
      </Hero>
    </LayoutWithHeader>
  )
}
