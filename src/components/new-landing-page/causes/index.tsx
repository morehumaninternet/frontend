import React, { forwardRef } from 'react'
import Video from './video'

const HowItWorks = forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="causes" ref={ref as any}>
        <div className="causes__wrapper">
          <h1 className="causes__title">Bring attention to problems on the web</h1>
          <Video videoSrcURL="https://youtube.com//embed/yU6b5oYl2DM" videoTitle="Roar" />
        </div>
      </section>
    )
  }
)

export default HowItWorks
