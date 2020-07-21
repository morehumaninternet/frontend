import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { ArrowForward } from '@material-ui/icons'
import { Avatar, Button, ButtonBase } from '@material-ui/core'
import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/seo'
import { JoinCardContents } from '../components/join-card'
import Manifesto from '../components/manifesto'


export default function IndexPage({ data }: { data: any }): JSX.Element {

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
      <Hero additionalClassNames="index" heroRef={heroRef}>
        <h1 className="white">Be part of a more human internet</h1>
        <h2 className="white">Join a collaborative community creating a public platform for users and maintainers of the web</h2>
      </Hero>
      <div className="manifesto">
        <div className="manifesto-item manifesto-contents">
          <Manifesto />
        </div>
        <div className="manifesto-item manifesto-signature">
          <div className="signature-texts">
            <img className="signature" src="signature.png"/>
            <p>Will Weiss</p>
          </div>
          <div className="spacer"></div>
          <a href="https://github.com/will-weiss">
            <Img className="avatar" fixed={data.willAvatar.childImageSharp.fixed} style={{ borderRadius: '50%' }} />
            {/* <Avatar className="avatar" src="will-weiss.jpg" /> */}
          </a>
        </div>
      </div>
      {/* The join card is only shown on mobile */}
      <JoinCardContents ref={joinCardContentsRef} />
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