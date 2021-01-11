import React from 'react'
import { Layout } from '../shared/layout'
import useHeader from './useHeader'

import GetUpdates from './get-updates'
import Hero from './hero'
import HowItWorks from './how-it-wroks'

const RoarPage = ({ location }: PageProps): JSX.Element => {
  const navigator = typeof window === 'undefined' ? undefined : window.navigator
  const { header, internalSectionRefs, dotsRef } = useHeader(location, navigator)

  return (
    <Layout additionalClassNames="roar" footerKind="v2" header={header}>
      <Hero ref={internalSectionRefs['hero']} dotsRef={dotsRef} />
      <HowItWorks ref={internalSectionRefs['How it works']} />
      <div ref={internalSectionRefs['Learn more']} style={{ backgroundColor: 'purple', width: '100%', height: '100vh' }}></div>
      <GetUpdates ref={internalSectionRefs['Community']} />
    </Layout>
  )
}

export default RoarPage
