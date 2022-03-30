import React from 'react'
import { Layout } from '../../shared/layout'
import useHeader from './useHeader'

import GetUpdates from '../../shared/get-updates'
import Hero from './hero'
import HowItWorks from './how-it-works'
import LearnMore from './learn-more'
import SocialMediaBar from '../../shared/social-media-bar'
import useExplicitHeightOnIPhone from '../../../effects/useExplicitHeightOnIPhone'
import RoarSEO from '../roar-seo'

const RoarPage = ({ location }: PageProps): JSX.Element => {
  const navigator = typeof window === 'undefined' ? undefined : window.navigator
  const { header, internalSectionRefs, dotsRef } = useHeader(location, navigator)

  useExplicitHeightOnIPhone(internalSectionRefs['hero'], internalSectionRefs['How it works']) // tslint:disable-line:no-expression-statement

  return (
    <Layout additionalClassNames="roar" header={header}>
      <RoarSEO />
      <Hero ref={internalSectionRefs['hero']} dotsRef={dotsRef} />
      <HowItWorks ref={internalSectionRefs['How it works']} />
      <LearnMore ref={internalSectionRefs['Learn more']} />
      <GetUpdates ref={internalSectionRefs['Community']} />
      <SocialMediaBar />
    </Layout>
  )
}

export default RoarPage
