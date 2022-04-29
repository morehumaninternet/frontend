import React, { useEffect } from 'react'
import { FormGroup, TextField } from '@material-ui/core'
import { Email, Person } from '@material-ui/icons'
import TextFieldWithIcon from './text-field-with-icon'
import { thankYouHref } from '../../../utils/href'

export function ApplicationForm(): JSX.Element {

  const formReference = React.useRef<HTMLFormElement>()

  return (
    <form
      name="submit-application"
      method="POST"
      action={thankYouHref('signup')}
      data-netlify="true"
      netlify-honeypot="bot-field"
      autoComplete="off"
      ref={formReference as any}
    >
      <input type="hidden" name="form-name" value="submit-application" />
      <p style={{ display: 'none' }}>
      </p>
      <FormGroup>
        <TextFieldWithIcon
          type="email"
          label="Email"
          name="email"
          variant="outlined"
          required
          startIcon={<Email className="email" />}
        />
      </FormGroup>
      <FormGroup>
        <TextFieldWithIcon
          label="Full Name"
          name="name"
          variant="outlined"
          required
          startIcon={<Person className="person" />}
        />
      </FormGroup>
      <div>
        <FormGroup>
          <TextField
            label="Why?"
            name="whyJoin"
            variant="outlined"
            required
            multiline
            rows={5}
            InputProps={{
              inputProps: {
                'aria-label': 'Why do you want to join?',
              },
            }}
          />
        </FormGroup>
      </div>
      <FormGroup>
        <button type="submit" className="mhi-button">
          Join
        </button>
      </FormGroup>
    </form>
  )
}
