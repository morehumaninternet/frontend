// tslint:disable:no-expression-statement no-class no-this
import React from 'react'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { LayoutWithNewHeader } from '../components/shared/layout'
import Stars from '../components/new-landing-page/stars'
import { MountainBackground1, MountainBackground2 } from '../components/new-landing-page/mountain-background'
import MountainMidground from '../components/new-landing-page/mountain-midground'
import MountainForeground from '../components/new-landing-page/mountain-foreground'

export default function NewLandingPage(): JSX.Element {
  return (
    <ParallaxProvider>
      <LayoutWithNewHeader mainClassName="new-landing-page">
        <div className="">

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
        <div className="post-sky1"></div>
      </LayoutWithNewHeader>
    </ParallaxProvider>
  )
}
