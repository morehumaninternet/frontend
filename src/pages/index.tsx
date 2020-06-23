import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { ArrowForward } from '@material-ui/icons'
import { ButtonBase } from '@material-ui/core'
import '../styles/index.css'


const IndexPage = () => (
  <Layout
    headerLinks={
      <ButtonBase
        component={Link}
        to="/apply"
      >
        Apply to join &nbsp;&nbsp;<ArrowForward/>
      </ButtonBase>
    }
  >
    <SEO title="Home" />
    <div className="hero">
      <h1 className="white">Take part in shaping a movement that aims to make internet better for all</h1>
    </div>
    <div className="manifesto">
      <div className="manifesto-contents">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum at eros vitae consequat. Proin aliquam ultrices pharetra. Sed placerat, elit pretium dictum luctus, tortor orci blandit lectus, quis malesuada sapien dui mattis augue. Vestibulum porttitor turpis eget dolor imperdiet aliquam.
        </p>
        <p>
          Quisque consequat pharetra felis at efficitur. Praesent lectus risus, imperdiet vel ante vel, rutrum semper nibh. Aenean tempus turpis ac aliquam fringilla. Aliquam laoreet interdum lorem vitae eleifend. Nullam fringilla, metus in tempus lacinia, dui lacus volutpat quam, nec vulputate nibh dolor a ante. Sed commodo odio in tortor fermentum, non aliquet odio cursus.
        </p>
      </div>
    </div>
  </Layout>
)

export default IndexPage
