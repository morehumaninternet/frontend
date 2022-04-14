import React from 'react'
import { Layout } from '../shared/layout'
import useHeader from './useHeader'
import Hero from './hero'
import Leaders from './leaders'
import Causes from './causes'
import Technologies from './technologies'
import SocialMediaBar from '../shared/social-media-bar'
import useExplicitHeightOnIPhone from '../../effects/useExplicitHeightOnIPhone'
import SEO from '../shared/seo'
import JoinSection from './join-section'

const NewLandingPage = ({ location }: PageProps): JSX.Element => {
  const navigator = typeof window === 'undefined' ? undefined : window.navigator
  const { header, internalSectionRefs, dotsRef } = useHeader(location, navigator)

  useExplicitHeightOnIPhone(internalSectionRefs['hero'], internalSectionRefs['Causes']) // tslint:disable-line:no-expression-statement

  return (
    <Layout
      additionalClassNames="new-landing-page"
      header={header}
    >
      <SEO />
      <Hero />
      <Leaders ref={internalSectionRefs['Contributors']} />
      <Causes ref={internalSectionRefs['Causes']} />
      <Technologies />
      <JoinSection ref={internalSectionRefs['Join']} />
      {/* <SocialMediaBar /> */}
    </Layout>
  )
}

export default NewLandingPage
