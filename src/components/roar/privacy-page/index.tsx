import React from 'react'
import { Layout } from '../../shared/layout'
import Header from '../header'


const RoarPage = ({ location }: PageProps): JSX.Element => {
  return (
    <Layout additionalClassNames="roar-privacy" footerKind="v2" header={<Header />}>
      <p>Privacy Page Content Place Holder</p>
    </Layout>
  )
}

export default RoarPage
