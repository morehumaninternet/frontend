import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/seo'
import { JoinCardContents } from '../components/join-card'
import { ArrowForward } from '@material-ui/icons'
import { Button, ButtonBase } from '@material-ui/core'
import '../styles/index.scss'


const ApplyButtonContents = () => (<>Apply to join &nbsp;&nbsp;<ArrowForward/></>)

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
          <ButtonBase component={Link} to="/apply">
            <ApplyButtonContents />
          </ButtonBase>
          <Button className="apply" onClick={() => window.scrollTo(0, joinCardContentsRef.current!.offsetTop - 28)}>
            <ApplyButtonContents />
          </Button>
        </>
      }
    >
      <SEO title="Home" />
      <Hero heroRef={heroRef}>
        <h1 className="white">Help build a public platform and collaborative community for users and maintainers of the web</h1>
      </Hero>
      <div className="manifesto">
        <div className="manifesto-contents">
          <p>
            The internet sucks. Links are broken, images don’t load, navigation is difficult, translations are nonexistent, requests go slowly, and pages are inaccessible. But its problems go deeper than that. Large corporations have taken control of a once open system. While they have brought efficiency, the platforms they have built are for their benefit, not ours. Big Tech firms make money off ads by using crypto-surveillance coupled with neural network models built by machine learning and not human design. These systems pander to our basest impulses to get us to click, contributing to a polarized political climate where even basic facts cannot be agreed upon. We quite literally have a cyborg superorganism that no one knows how to turn off.
          </p>
          <p>
            We need a more human internet, where its users and maintainers work together to fix its issues. I believe that people who maintain the web desperately want to build fulfilling websites for those who use them. What if there were a public platform and collaborative community allowing users and maintainers of the web to have constructive conversations to make it better? Would such an experiment in openness and civility have positive effects beyond those participating in it?
          </p>
          <p>
            We are founding a More Human Internet, a nonprofit, to find out. If you are a developer who is optimistic that the internet can be better and are motivated to help, we would love to work with you. People from historically marginalized or underrepresented groups are encouraged to apply so that our team better reflects the diversity of the human experience.
          </p>
          <p>
            Let’s create a More Human Internet.
          </p>
        </div>
      </div>
      <JoinCardContents ref={joinCardContentsRef} />
    </Layout>
  )
}
