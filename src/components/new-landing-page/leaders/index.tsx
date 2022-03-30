import React, { forwardRef } from 'react'
import Video from './video'


const Leaders = forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="leaders" ref={ref as any}>
        <div className="leaders__wrapper">
          <h1 className="leaders__title">Bring attention to problems on the web</h1>
          <Video videoSrcURL="https://youtube.com//embed/yU6b5oYl2DM" videoTitle="Roar" />
        </div>
      </section>
    )
  }
)

export default Leaders
