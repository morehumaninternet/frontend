import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../shared/layout'
import { Header, SectionRefs } from '../shared/header'
import Hero from './hero'
import Causes, { Cause, CauseImage, CauseTextContent } from '../shared/causes'
import Technologies from './technologies'
import SocialMediaBar from '../shared/social-media-bar'
import SEO from '../shared/seo'
import JoinSection from './join-section'
import BlueSection from '../shared/blue-section'
import PinkDot from '../shared/pink-dot'
import { lhkh } from '../shared/causes'
import { Helmet } from 'react-helmet'


const Announcement = (): JSX.Element => {
  return (
    <section className="causes blue-section announcement" >
      <div className="causes__content" style={{
        gridTemplateColumns: '1fr 25px 2fr',
        gridTemplateRows: '5.5fr',
      }}>
        <>
          <CauseImage
            src={lhkh.imgSrc}
            borderColor={lhkh.borderColor}
          />
          <CauseTextContent
            description={`More Human Internet is excited to be partnering with Livable Hawaii Kai Hui to advance their online strategy, bringing more volunteers to help their mission of stewarding the irreplaceable cultural and natural resources of East Honolulu.`}
            href={lhkh.href}
            style={{
              gridRow: '1',
              textAlign: 'left'
            }}
          />
        </>
      </div>
    </section>
  )
}

const NewLandingPage = ({ location }: PageProps): JSX.Element => {
  const internalSectionRefs: SectionRefs = {
    'Causes': React.useRef<any>(),
    'Contributors': React.useRef<any>(),
    'Join': React.useRef<any>(),
  }

  return (
    <Layout
      additionalClassNames="new-landing-page"
      header={
        <>
          <Announcement />
          <Header location={location} internalSectionRefs={internalSectionRefs} />
        </>}
    >
      <SEO />
      <Hero />
      <BlueSection ref={internalSectionRefs['Contributors']}>
        <h1>Our leaders join your cause directly, working alongside you to meet your online &amp; offline goals.</h1>
      </BlueSection>
      <PinkDot />
      <Causes ref={internalSectionRefs['Causes']} />
      <Technologies />
      <JoinSection ref={internalSectionRefs['Join']} />
      {/* <SocialMediaBar /> */}
    </Layout>
  )
}

export default NewLandingPage
