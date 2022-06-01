import React from 'react'
import { FormGroup, TextField } from '@material-ui/core'
import { ApplicationForm, EmailField, NameField } from '../shared/application-form'

export default React.forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="centered" ref={ref as any}>
        <div>
          <h1 className="mhi-heading human-blue">Join our team</h1>
          <p><i>We'd love to work with you! We'll reach out to folks who apply to schedule a 30 minute interview to find a great cause you can support!</i></p>
          <ApplicationForm formName="join-mhi">
            <NameField />
            <EmailField />
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
            <FormGroup>
              <TextField
                label="What skills would you hope to bring?"
                name="skills"
                variant="outlined"
                required
                multiline
                rows={5}
                InputProps={{
                  inputProps: {
                    'aria-label': 'What skills would you hope to bring?',
                  },
                }}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                label="What are you hoping to learn?"
                name="learn"
                variant="outlined"
                required
                multiline
                rows={5}
                InputProps={{
                  inputProps: {
                    'aria-label': 'What are you hoping to learn?',
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
