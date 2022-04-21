import React, { forwardRef } from 'react'


const Leaders = forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="leaders" ref={ref as any}>
        <div className="leaders__wrapper">
          <h1 className="leaders__title">Our leaders join your cause directly, working alongside you to meet your online &amp; offline goals.</h1>
        </div>
      </section>
    )
  }
)

export default Leaders