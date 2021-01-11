import React, { forwardRef } from 'react'
import Video from './video'

const HowItWorks = forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="how-it-works" ref={ref as any}>
        <div className="how-it-works__wrapper">
          <h1 className="how-it-works__title">Bring attention to problems on the web</h1>
          <Video videoSrcURL="https://www.youtube.com/embed/dQw4w9WgXcQ" videoTitle="Roar" />
        </div>
      </section>
    )
  }
)

export default HowItWorks
