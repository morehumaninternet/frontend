import React from 'react'
import { FormGroup, TextField } from '@material-ui/core'
import { ApplicationForm } from '../shared/application-form'

export default React.forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="centered" ref={ref as any}>
        <div>
          <h1 className="mhi-heading human-blue">Join our team</h1>
          <p><i>We'd love to work with you! We'll reach out to folks who apply to schedule a 30 minute interview to find a great cause you can support!</i></p>
          <ApplicationForm formName="join-mhi">
            <FormGroup>
              <TextField
                label="What causes motivate you?"
                name="motivation"
                variant="outlined"
                required
                multiline
                rows={5}
                InputProps={{
                  inputProps: {
                    'aria-label': 'What causes motivate you?',
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
