import React from 'react'
import { Layout } from '../shared/layout'
import { useHeader } from '../shared/header'
import Hero from './hero'
import Leaders from './leaders'
import Causes from '../shared/causes'
import Technologies from './technologies'
import SocialMediaBar from '../shared/social-media-bar'
import SEO from '../shared/seo'
import JoinSection from './join-section'

const NewLandingPage = ({ location }: PageProps): JSX.Element => {

  const { header, internalSectionRefs } = useHeader(location)

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
