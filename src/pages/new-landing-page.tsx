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
  const headerRef = React.useRef<HTMLDivElement>()

  const refsToTrack: React.MutableRefObject<HTMLElement>[] = [] // tslint:disable-line:readonly-array
  const makeRefToTrack = (): React.MutableRefObject<any> => {
    const ref = React.useRef()
    refsToTrack.push(ref as any) // tslint:disable-line:no-expression-statement
    return ref as any
  }

  React.useEffect(() => {
    const headerElement = headerRef.current!

    addEventListener(
      'scroll',
      () => {
        const headerBottom = headerElement.getBoundingClientRect().bottom
        refsToTrack.forEach(ref => {
          const elementTop = ref.current!.getBoundingClientRect().top
          const elementDistance = elementTop - headerBottom
          const elementOpacity = Math.max(0, Math.min(1, (elementDistance + 10) / 150))
          ref.current!.style.opacity = String(elementOpacity) // tslint:disable-line:no-expression-statement
        })
      },
      { passive: true }
    )
  }, [])

  return (
    <ParallaxProvider>
      <LayoutWithNewHeader mainClassName="new-landing-page" headerRef={headerRef as any}>
        <div className="rotating-content"></div>
        <div className="sky">
          <div className="new-hero">
            <div className="new-hero-contents">
              <h1 ref={makeRefToTrack()}>
                The time has come for a<br />
                more human internet
              </h1>
              <p ref={makeRefToTrack()}>
                We're on a quest to make the web more transparent
                <br />
                and better aligned with the interests of all people
              </p>
              <Button ref={makeRefToTrack()} className="mhi-button" component={Link} to={`/${useIntl().locale}/demo`}>
                See the demo
              </Button>
            </div>
          </div>
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
