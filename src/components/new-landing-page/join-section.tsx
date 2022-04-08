import React from 'react'
import {ApplicationForm} from '../shared/application-form'

export default React.forwardRef(
  (_, ref): JSX.Element => {
    return (
      <div ref={ref as any}>
        <h2>Join Our Community</h2>
        <ApplicationForm />
      </div>
    )
  }
)