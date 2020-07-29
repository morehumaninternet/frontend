import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { ArrowForward } from '@material-ui/icons'
import { ButtonBase } from '@material-ui/core'
import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/seo'
import Designs from '../components/designs'
import { JoinCardContents } from '../components/join-card'
import Manifesto from '../components/manifesto'
import onDistanceChange from '../effects/onDistanceChange'


export default function IndexPage({ data }: { data: any }): JSX.Element {

  const joinCardContentsRef: React.MutableRefObject<HTMLDivElement> = React.useRef() as any
  const headerRef: React.MutableRefObject<HTMLDivElement> = React.useRef() as any
  const heroRef: React.MutableRefObject<HTMLDivElement> = React.useRef() as any
  const logoRef: React.MutableRefObject<SVGSVGElement> = React.useRef() as any
  const designsRef: React.MutableRefObject<HTMLDivElement> = React.useRef() as any
  const manifestoRef: React.MutableRefObject<HTMLDivElement> = React.useRef() as any

  const [logoDistanceFromHeroBottom, setLogoDistanceFromHeroBottom] = React.useState(Infinity)
  const [logoFade, setLogoFade] = React.useState(0)

  onDistanceChange(() => {
    setLogoDistanceFromHeroBottom(
      heroRef.current.getBoundingClientRect().bottom -
      logoRef.current.getBoundingClientRect().bottom
    )
  })

  React.useEffect(() => {
    if (!headerRef) return setLogoFade(0)
    const headerIsFixed = window.getComputedStyle(headerRef.current!).position === 'fixed'
    if (!headerIsFixed) return setLogoFade(0)
    if (logoDistanceFromHeroBottom > 100) return setLogoFade(0)
    const nextLogoFade = (100 - Math.max(0, logoDistanceFromHeroBottom)) / 100
    setLogoFade(nextLogoFade)
  }, [headerRef, logoDistanceFromHeroBottom])

  return (
    <Layout
      mainClassName="index"
      headerRef={headerRef}
      logoRef={logoRef}
      logoFade={logoFade}
      // Use CSS to hide apply-link on mobile
      headerLinks={
        <ButtonBase className="apply-link" component={Link} to="/apply">
          Apply to join &nbsp;&nbsp;<ArrowForward/>
        </ButtonBase>
      }
    >
      <SEO />
      <Hero additionalClassNames="index" heroRef={heroRef}>
        <h1 className="white">The internet's helpdesk</h1>
        <h2 className="white">Join us in our quest to make the web more transparent and better aligned with the interests of all people.</h2>
      </Hero>
      <div className="posthero">
        <Designs designsRef={designsRef} manifestoRef={manifestoRef} />
        <div className="manifesto" ref={manifestoRef}>
          <h1>Why we're building this</h1>
          <div className="manifesto-item manifesto-contents">
            <Manifesto />
          </div>
          <div className="manifesto-item manifesto-signature">
            <div className="signature-texts">
              <img alt="Will Weiss signature" className="signature" src="signature.png"/>
              <p>Will Weiss</p>
            </div>
            <div className="spacer"></div>
            <a href="https://github.com/will-weiss">
              <Img alt="Will Weiss portrait" className="avatar" fixed={data.willAvatar.childImageSharp.fixed} />
            </a>
          </div>
        </div>
        {/* The join card is only shown on mobile */}
        <JoinCardContents ref={joinCardContentsRef} />
      </div>

    </Layout>
  )
}

export const query = graphql`
  query {
    willAvatar: file(relativePath: { eq: "will-weiss.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 55, height: 55, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`