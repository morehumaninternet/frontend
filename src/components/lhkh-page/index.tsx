import React from 'react'
import { Layout } from '../shared/layout'
import { Header } from '../shared/header'
import SEO from '../shared/seo'
import { Cause, CauseImage, CausesSection, CauseTextContent } from '../shared/causes'
import BlueSection from '../shared/blue-section'
import { CheckmarkList } from './checkmark-list'
import JoinSection from './join-section'
import { ApplicationForm, EmailField, NameField } from '../shared/application-form'
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@material-ui/core'

const LHKHPage = (): JSX.Element => {
  return (
    <Layout additionalClassNames="new-landing-page lhkh" header={<Header />}>
      <SEO
        pageTitle="Partering with Livable Hawaii Kai Hui"
        description="More Human Internet is partnering with Livable Hawaii Kai Hui to advance their online strategy"
        ogImageSrc="https://morehumaninternet.org/lhkh_og_image.png"
      />
      <section className="causes">
        <div className="causes__content" style={{ gridTemplateRows: '1fr 5.5fr 1fr' }}>
          <Cause
            cause="lhkh"
            imgSrc="/causes/lhkh_hero.png"
            borderColor="#FA759E"
            heading="Livable Hawaii Kai Hui"
            description={`More Human Internet is excited to be partnering with Livable Hawaii Kai Hui to advance their online strategy, bringing more volunteers to help their mission of stewarding the irreplaceable cultural and natural resources of East Honolulu.`}
          />
        </div>
      </section>
      <BlueSection>
        <div>
          <h2>
            <i>`A`ohe hana nui ke alu `ia</i>
          </h2>
          <h3>No task is too big when done together by all</h3>
          <p style={{ textAlign: 'right' }}>— Ōlelo No‘eau: Hawaiian Proverbs & Poetical Sayings, © Bishop Museum</p>
        </div>
      </BlueSection>
      <CausesSection rightToLeft>
        <>
          <CauseImage src="/causes/lhkh_reeds.png" borderColor="#FA759E" />
          <CauseTextContent
            heading="Protecting Hawaii’s Land"
            description={
              'From its inception 18 years ago, Livable Hawaii Kai Hui has been organizing people to protect, improve and care for the resources of Maunalua, on the island of Oahu, in perpetuity.'
            }
          />
        </>
        <>
          <CauseImage src="/causes/lhkh_ka_iwi_circle.png" borderColor="#6FCF97" />
          <div className="cause__content">
            <div>
              <h2 className="human-blue">Advancing Online Strategy</h2>
              <p>More Human Internet technical experts are teaming with Livable Hawaii Kai Hui leaders to improve the organization's online presence. Our goals are to:</p>
              <CheckmarkList
                notes={[
                  'Modernize website, allowing community members to explore their naitive aina and join local events to protect and learn from the land',
                  'Increase volunteership by streamlining signup process and automating event notifications',
                  'Improve social media followership with consistent branding',
                  'Look for opportunities where community-centered technology to help the Hui collaborate to deepen its impact',
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
              <p>Our technology experts are integrated with Livable Hawaii Kai Hui as volunteers working collaboratively to advance the cause</p>
              <p>By collaborating empathically, we feel the challenges they are facing intimately and work to address them</p>
            </div>
          </div>
        </>
      </CausesSection>
      <JoinSection />
      <section className="centered lhkh-donate">
        <div>
          <h1 className="mhi-heading human-blue">Donate</h1>
          <p>Support Livable Hawaii Kai Hui's efforts directly</p>
          <a href="/lhkh-paypal" className="link">Via Paypal</a>
        </div>
      </section>
    </Layout>
  )
}

export default LHKHPage
