import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Hero from '../components/hero'
import { Avatar } from '@material-ui/core'



function IssueBreadcrumbs() {
  return (
    <div className="issue-breadcrumbs">
      <img src="/goalco.ico" /> goalco.com / Issues / 40305
    </div>
  )
}


export default function IssuePage(props: any): JSX.Element {

  return (
    <Layout
      logoFade={1}
      headerLinks={
        <Avatar
          src="github.com/will-weiss.png"
        />
      }
    >
      <SEO pageTitle="Issue" />
      <Hero additionalClassNames="issue">
        <IssueBreadcrumbs  />
      </Hero>
    </Layout>
  )
}
