import React from 'react'
import Layout from './layout/'
import Introduction from './introduction'
import Steps from './steps'
import Accordion from './accordion'
import GetUpdates from './get-updates'

const RoarPage = (): JSX.Element => {
  return (
    <Layout>
      <Introduction />
      <Steps />
      <Accordion />
      <GetUpdates />
    </Layout>
  )
}

export default RoarPage
