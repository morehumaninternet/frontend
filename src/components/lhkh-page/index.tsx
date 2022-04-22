import React from 'react'
import { Layout } from '../shared/layout'
import { Header } from '../shared/header'
import SEO from '../shared/seo'
import { Cause, CausesSection } from '../shared/causes'

const LHKHPage = (): JSX.Element => {
  return (
    <Layout
      additionalClassNames="new-landing-page"
      header={<Header />}
    >
      <SEO />
      <CausesSection
        causes={[{
          cause: 'lhkh',
          imgSrc: '/causes/lhkh_hero.png',
          borderColor: '#FA759E',
          heading: 'A`ohe hana nui ka alu`ia',
          description: `No task is too big when done together.`,
        }]}
      />
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <div style={{
          maxWidth: 600,
          padding: 25
        }}>
          <p>MHI and LHKH are working together!MHI is using its expertise in technology to help LHKH in its mission to steward the natural and cultural resources of Maunalua on the island of Oahu (or maybe say east Honolulu)</p>
          <p>Section background on LHKH: From its inception 14 years ago, Livable Hawaii Kai Hui has been organizing people to protect, improve and care for the resources of east honolulu in perpetuity. [Include photo of people working on the land]</p>
          <p>MHI is helping LHKH use technology to communicate with its partners, volunteers and the community and manage its activities:
  - website redesign (lead by Barbara Prusiewicz)
  - streamline processes for volunteer signup and paperwork
  (tbd: maybe also a "how we do this" sentence? ie. working closely, 'embedded in the lhkh team', etc.)</p>
        </div>
      </div>
    </Layout>
  )
}

export default LHKHPage
