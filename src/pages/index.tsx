import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/shared/layout'
import Hero from '../components/shared/hero'
import SEO from '../components/shared/seo'
import DesignsShowcase from '../components/landing-page/designs-showcase'
import ApplicationForm from '../components/landing-page/application-form'
import setLogoFade from '../utils/setLogoFade'
import { useIntl } from 'react-intl'


export default function IndexPage({ data }: { data: any }) {

  const intl = useIntl()

  const headerRef = React.useRef<HTMLDivElement>()
  const heroRef = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    const hero = heroRef.current!
    let heroEndsAt = hero.offsetTop + hero.offsetHeight

    const onScroll = () => {
      const headerIsFixed = window.getComputedStyle(headerRef.current!).position === 'fixed'
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
  }, [])

  return (
    <Layout
      mainClassName="index"
      logoAgainstHero={true}
      headerRef={headerRef as any}
    >
      <SEO />
      <Hero additionalClassNames="index" heroRef={heroRef as any}>
        <h1 className="white">{intl.formatMessage({ id: "Index-Title1" })}</h1>
        <h2 className="white">{intl.formatMessage({ id: "Index-Title2" })}</h2>
      </Hero>
      <div className="posthero">
        <DesignsShowcase />
        <div className="manifesto">
          <h1 className="manifesto-item">{intl.formatMessage({ id: "Index-Why1" })}</h1>
          <div className="manifesto-item manifesto-contents">
          <p className="indent">
            {intl.formatMessage({ id: "Index-Why2" })}
          </p>
          <p className="indent">
            {intl.formatMessage({ id: "Index-Why3" })}
          </p>
          <p><strong>{intl.formatMessage({ id: "Index-Why4" })}</strong></p>
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
          <h1 className="manifesto-item">{intl.formatMessage({ id: "Index-WeNeedYou1" })}</h1>
          <div className="manifesto-item manifesto-contents">
            <p>
            {intl.formatMessage({ id: "Index-WeNeedYou2" })}

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
