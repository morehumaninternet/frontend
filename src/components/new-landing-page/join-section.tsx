import React from 'react'
import {ApplicationForm} from '../shared/application-form'

export default React.forwardRef(
  (_, ref): JSX.Element => {
    return (
      <div className="join-community">
        <div className ="join" ref={ref as any}>
          <h2 className="mhi-heading human-blue" >Join Our Community</h2>
          <ApplicationForm />
        </div>
      </div>
    )
  }
)
