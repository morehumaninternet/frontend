import React from 'react'

import { LayoutWithHeader } from '../components/shared/layout'
import SEO from '../components/shared/seo'

export default () => (
  <LayoutWithHeader mainClassName="not-found" logoAgainstHero={false}>
    <SEO pageTitle="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </LayoutWithHeader>
)
