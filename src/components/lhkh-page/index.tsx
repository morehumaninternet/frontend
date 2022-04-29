import React from 'react'
import { Layout } from '../shared/layout'
import { Header } from '../shared/header'
import SEO from '../shared/seo'
import { Cause, CauseImage, CausesSection, CauseTextContent } from '../shared/causes'
import BlueSection from '../shared/blue-section'
import { CheckmarkList } from './checkmark-list'

const LHKHPage = (): JSX.Element => {
  return (
    <Layout
      additionalClassNames="new-landing-page"
      header={<Header />}
    >
      <SEO />
      <section className="causes">
        <div className="causes__content" style={{ gridTemplateRows: '1fr 5.5fr 1fr' }}>
          <Cause
            cause="lhkh"
            imgSrc="/causes/lhkh_hero.png"
            borderColor="#FA759E"
            heading="Livable Hawaii Kai Hui"
            description={`More Human Internet is excited to be partnering with Livable Hawaii Kai Hui to advance their online strategy, bringing more volunteers to help their mission of stewarding the irreplaceable cultural and natural resources of East Honolulu`}
          />
        </div>
      </section>
      <BlueSection>
        <div>
          <h2><i>A`ohe hana nui ka alu`ia</i></h2>
          <h3>No task is too big when done together</h3>
          <p style={{ textAlign: 'right' }}>— Mary Kawena Pukui (`Olelo No`eau)</p>
        </div>

      </BlueSection>
      <CausesSection rightToLeft>
        <>
          <CauseImage src="/causes/lhkh_reeds.png" borderColor="#FA759E" />
          <CauseTextContent
            heading="Protecting Hawaii’s Land"
            description={'From its inception 14 years ago, Livable Hawaii Kai Hui has been organizing people to protect, improve and care for the resources of east honolulu in perpetuity'}
          />
        </>
        <>
          <CauseImage src="/causes/lhkh_hale_background.png" borderColor="#6FCF97" />
          <div className="cause__content">
            <div>
              <h2 className="human-blue">Advancing Online Strategy</h2>
              <p>More Human Internet is excited to be partnering with Livable Hawaii Kai Hui to advance their online strategy, bringing more volunteers to help their mission of stewarding the irreplaceable cultural and natural resources of East Honolulu</p>
              <CheckmarkList
                notes={[
                  'Modernize website to xxx',
                  'Increase volunteership by streamlining signup process and automating event notifications',
                  'Improve social media followership with consistent branding'
                ]}
              />
            </div>
          </div>
        </>
        <>
          <CauseImage src="/causes/lhkh_plant.png" borderColor="#164176" />
          <div className="cause__content">
            <div>
              <h2 className="human-blue">Working Together</h2>
              <p>More Human Internet is excited to be partnering with Livable Hawaii Kai Hui to advance their online strategy, bringing more volunteers to help their mission of stewarding the irreplaceable cultural and natural resources of East Honolulu</p>
              <p>By collaborating empathically, we feel the challenges they are facing intimately and work to address them</p>
            </div>
          </div>
        </>
      </CausesSection>
    </Layout >
  )
}

export default LHKHPage
