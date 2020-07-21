import React from 'react'
import { Link } from 'gatsby'
import { ArrowForward } from '@material-ui/icons'
import { Avatar, Button, ButtonBase } from '@material-ui/core'
import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/seo'
import { JoinCardContents } from '../components/join-card'
import Manifesto from '../components/manifesto'


export default function IndexPage(): JSX.Element {

  const joinCardContentsRef: React.MutableRefObject<HTMLDivElement> = React.useRef() as any
  const headerRef: React.MutableRefObject<HTMLDivElement> = React.useRef() as any
  const heroRef: React.MutableRefObject<HTMLDivElement> = React.useRef() as any
  const logoRef: React.MutableRefObject<SVGSVGElement> = React.useRef() as any

  const [logoDistanceFromHeroBottom, setLogoDistanceFromHeroBottom] = React.useState(Infinity)

  React.useEffect(() => {
    function onScroll() {
      setLogoDistanceFromHeroBottom(
        heroRef.current.getBoundingClientRect().bottom -
        logoRef.current.getBoundingClientRect().bottom
      )
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  })

  return (
    <Layout
      mainClassName="index"
      headerRef={headerRef}
      logoRef={logoRef}
      logoDistanceFromHeroBottom={logoDistanceFromHeroBottom}
      // Use CSS to hide apply-link on mobile
      headerLinks={
        <ButtonBase className="apply-link" component={Link} to="/apply">
          Apply to join &nbsp;&nbsp;<ArrowForward/>
        </ButtonBase>
      }
    >
      <SEO title="Home" />
      <Hero heroRef={heroRef}>
        <h1 className="white">Be part of a more human internet</h1>
        <h2 className="white">Join a collaborative community creating a public platform for users and maintainers of the web</h2>
      </Hero>
      <div className="manifesto">
        <div className="manifesto-contents">
          <Manifesto />
          <div className="manifesto-signature">
            <div className="signature-texts">
              <img className="signature" src="signature.png"/>
              <p>Will Weiss</p>
            </div>
            <div className="spacer"></div>
            <a href="https://github.com/will-weiss">
              <Avatar className="avatar" src="will-weiss.jpg" />
            </a>
          </div>
        </div>
      </div>
      {/* The join card is only shown on mobile */}
      <JoinCardContents ref={joinCardContentsRef} />
    </Layout>
  )
}
