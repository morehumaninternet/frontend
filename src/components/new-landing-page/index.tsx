import React from 'react'
import { Layout } from '../shared/layout'
import { Header, SectionRefs } from '../shared/header'
import Hero from './hero'
import Causes from '../shared/causes'
import Technologies from './technologies'
import SocialMediaBar from '../shared/social-media-bar'
import SEO from '../shared/seo'
import JoinSection from './join-section'
import BlueSection from '../shared/blue-section'

const NewLandingPage = ({ location }: PageProps): JSX.Element => {
  const internalSectionRefs: SectionRefs = {
    'Causes': React.useRef<any>(),
    'Contributors': React.useRef<any>(),
    'Join': React.useRef<any>(),
  }

  return (
    <Layout
      additionalClassNames="new-landing-page"
      header={<Header location={location} internalSectionRefs={internalSectionRefs} />}
    >
      <SEO
        meta={[{ property: 'og:image', content: 'https://deploy-preview-200--admiring-carson-42ff06.netlify.app/mhi-og-image.png' },
        { property: 'twitter:image', content: 'https://deploy-preview-200--admiring-carson-42ff06.netlify.app/mhi-og-image.png' }]}
      />
      <Hero />
      <BlueSection ref={internalSectionRefs['Contributors']}>
        <h1>Our leaders join your cause directly, working alongside you to meet your online &amp; offline goals.</h1>
      </BlueSection>
      <Causes ref={internalSectionRefs['Causes']} />
      <Technologies />
      <JoinSection ref={internalSectionRefs['Join']} />
      {/* <SocialMediaBar /> */}
    </Layout>
  )
}

export default NewLandingPage
