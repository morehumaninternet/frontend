import React from 'react'
import { Layout } from '../../shared/layout'
import { BigCircle, SmallCircle } from '../../shared/circles'
import Header from '../header'
import Terms from './terms'
import SignInButton from './sign-in-button'
import RoarSEO from '../roar-seo'

const WelcomePage = () => {
  return (
    <Layout additionalClassNames="welcome" header={<Header />}>
      <RoarSEO title="Welcome" />
      <div className="welcome__contents">
        <BigCircle />
        <SmallCircle />
        <div className="wrapper">
          <h1>Thanks for installing Roar!</h1>
          <h2>Let’s get you signed in to make this official</h2>
          <SignInButton />
          <Terms />
        </div>
      </div>
    </Layout>
  )
}

export default WelcomePage
