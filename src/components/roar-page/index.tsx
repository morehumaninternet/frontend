import React from 'react'
import { Layout } from '../shared/layout'
import Header from './header'
import Introduction from './introduction'
import Steps from './steps'
import Accordion from './accordion'
import GetUpdates from './get-updates'

const RoarPage = (): JSX.Element => {
  return (
    <Layout additionalClassNames="roar" footerKind="v2" header={<Header />}>
      <Introduction />
      <Steps />
      <Accordion />
      <GetUpdates />
    </Layout>
  )
}

export default RoarPage
