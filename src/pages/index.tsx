import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { ArrowForward } from '@material-ui/icons'
import { ButtonBase } from '@material-ui/core'
import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/seo'
import Designs from '../components/designs'
import Join from '../components/join'
import Manifesto from '../components/manifesto'
import setLogoFade from '../utils/setLogoFade'


export default class IndexPage extends React.Component<{ data: any }> {

  headerRef = React.createRef<HTMLDivElement>()
  heroRef = React.createRef<HTMLDivElement>()

  //
  componentDidMount() {
    const hero = this.heroRef.current!
    let heroEndsAt = hero.offsetTop + hero.offsetHeight

    const runUpdate = () => {
      const headerIsFixed = window.getComputedStyle(this.headerRef.current!).position === 'fixed'
      if (!headerIsFixed) {
        return setLogoFade(0)
      }

      const logoDistanceFromHeroBottom = heroEndsAt - window.scrollY
      if (logoDistanceFromHeroBottom > 100) {
        return setLogoFade(0)
      }

      const nextLogoFade = (100 - Math.max(0, logoDistanceFromHeroBottom)) / 100
      return setLogoFade(nextLogoFade)
    }

    window.addEventListener('resize', () => {
      heroEndsAt = hero.offsetTop + hero.offsetHeight
      runUpdate()
    })

    window.addEventListener('scroll', runUpdate)
  }

  render(): JSX.Element {
    return (
      <Layout
        mainClassName="index"
        logoAgainstHero={true}
        headerRef={this.headerRef}
        // Use CSS to hide apply-link on mobile
        headerLinks={
          <ButtonBase className="apply-link">
            Apply &nbsp;&nbsp;<ArrowForward/>
          </ButtonBase>
        }
      >
        <SEO />
        <Hero additionalClassNames="index" heroRef={this.heroRef}>
          <h1 className="white">The internet's helpdesk</h1>
          <h2 className="white">Join us in our quest to make the web more transparent and better aligned with the interests of all people.</h2>
        </Hero>
        <div className="posthero">
          <Designs />
          <div className="manifesto">
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
                <Img alt="Will Weiss portrait" className="avatar" fixed={this.props.data.willAvatar.childImageSharp.fixed} />
              </a>
            </div>
          </div>
          <Join />
        </div>
      </Layout>
    )
  }
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