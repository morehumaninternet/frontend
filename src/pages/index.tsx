import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/seo'
import { JoinCardContents } from '../components/join-card'
import { ArrowForward } from '@material-ui/icons'
import { Button, ButtonBase } from '@material-ui/core'
import Manifesto from '../components/manifesto'
import '../styles/index.scss'


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
      // Use CSS to show one on mobile and the other on desktop
      headerLinks={
        <>
          <ButtonBase className="apply-link" component={Link} to="/apply">
            Apply to join &nbsp;&nbsp;<ArrowForward/>
          </ButtonBase>
          <Button className="apply-link" onClick={() => window.scrollTo(0, joinCardContentsRef.current!.offsetTop - 28)}>
            Apply&nbsp;&nbsp;<ArrowForward/>
          </Button>
        </>
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
        </div>
      </div>
      <JoinCardContents ref={joinCardContentsRef} />
    </Layout>
  )
}
