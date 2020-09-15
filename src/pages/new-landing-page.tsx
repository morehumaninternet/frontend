import React from 'react'
import { Link } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import { Button } from '@material-ui/core'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { LayoutWithNewHeader } from '../components/shared/layout'
import Stars from '../components/new-landing-page/stars'
import { MountainBackground1, MountainBackground2 } from '../components/new-landing-page/mountain-background'
import MountainMidground from '../components/new-landing-page/mountain-midground'
import MountainForeground from '../components/new-landing-page/mountain-foreground'
import Astronaut from '../components/new-landing-page/astronaut'
import AstronautStarGroup from '../components/new-landing-page/astronaut-star-group'

export default function NewLandingPage(): JSX.Element {
  return (
    <ParallaxProvider>
      <LayoutWithNewHeader mainClassName="new-landing-page">
        <div className="rotating-content">
          <div className="new-hero">
            <h1>
              The time has come for a<br />
              more human internet
            </h1>
            <p>
              We're on a quest to make the web more transparent
              <br />
              and better aligned with the interests of all people
            </p>
            <Button className="mhi-button" component={Link} to={`/${useIntl().locale}/demo`}>
              See the demo
            </Button>
          </div>
        </div>
        <div className="sky">
          <Stars />
          <div className="mountains-container">
            <div className="mountains">
              <Parallax styleOuter={{ position: 'absolute', width: '100%', top: '7%' }} y={['-30%', '30%']}>
                <MountainBackground1 />
              </Parallax>
              <Parallax styleOuter={{ position: 'absolute', width: '100%', top: '4.5%' }} y={['-30%', '30%']}>
                <MountainBackground2 />
              </Parallax>
              <Parallax styleOuter={{ position: 'absolute', width: '100%', top: '7.5%' }} y={['-15%', '14%']}>
                <MountainMidground />
              </Parallax>
              <MountainForeground />
              <svg viewBox="0 0 1440 397" fill="none" className="mountain-placeholder" preserveAspectRatio="none" />
            </div>
          </div>
        </div>
        <div className="post-sky1">
          <AstronautStarGroup />
          <Parallax styleOuter={{ position: 'absolute', width: '100%', top: '-5%', left: '-12%' }} y={['40%', '-40%']}>
            <Astronaut />
          </Parallax>
        </div>
      </LayoutWithNewHeader>
    </ParallaxProvider>
  )
}
