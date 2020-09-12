// tslint:disable:no-expression-statement no-class no-this
import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { LayoutWithHeader } from '../components/shared/layout'
import Hero from '../components/shared/hero'
import SEO from '../components/shared/seo'
import DesignsShowcase from '../components/landing-page/designs-showcase'
import ApplicationForm from '../components/landing-page/application-form'
import setLogoFade from '../utils/setLogoFade'
import { FormattedMessage } from 'gatsby-plugin-intl'
import Signature from '../images/signature.png'

export default class IndexPage extends React.Component<{ data: any }> {
  headerRef = React.createRef<HTMLDivElement>()
  heroRef = React.createRef<HTMLDivElement>()

  componentDidMount(): void {
    const hero = this.heroRef.current!
    let heroEndsAt = hero.offsetTop + hero.offsetHeight // tslint:disable-line:no-let

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

    function onResize(): void {
      heroEndsAt = hero.offsetTop + hero.offsetHeight
      onScroll()
    }

    onResize()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll)
  }

  render(): JSX.Element {
    return (
      <LayoutWithHeader mainClassName="index" logoAgainstHero={true} headerRef={this.headerRef}>
        <SEO />
        <Hero additionalClassNames="index" heroRef={this.heroRef}>
          <h1 className="white">
            <FormattedMessage id="index_header1" />
          </h1>
          <h2 className="white">
            <FormattedMessage id="index_header2" />
          </h2>
        </Hero>
        <div className="posthero">
          <DesignsShowcase />
          <div className="manifesto">
            <h1 className="manifesto-item">
              <FormattedMessage id="index_manifesto_header" />
            </h1>
            <div className="manifesto-item manifesto-contents">
              <p className="indent">
                <FormattedMessage id="index_manifesto_content1" />
              </p>
              <p className="indent">
                <FormattedMessage id="index_manifesto_content2" />
              </p>
              <p>
                <strong>
                  <FormattedMessage id="index_manifesto_content3" />
                </strong>
              </p>
            </div>
            <div className="manifesto-item manifesto-signature">
              <div className="signature-texts">
                <img src={Signature} alt="Will Weiss signature" />
                <p>Will Weiss</p>
              </div>
              <div className="spacer"></div>
              <a href="https://github.com/will-weiss">
                <Img alt="Will Weiss portrait" className="avatar" fixed={this.props.data.willAvatar.childImageSharp.fixed} />
              </a>
            </div>
            <h1 className="manifesto-item">
              <FormattedMessage id="index_weneedyou1" />
            </h1>
            <div className="manifesto-item manifesto-contents">
              <p>
                <FormattedMessage id="index_weneedyou2" />
              </p>
            </div>
            <div className="manifesto-item form">
              <ApplicationForm />
            </div>
          </div>
        </div>
      </LayoutWithHeader>
    )
  }
}
export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
      fixed(width: 55, height: 55, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    willAvatar: file(relativePath: { eq: "will-weiss.jpg" }) {
      ...squareImage
    }
    signature: file(relativePath: { eq: "signature.png" }) {
      ...squareImage
    }
  }
`
