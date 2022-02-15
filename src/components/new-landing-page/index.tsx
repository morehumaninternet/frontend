import React from 'react'
// @ts-ignore
import { ParallaxProvider } from 'react-scroll-parallax'
import { Layout } from '../shared/layout'
import SEO from '../shared/seo'
import Hero from './hero'

export default function LandingPage({ location }: PageProps): JSX.Element {
  return (
    <ParallaxProvider>
      <Layout additionalClassNames="landing-page">
        <SEO />
        <article className="sky start" >
          <Hero />
        </article>
      </Layout>
    </ParallaxProvider>
  )
}
