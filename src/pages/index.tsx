import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/seo'
import { JoinCardContents } from '../components/join-card'
import { ArrowForward } from '@material-ui/icons'
import { Button, ButtonBase } from '@material-ui/core'
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
          <p>
            The internet sucks. Links are broken, images don’t load, navigation is difficult, translations are nonexistent, requests go slowly, and pages are inaccessible. But its problems go deeper than that. Large corporations have taken control of a once open system. While they have brought efficiency, the platforms they have built are for their benefit, not ours. Big Tech firms make money from ads by using crypto-surveillance coupled with neural network models built by machine learning and not human design. These systems pander to and amplify our basest impulses and fears to get us to click, contributing to a polarized political climate where even basic facts cannot be agreed upon. We have quite literally created a cyborg superorganism that no one knows how to turn off.
          </p>
          <p>
            We need a more human internet, where its users and maintainers work together to fix its issues. The people who maintain the web desperately want to build fulfilling websites for those who use them. What if there were a public platform and collaborative community allowing users and maintainers of the web to have constructive conversations to make it better? Would such an experiment in openness and civility have positive effects beyond those participating in it?
          </p>
          <p>
            We are founding a More Human Internet, a nonprofit, to find out. Our plan is to grant all maintainers of the web free access to use morehumaninternet.org to triage issues reported by, solicit feedback from, announce planned improvements to, and have constructive conversations with their users to improve the design, accessibility, and experience of their websites. In turn, all users of the web would have free access to use morehumaninternet.org to report issues for, give feedback to, request improvements from, and have constructive conversations with maintainers to create more fulfilling online spaces.
          </p>
          <p>
            We are assembling a team of motivated and talented volunteers to build this open platform and  collaborative community. If you value teamwork and believe in this mission, we would love to work with you. People from historically marginalized or underrepresented groups are encouraged to apply so that our team better reflects the diversity of the human experience.
          </p>
          <p>
            The internet is a mirror, giving back at us what we feed into it. Creating a space for its users and maintainers to help one another could radically shift what we see in our online reflection.
          </p>
          <p className="lets-create">
            <Link to="/apply" className="human-blue"><strong>Let’s create a More Human Internet.</strong></Link>
            <span><strong>Let’s create a More Human Internet.</strong></span>
          </p>
          {/* <p className="signature">- Will Weiss</p> */}
        </div>
      </div>
      <JoinCardContents ref={joinCardContentsRef} />
    </Layout>
  )
}
