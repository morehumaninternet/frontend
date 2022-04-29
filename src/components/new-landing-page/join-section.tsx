import React from 'react'
import { ApplicationForm } from '../shared/application-form'

export default React.forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="join">
        <div className="join__contents" ref={ref as any}>
          <h1 className="mhi-heading human-blue">Join Our Community</h1>
          <ApplicationForm formName="join-mhi" />
        </div>
      </section>
    )
  }
)
