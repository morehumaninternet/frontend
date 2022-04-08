import React from 'react'
import { Layout } from '../shared/layout'
import useHeader from './useHeader'

import GetUpdates from '../shared/get-updates'
import Hero from './hero'
import Leaders from './leaders'
import Causes from './causes'
import Technologies from './technologies'
// import Contributors from './contributors'
import SocialMediaBar from '../shared/social-media-bar'
import useExplicitHeightOnIPhone from '../../effects/useExplicitHeightOnIPhone'
import SEO from '../shared/seo'
import { ApplicationForm } from '../shared/application-form'

const NewLandingPage = ({ location }: PageProps): JSX.Element => {
  const navigator = typeof window === 'undefined' ? undefined : window.navigator
  const { header, internalSectionRefs, dotsRef } = useHeader(location, navigator)

  useExplicitHeightOnIPhone(internalSectionRefs['hero'], internalSectionRefs['Causes']) // tslint:disable-line:no-expression-statement

  const [availability, setAvailability] = React.useState('volunteer');

  return (
    <Layout
      additionalClassNames="new-landing-page"
      header={header}
      announcement={
        <div style={{ width: '100%', height: '200px', backgroundColor: 'red' }} />
      }
    >
      <SEO />
      <Hero ref={internalSectionRefs['hero']} dotsRef={dotsRef} />
      <Leaders />
      <Causes ref={internalSectionRefs['Causes']} />
      {/* <Contributors ref={internalSectionRefs['Contributors']} /> */}
      <Technologies />
      <GetUpdates ref={internalSectionRefs['Workshops']} />
      <ApplicationForm ref={internalSectionRefs['Join']} availability={availability} setAvailability={setAvailability}/>
      <SocialMediaBar />

    </Layout>
  )
}

export default NewLandingPage
