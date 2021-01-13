import React from 'react'
import { Layout } from '../../shared/layout'
import useHeader from './useHeader'

import GetUpdates from './get-updates'
import Hero from './hero'
import HowItWorks from './how-it-wroks'
import LearnMore from './learn-more'
import SocialMediaBar from './social-media-bar'

const RoarPage = ({ location }: PageProps): JSX.Element => {
  const navigator = typeof window === 'undefined' ? undefined : window.navigator
  const { header, internalSectionRefs, dotsRef } = useHeader(location, navigator)

  return (
    <Layout additionalClassNames="roar" footerKind="v2" header={header}>
      <Hero ref={internalSectionRefs['hero']} dotsRef={dotsRef} />
      <HowItWorks ref={internalSectionRefs['How it works']} />
      <LearnMore ref={internalSectionRefs['Learn more']} />
      <GetUpdates ref={internalSectionRefs['Community']} />
      <SocialMediaBar />
    </Layout>
  )
}

export default RoarPage
