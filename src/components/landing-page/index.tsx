import React from 'react'
// @ts-ignore
import { ParallaxProvider } from 'react-scroll-parallax'
import { Layout } from '../shared/layout'
import Stars from './stars'
import Astronaut from './astronaut'
import SEO from '../shared/seo'
import useHeader from './useHeader'
import Team from './team'
import Mountains from './mountains'
import Hero from './hero'
import Donate from './donate'
import TextContainer from './text-container'
import GetUpdates from '../shared/get-updates'
import useExplicitHeightOnIPhone from '../../effects/useExplicitHeightOnIPhone'

export default function LandingPage({ location }: PageProps): JSX.Element {
  const postSky2Ref = React.useRef<HTMLDivElement>()

  const { header, internalSectionRefs, makeAndTrackRef } = useHeader({
    location,
    fadeAtRef: postSky2Ref,
  })

  // tslint:disable-next-line: no-expression-statement
  useExplicitHeightOnIPhone(internalSectionRefs.start)

  const [availability, setAvailability] = React.useState<Availability>('signup')

  const volunteer = () => {
    // tslint:disable-next-line: no-expression-statement
    if (availability !== 'volunteer') setAvailability('volunteer')
    return internalSectionRefs.join.current!.scrollIntoView()
  }

  return (
    <ParallaxProvider>
      <Layout additionalClassNames="landing-page orig" header={header}>
        <SEO />
        <article className="sky start" ref={internalSectionRefs.start as any}>
          <Hero makeAndTrackRef={makeAndTrackRef} joinRef={internalSectionRefs.join} />
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
              Join the community
            </h1>
            <p ref={makeAndTrackRef()}>Join our dedicated team of international volunteers to help make this vision a reality</p>
            <GetUpdates ref={makeAndTrackRef()} />
            <Team makeAndTrackRef={makeAndTrackRef} volunteer={volunteer} />
          </div>
        </div>
        <Donate makeAndTrackRef={makeAndTrackRef} />
      </Layout>
    </ParallaxProvider>
  )
}
