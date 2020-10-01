// tslint:disable:no-expression-statement no-class no-this
import React from 'react'
import Img from 'gatsby-image'
import { LayoutWithHeader } from '../shared/layout'
import Hero from '../shared/hero'
import SEO from '../shared/seo'
import DesignsShowcase from './designs-showcase'
import ApplicationForm from '../shared/application-form/old-application-form'
import setLogoFade from '../../utils/setLogoFade'
import { FormattedMessage } from 'react-intl'
import Signature from '../../images/signature.png'

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
          <h1 className="mhi-heading white">
            <FormattedMessage id="index_header1" />
          </h1>
          <h2 className="mhi-heading white">
            <FormattedMessage id="index_header2" />
          </h2>
        </Hero>
        <div className="posthero">
          <DesignsShowcase />
          <div className="manifesto">
            <h1 className="manifesto-item human-blue center-text">
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
            <h1 className="manifesto-item human-blue center-text" style={{ marginTop: 100 }}>
              <FormattedMessage id="index_aboutus_header" />
            </h1>
            <div className="manifesto-item manifesto-contents">
              <p>
                <FormattedMessage id="index_aboutus1" />
              </p>
              <p>
                <FormattedMessage id="index_aboutus2" />
              </p>
            </div>
            <h1 className="manifesto-item human-blue center-text">
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
