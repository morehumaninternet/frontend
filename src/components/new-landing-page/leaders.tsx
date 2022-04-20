import React, { forwardRef } from 'react'
import PinkDot from './pink-dot'

const Leaders = forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="leaders" ref={ref as any}>
        <div className="leaders__wrapper">
          <h1 className="leaders__title">Our leaders join your cause directly, working alongside you to meet your online &amp; offline goals.</h1>
          <PinkDot />
        </div>
      </section>
    )
  }
)

export default Leaders
