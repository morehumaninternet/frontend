import React from 'react'
import { Layout } from '../shared/layout'
import { Header } from '../shared/header'
import SEO from '../shared/seo'
import { Cause, CauseImage, CausesSection, CauseTextContent } from '../shared/causes'
import BlueSection from '../shared/blue-section'
import { CheckmarkList } from './checkmark-list'
import JoinSection from './join-section'
import Team from '../team/index'

const ContributorsPage = (): JSX.Element => {
  return (
    <Layout additionalClassNames="new-landing-page" header={<Header />}>
      <SEO
        pageTitle="Contributors"
        description="TODO"
      />
      <section className="causes">
        <div className="causes__content" style={{ gridTemplateRows: '1fr 5.5fr 1fr' }}>
          <Cause
            cause="lhkh"
            imgSrc="/causes/lhkh_hero.png"
            borderColor="#FA759E"
            heading="For Contributors"
            description={`Volunteer your skills to help nonprofits deliver critical services to communities around the world.`}
          />
        </div>
      </section>
      <BlueSection>
        <div>
          <h2>
            <i>You’ve got the skills, you’ve got the motivation, but you’re wanting more fulfilment in the impact you’re making with your work
              You need a team
              You need a cause</i>
          </h2>
        </div>
      </BlueSection>
      <CausesSection rightToLeft>
        <>
          <CauseImage src="/causes/lhkh_reeds.png" borderColor="#FA759E" />
          <div className="cause__content">
            <div>
              <h2 className="human-blue">How It Works</h2>
              <CheckmarkList
                notes={[
                  'You’ll meet one of our technology leaders so we know what skills you’re hoping to bring, what you want to work on, and what causes motivate you',
                  'You’ll join our awesome international team of volunteers on Slack and over video who will support you throughout the process ',
                  'You’ll join a cause you care about and work as an embedded team helping them meet their objectives',
                  'You’ll feel awesome knowing you’re building your skills while helping others',
                ]}
              />
            </div>
          </div>
        </>
        <>
          <CauseImage src="/causes/lhkh_hale_background.png" borderColor="#6FCF97" />
          <div className="cause__content">
            <div>
              <h2 className="human-blue">Our Story</h2>
              <p>
                In X 2020, I was

                - knowing our skills could make a difference
                - frustration with how the web is wasn’t being used to solve the world’s biggest problems
              </p>
              <p>
                After collaborating to build Roar, we realized that a small motivated team could collaborate around the globe and help support one another to advance important causes.
              </p>
              Meanwhile, Will was working as Chief Information Officer for DSA and the OGs wanted to contribute to that cause. They helped build out their website putting forward the idea of developing African leaders through sports
              <p>
                Barbara and LHKH

                Now we are looking to expand our team and the causes we work with!
              </p>
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
      <Team />
      <JoinSection />
    </Layout>
  )
}

export default ContributorsPage
