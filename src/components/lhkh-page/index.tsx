import React from 'react'
import { Layout } from '../shared/layout'
import { Header } from '../shared/header'
import SEO from '../shared/seo'
import { Cause, CauseImage, CausesSection, CauseTextContent } from '../shared/causes'
import BlueSection from '../shared/blue-section'

const CheckmarkIcon = () => (
  <svg className="checkmark-icon" width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M37.1641 17.5039C37.3828 18.5781 37.5 19.6914 37.5 20.832C37.5 30.0234 30.0234 37.5 20.832 37.5C11.6406 37.5 4.16406 30.0234 4.16406 20.832C4.16406 11.6406 11.6406 4.16406 20.832 4.16406C24.2344 4.16406 27.3984 5.19531 30.0391 6.95312L33.0234 3.97266C29.5898 1.48437 25.3828 0 20.832 0C9.34375 0 0 9.34375 0 20.832C0 32.3203 9.34375 41.6641 20.832 41.6641C32.3203 41.6641 41.6641 32.3203 41.6641 20.832C41.6641 18.4844 41.2578 16.2344 40.5391 14.1289L37.1641 17.5039Z"
      fill="#164176"
    />
    <path d="M41.6641 4.16406L18.75 27.082L10.4141 18.75" stroke="#164176" stroke-width="4.16667" stroke-miterlimit="10" />
  </svg>
)

const Checkmark = ({ note }: { note: string }) => (
  <div className="checkmark">
    <div className="centered">
      <CheckmarkIcon />
    </div>
    <p>{note}</p>
  </div>
)

const CheckmarkList = ({ notes }: { notes: ReadonlyArray<string> }) => (
  <div className="checkmark-list">
    {notes.map(note => (
      <Checkmark note={note} />
    ))}
  </div>
)

const LHKHPage = (): JSX.Element => {
  return (
    <Layout additionalClassNames="new-landing-page" header={<Header />}>
      <SEO />
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
            <i>A`ohe hana nui ka alu`ia</i>
          </h2>
          <h3>No task is too big when done together</h3>
          <p style={{ textAlign: 'right' }}>— Mary Kawena Pukui (`Olelo No`eau)</p>
        </div>
      </BlueSection>
      <CausesSection>
        <>
          <CauseImage src="/causes/lhkh_plant.png" borderColor="#FA759E" />
          <CauseTextContent
            heading="Protecting Hawaii’s Land"
            description={
              'From its inception 14 years ago, Livable Hawaii Kai Hui has been organizing people to protect, improve and care for the resources of Moanalua, on the island of Oahu, in perpetuity.'
            }
          />
        </>
        <>
          <CauseImage src="/causes/lhkh_hero.png" borderColor="#FA759E" />
          <div className="cause__content">
            <div>
              <h2 className="human-blue">Advancing Online Strategy</h2>
              <p>More Human Internet technical experts are teaming with Livable Hawaii Kai Hui leaders to improve the organization's online presence.</p>
              <CheckmarkList
                notes={[
                  `Modernize website to support timely updates about Livable Hawaii Kai Hui's news and events`,
                  'Increase volunteership by streamlining signup process and automating event notifications',
                  'Improve social media followership with consistent branding',
                ]}
              />
            </div>
          </div>
        </>
        <>
          <CauseImage src="/causes/lhkh_hero.png" borderColor="#FA759E" />
          <div className="cause__content">
            <div>
              <h2 className="human-blue">Working Together</h2>
              <p>
                More Human Internet is excited to be partnering with Livable Hawaii Kai Hui to advance their online strategy, bringing more volunteers to help
                their mission of stewarding the irreplaceable cultural and natural resources of East Honolulu
              </p>
              <p>By collaborating empathically, we feel the challenges they are facing intimately and work to address them</p>
            </div>
          </div>
        </>
      </CausesSection>
    </Layout>
  )
}

export default LHKHPage
