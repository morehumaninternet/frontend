import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/shared/layout'
import Hero from '../components/shared/hero'
import SEO from '../components/shared/seo'
import DesignsShowcase from '../components/landing-page/designs-showcase'
import ApplicationForm from '../components/landing-page/application-form'
import setLogoFade from '../utils/setLogoFade'
import { injectIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"

 class IndexPage extends React.Component<{ intl:any, data: any }> {

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
          <h1 className="white">{this.props.intl.formatMessage({ id: "Index-Title1" })}</h1>
          <h2 className="white">{this.props.intl.formatMessage({ id: "Index-Title2" })}</h2>
        </Hero>
        <div className="posthero">
          <DesignsShowcase />
          <div className="manifesto">
            <h1 className="manifesto-item">{this.props.intl.formatMessage({ id: "Index-Why1" })}</h1>
            <div className="manifesto-item manifesto-contents">
            <p className="indent">
            {this.props.intl.formatMessage({ id: "Index-Why2" })}
              
            </p>
            <p className="indent">
            {this.props.intl.formatMessage({ id: "Index-Why3" })}              
            </p>
            <p><strong>{this.props.intl.formatMessage({ id: "Index-Why4" })}</strong></p>
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
            <h1 className="manifesto-item">{this.props.intl.formatMessage({ id: "Index-WeNeedYou1" })}</h1>
            <div className="manifesto-item manifesto-contents">
              <p>
              {this.props.intl.formatMessage({ id: "Index-WeNeedYou2" })}
                
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
export default injectIntl(IndexPage)
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