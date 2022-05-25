import React from 'react'
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import { ApplicationForm } from '../shared/application-form'

export default React.forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="join" ref={ref as any}>
        <div className="join__contents" ref={ref as any}>
          <h1 className="mhi-heading human-blue">Get Involved</h1>
          <p><i>Join the effort to protect Hawaii's natural resources</i></p>
          <ApplicationForm formName="join-lhkh">
            <FormGroup>
              <FormControlLabel name="inPerson" control={<Checkbox defaultChecked />} label="Let me know about upcoming in person events" />
              <FormControlLabel name="contribute" control={<Checkbox />} label="I want to contribute my expertise" />
            </FormGroup>
          </ApplicationForm>
        </div>
      </section>
    )
  }
)
