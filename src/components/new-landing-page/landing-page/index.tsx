import React from 'react'
import { Layout } from '../../shared/layout'
import useHeader from './useHeader'

import GetUpdates from '../../shared/get-updates'
import Hero from './hero'
import HowItWorks from './how-it-wroks'
import LearnMore from './learn-more'
import SocialMediaBar from './social-media-bar'
import useExplicitHeightOnIPhone from '../../../effects/useExplicitHeightOnIPhone'
import RoarSEO from '../roar-seo'

const NewLandingPage = ({ location }: PageProps): JSX.Element => {
  const navigator = typeof window === 'undefined' ? undefined : window.navigator
  const { header, internalSectionRefs, dotsRef } = useHeader(location, navigator)

  useExplicitHeightOnIPhone(internalSectionRefs['hero'], internalSectionRefs['Causes']) // tslint:disable-line:no-expression-statement

  return (
    <Layout
      additionalClassNames="new-landing-page"
      footerKind="v2"
      header={header}
      announcement={
        <div style={{ width: '100%', height: '200px', backgroundColor: 'red' }} />
      }
    >
      <RoarSEO />
      <Hero ref={internalSectionRefs['hero']} dotsRef={dotsRef} />
      <HowItWorks ref={internalSectionRefs['Causes']} />
      <LearnMore ref={internalSectionRefs['Contributors']} />
      <GetUpdates ref={internalSectionRefs['Workshops']} />
      <SocialMediaBar />
    </Layout>
  )
}

export default NewLandingPage
