import React from 'react'
// @ts-ignore
import { LocalizedLink } from 'gatsby-theme-i18n'
import { ParallaxProvider } from 'react-scroll-parallax'
import { Layout } from '../shared/layout'
import Stars from './stars'
import Astronaut from './astronaut'
import SEO from '../../components/shared/seo'
import useHeader from './useHeader'
import ApplicationForm from '../../components/shared/application-form'
import SimpleFeedbackWidget from '../../components/simple-feedback-widget'
import Team from './team'
import Mountains from './mountains'
import NewHero from './new-hero'
import Donate from './donate'
import TextContainer from './text-container'
import useExplicitHeightOnIPhone from '../../effects/useExplicitHeightOnIPhone'

export default function NewLandingPage({ location }: PageProps): JSX.Element {
  const postSky2Ref = React.useRef<HTMLDivElement>()

  const { header, internalSectionRefs, makeAndTrackRef } = useHeader({
    location,
    internalSections: ['start', 'about', 'why', 'join'],
    otherLinks: [
      <LocalizedLink className="hide-on-mobile" to="/demo">
        Demo
      </LocalizedLink>,
      <a className="hide-on-mobile" href="https://buymeacoffee.com/morehumaninter">
        Donate
      </a>,
    ],
    fadeAtRef: postSky2Ref,
  })

  // tslint:disable-next-line: no-expression-statement
  useExplicitHeightOnIPhone(internalSectionRefs.start)

  const [availability, setAvailability] = React.useState<string>('signup')

  const volunteer = () => {
    // tslint:disable-next-line: no-expression-statement
    if (availability !== 'volunteer') setAvailability('volunteer')
    return internalSectionRefs.join.current!.scrollIntoView()
  }

  return (
    <ParallaxProvider>
      <Layout additionalClassNames="new-landing-page has-new-header" header={header}>
        <SEO />
        <article className="sky start" ref={internalSectionRefs.start as any}>
          <NewHero makeAndTrackRef={makeAndTrackRef} />
          <Stars x={10000} y={1000} starCount={300} />
          <Mountains />
        </article>
        <div className="post-sky1">
          <div className="manifesto">
            <Astronaut />
            <TextContainer aboutRef={internalSectionRefs.about} whyRef={internalSectionRefs.why} makeAndTrackRef={makeAndTrackRef} />
          </div>
        </div>
        <div className="post-sky2" ref={postSky2Ref as any}>
          <div className="join" ref={internalSectionRefs.join as any}>
            <h1 className="mhi-heading" ref={makeAndTrackRef()}>
              Be a part of our community
            </h1>
            <ApplicationForm availability={availability} setAvailability={setAvailability} makeAndTrackRef={makeAndTrackRef} />
          </div>
          <div className="team-container">
            <Team makeAndTrackRef={makeAndTrackRef} volunteer={volunteer} />
          </div>
        </div>
        <Donate makeAndTrackRef={makeAndTrackRef} />
        <SimpleFeedbackWidget />
      </Layout>
    </ParallaxProvider>
  )
}
