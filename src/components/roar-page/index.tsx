import React from 'react'
import { Layout } from '../shared/layout'
import useHeader from './useHeader'

import GetUpdates from './get-updates'


const RoarPage = ({ location }: PageProps): JSX.Element => {
  const { header, internalSectionRefs, makeAndTrackRef } = useHeader({
    location,
    internalSections: ['How it works', 'Learn more'],
    otherLinks: [
      <a
        className="mhi-button btn btn--download"
        rel="noopener noreferrer"
        href="https://chrome.google.com/webstore/detail/roar/jfcmnmgckhjcflmljjgjjilmjhbgdfkc"
      >
        Install the free extension
      </a>
    ],
  })

  return (
    <Layout additionalClassNames="roar" footerKind="v2" header={header}>
      <div ref={internalSectionRefs['hero']} style={{ backgroundColor: 'red', width: '100%', height: '100vh' }} />
      <div ref={internalSectionRefs['How it works']} style={{ backgroundColor: 'green', width: '100%', height: '100vh' }}>

      </div>
      <div ref={internalSectionRefs['Learn more']} style={{ backgroundColor: 'purple', width: '100%', height: '100vh' }}>

      </div>
      <GetUpdates />
    </Layout>
  )
}

export default RoarPage
