import React, { forwardRef } from 'react'
import { BigCircle, SmallCircle } from '../../shared/circles'
import Info from './info'


/*
  - Create a component for the circles
  - Create a component for the text content
  - Implement proper images & text content
  - Use single column layout on mobile
*/

const CauseImage = ({ src }: { src: string }) => (
  <div className="cause__image">
    <img src={src} />
  </div>
)

const CauseTextContent = ({ heading, description }: { heading: string, description: string }) => (
  <div className="cause__text-content">
    <div>
      <h2>{heading}</h2>
      <p>{description}</p>
    </div>
  </div>
)

const Cause = ({ imgSrc, heading, description }: { imgSrc: string, heading: string, description: string }) => (
  <>
    <CauseImage src={imgSrc} />
    <CauseTextContent
      heading={heading}
      description={description}
    />
  </>
)

const Causes = forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="causes" ref={ref as any}>
        <div className="causes__content">
          <Cause
            imgSrc="/dsa_hero.png"
            heading="Developing African Leaders Through Sports"
            description="Developing African Leaders Through Sports"
          />
          <Cause
            imgSrc="/dsa_hero.png"
            heading="Developing African Leaders Through Sports"
            description="Developing African Leaders Through Sports"
          />
          <Cause
            imgSrc="/dsa_hero.png"
            heading="Developing African Leaders Through Sports"
            description="Developing African Leaders Through Sports"
          />
        </div>
      </section>
    )
  }
)

export default Causes
