import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/seo'
import { JoinCardContents } from '../components/join-card'
import { ArrowForward } from '@material-ui/icons'
import { ButtonBase } from '@material-ui/core'
import '../styles/index.scss'


export default function IndexPage({ location }: { location: { hash: string } }): JSX.Element {

  const joinCardContentsRef: React.MutableRefObject<HTMLDivElement> = React.useRef() as any

  React.useEffect(() => {
    if (location.hash === '#apply') {
      // I have no clue why this setTimeout is necessary, but immediately trying to scroll doesn't work
      // I've confirmed that the joinCardContentsRef.current has not changed after the timer has run, so it must be something else
      setTimeout(() => {
        window.scrollTo(0, joinCardContentsRef.current!.offsetTop)
      })
    }
  }, [location.hash])

  console.log('joinCardContentsRef', joinCardContentsRef)

  console.log('about to return')
  return (
    <Layout
      mainClassName="index"
      // Use CSS to show one on mobile and the other on desktop
      headerLinks={
        <>
          <ButtonBase component={Link} to="/apply">
            Apply to join &nbsp;&nbsp;<ArrowForward/>
          </ButtonBase>
          <ButtonBase component={'a'} href="#apply">
            Apply to join &nbsp;&nbsp;<ArrowForward/>
          </ButtonBase>
        </>
      }
    >
      <SEO title="Home" />
      <Hero>
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
