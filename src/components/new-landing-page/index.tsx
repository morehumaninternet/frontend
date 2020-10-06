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

export default function NewLandingPage(props: any): JSX.Element {
  // User availability
  const [availability, setAvailability] = React.useState<string>('signup')

  const postSky2Ref = React.useRef<HTMLDivElement>()

  const { header, internalSectionRefs, makeAndTrackRef } = useHeader({
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

  // iPhone will change the value of 1vh once you start scrolling, so if we detect you're on an iPhone,
  // we explicitly set the height of the element after its initial render. Resizing never happens, so
  // this hack should be ok.
  React.useEffect(() => {
    const isIPhone = navigator.userAgent.search('iPhone') >= 0
    if (isIPhone) {
      const sky = internalSectionRefs.start.current!
      sky.style.height = getComputedStyle(sky).height // tslint:disable-line:no-expression-statement
    }
  }, [])

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
            <Team makeAndTrackRef={makeAndTrackRef} availability={availability} setAvailability={setAvailability} />
          </div>
        </div>
        <Donate makeAndTrackRef={makeAndTrackRef} />
        <SimpleFeedbackWidget />
      </Layout>
    </ParallaxProvider>
  )
}
