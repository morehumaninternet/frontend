import React from 'react'
import { ApplicationForm } from '../shared/application-form'

export default React.forwardRef(
  (_, ref): JSX.Element => {
    return (
      <div className="join-community">
        <div className="join" ref={ref as any}>
          <h1 className="mhi-heading human-blue">Get Involved</h1>
          {/* <i>Join the effort to XXX</i> */}
          <ApplicationForm
            formName="get-involved-lhkh"
          />
        </div>
      </div>
    )
  }
)
