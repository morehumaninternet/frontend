import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/seo'
import DesignsShowcase from '../components/designs-showcase'
import ApplicationForm from '../components/application-form'
import setLogoFade from '../utils/setLogoFade'


export default class IndexPage extends React.Component<{ data: any }> {

  headerRef = React.createRef<HTMLDivElement>()
  heroRef = React.createRef<HTMLDivElement>()

  componentDidMount() {
    const hero = this.heroRef.current!
    let heroEndsAt = hero.offsetTop + hero.offsetHeight

    const onScroll = () => {
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

    function onResize() {
      heroEndsAt = hero.offsetTop + hero.offsetHeight
      onScroll()
    }

    onResize()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll)
  }

  render(): JSX.Element {
    return (
      <Layout
        mainClassName="index"
        logoAgainstHero={true}
        headerRef={this.headerRef}
      >
        <SEO />
        <Hero additionalClassNames="index" heroRef={this.heroRef}>
          <h1 className="white">The internet's helpdesk</h1>
          <h2 className="white">Join us in our quest to make the web more transparent and better aligned with the interests of all people</h2>
        </Hero>
        <div className="posthero">
          <DesignsShowcase />
          <div className="manifesto">
            <h1 className="manifesto-item">Why we're building this</h1>
            <div className="manifesto-item manifesto-contents">
            <p className="indent">
              The internet has lost our trust. We’re frustrated with its many issues — links are broken, images don’t load, navigation is difficult, requests go slowly, pages are inaccessible — but its problems go deeper than that. Large corporations have taken control of a once open system. While they have brought efficiency, the platforms they have built are for their benefit, not ours. Online crypto-surveillance feeds petabytes of data into neural networks to serve personalized ads. These systems, dictated more by machine learning than human design, pander to and amplify our basest impulses and fears to get us to click, contributing to a polarized political climate where even basic facts cannot be agreed upon. We have quite literally created a cyborg superorganism that no one knows how to turn off.
            </p>
            <p className="indent">
              We need an online culture guided by a spirit of transparency and civility. More Human Internet is a nonprofit dedicated to building a free public platform to facilitate dialog between the users and maintainers of the web. We believe the existence of this online space will change how websites are built and how we act within them.
            </p>
            <p><strong>Let's create a More Human Internet.</strong></p>
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
            <h1 className="manifesto-item">We need you</h1>
            <div className="manifesto-item manifesto-contents">
              <p>
                We are assembling an inclusive team of motivated and talented volunteers to build this public platform and collaborative community. If you value teamwork and believe in this mission, we would love to work with you.
              </p>
            </div>
            <div className="manifesto-item form">
              <ApplicationForm />
            </div>
          </div>
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