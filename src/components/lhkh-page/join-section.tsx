import React from 'react'
import { FormGroup, FormControlLabel, Checkbox, TextField } from '@material-ui/core'
import { ApplicationForm, NameField, EmailField } from '../shared/application-form'

export default React.forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="centered" ref={ref as any}>
        <div className="join__contents">
          <h1 className="mhi-heading human-blue">Get Involved</h1>
          <p><i>Join the effort to protect Hawaii's natural resources</i></p>
          <ApplicationForm formName="join-lhkh">
            <NameField />
            <EmailField />
            <FormGroup>
              <FormControlLabel name="inPerson" control={<Checkbox defaultChecked />} label="Let me know about upcoming in person events" />
              <FormControlLabel name="contribute" control={<Checkbox />} label="I want to contribute my expertise" />
            </FormGroup>
            <FormGroup>
              <TextField
                label="Anything else to add?"
                name="anythingElse"
                variant="outlined"
                required
                multiline
                rows={5}
                InputProps={{
                  inputProps: {
                    'aria-label': 'Anything else to add?',
                  },
                }}
              />
            </FormGroup>
          </ApplicationForm>
        </div>
      </section>
    )
  }
)
