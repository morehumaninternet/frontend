import React from 'react'
import { Layout } from '../shared/layout'
import useHeader from './useHeader'

import GetUpdates from '../shared/get-updates'
import Hero from './hero'
import Leaders from './leaders'
import Causes from '../landing-page/causes'
// import Contributors from './contributors'
import SocialMediaBar from '../shared/social-media-bar'
import useExplicitHeightOnIPhone from '../../effects/useExplicitHeightOnIPhone'
import SEO from '../shared/seo'

const NewLandingPage = ({ location }: PageProps): JSX.Element => {
  const navigator = typeof window === 'undefined' ? undefined : window.navigator
  const { header, internalSectionRefs, dotsRef } = useHeader(location, navigator)

  useExplicitHeightOnIPhone(internalSectionRefs['hero'], internalSectionRefs['Causes']) // tslint:disable-line:no-expression-statement

  return (
    <Layout
      additionalClassNames="new-landing-page"
      header={header}
      announcement={
        <div style={{ width: '100%', height: '200px', backgroundColor: 'red' }} />
      }
    >
      <SEO />
      <Hero />
      <Leaders />
      <Causes ref={internalSectionRefs['Causes']} />
      {/* <Contributors ref={internalSectionRefs['Contributors']} /> */}
      <GetUpdates ref={internalSectionRefs['Workshops']} />
      <SocialMediaBar />
    </Layout>
  )
}

export default NewLandingPage
