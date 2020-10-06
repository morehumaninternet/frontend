// tslint:disable:no-expression-statement
import React from 'react'
import { LocalizedLink } from 'gatsby-theme-i18n'
import { FormattedMessage } from 'react-intl'
import { Button } from '@material-ui/core'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { Layout } from '../shared/layout'
import Stars from './svgs/stars'
import { MountainBackground1, MountainBackground2 } from './svgs/mountain-background'
import MountainMidground from './svgs/mountain-midground'
import MountainForeground from './svgs/mountain-foreground'
import Astronaut from './svgs/astronaut'
import AstronautStarGroup from './svgs/astronaut-star-group'
import SEO from '../../components/shared/seo'
import ApplicationForm from '../../components/shared/application-form'
import SimpleFeedbackWidget from '../../components/simple-feedback-widget'
import Team from './team'

import useHeader from './useHeader'

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
      const sky = document.querySelector('.sky') as any
      sky.style.height = getComputedStyle(sky).height
    }
  }, [])

  return (
    <ParallaxProvider>
      <Layout additionalClassNames="new-landing-page has-new-header" header={header}>
        <SEO />
        <article className="sky start" ref={internalSectionRefs.start as any}>
          <div className="new-hero">
            <h1 className="mhi-heading" ref={makeAndTrackRef()}>
              The time has come for a<br />
              more human internet
            </h1>
            <p ref={makeAndTrackRef()}>
              We're on a quest to make the web more transparent
              <br />
              and better aligned with the interests of all people
            </p>
            <div className="container" ref={makeAndTrackRef()}>
              <Button className="mhi-button" component={LocalizedLink} to="/demo">
                See the demo
              </Button>
            </div>
          </div>
          <Stars x={10000} y={1000} starCount={300} />

          <div className="mountain-background">
            <Parallax
              styleOuter={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0' }}
              styleInner={{ width: '100%', height: '100%' }}
              y={['-5%', '60%']}
            >
              <MountainBackground1 />
            </Parallax>
            <Parallax
              styleOuter={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0' }}
              styleInner={{ width: '100%', height: '100%' }}
              y={['-5%', '60%']}
            >
              <MountainBackground2 />
            </Parallax>
            <Parallax
              styleOuter={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0' }}
              styleInner={{ width: '100%', height: '100%' }}
              y={['2%', '40%']}
            >
              <MountainMidground />
            </Parallax>
          </div>
          <MountainForeground />
        </article>
        <div className="post-sky1">
          <div className="manifesto">
            <div className="astronaut-container">
              <AstronautStarGroup />
              <Parallax styleOuter={{ position: 'absolute', width: '100%', top: '0', left: '0' }} y={['100%', '-5%']}>
                <Astronaut />
              </Parallax>
            </div>
            <div className="text-container">
              <div className="about" ref={internalSectionRefs.about as any}>
                <h2 className="mhi-heading" ref={makeAndTrackRef()}>
                  About
                </h2>
                <p ref={makeAndTrackRef()}>
                  <FormattedMessage id="index_aboutus1" />
                </p>
                <p ref={makeAndTrackRef()}>
                  <FormattedMessage id="index_aboutus2" />
                </p>
                <p ref={makeAndTrackRef()}>
                  <FormattedMessage id="index_aboutus3" />
                  <LocalizedLink className="same-color" to="/demo">
                    <FormattedMessage id="index_aboutus4" />
                  </LocalizedLink>
                  <FormattedMessage id="index_aboutus5" />
                </p>
              </div>

              <div className="why" ref={internalSectionRefs.why as any}>
                <h2 className="mhi-heading" ref={makeAndTrackRef()}>
                  Why
                </h2>
                <p ref={makeAndTrackRef()}>
                  <FormattedMessage id="index_why1" />
                </p>
                <p ref={makeAndTrackRef()}>
                  <FormattedMessage id="index_why2" />
                </p>
                <p ref={makeAndTrackRef()}>
                  <strong>
                    <FormattedMessage id="index_why3" />
                  </strong>
                </p>
              </div>
            </div>
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
        <SimpleFeedbackWidget />
      </Layout>
    </ParallaxProvider>
  )
}
