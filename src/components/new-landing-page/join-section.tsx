import React from 'react'
import { FormGroup, FormControlLabel, Checkbox, TextField } from '@material-ui/core'
import { ApplicationForm, EmailField, NameField } from '../shared/application-form'

export default React.forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="centered">
        <div className="join__contents" ref={ref as any}>
          <h1 className="mhi-heading human-blue">Join Our Community</h1>
          <p><i>Be part of an international network contributing to valuable causes</i></p>
          <ApplicationForm formName="join-mhi">
            <NameField />
            <EmailField />
            <FormGroup>
              <FormControlLabel name="contribute" control={<Checkbox defaultChecked />} label="I want to contribute my expertise" />
              <FormControlLabel name="cause" control={<Checkbox />} label="I represent a valuable cause" />
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
