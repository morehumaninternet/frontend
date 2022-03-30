import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/shared/layout'
import SEO from '../components/shared/seo'

export default () => (
  <Layout style={{
    display: 'grid',
    gridTemplateRows: '1fr auto'
   }}>
    <SEO pageTitle="404: Not found" />
    <div style={{
      margin: 25
    }}>
      <h1>
        404: page not found
      </h1>
      <p>Sorry, but the page you requested could not be found. <Link to="/">Return home.</Link></p>
    </div>
  </Layout>
)
