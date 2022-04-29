import React, { useEffect } from 'react'
import { FormGroup, TextField } from '@material-ui/core'
import { Email, Person } from '@material-ui/icons'
import TextFieldWithIcon from './text-field-with-icon'
import { thankYouHref } from '../../../utils/href'
import CausesInput from './causes-input'

type ApplicationFormProps = {
  formName: string
}



export function ApplicationForm(props: ApplicationFormProps): JSX.Element {
  const formReference = React.useRef<HTMLFormElement>()
  const [checking, setChecking] = React.useState(false)

  return (
    <form
      name={props.formName}
      method="POST"
      action={thankYouHref('signup')}
      data-netlify="true"
      netlify-honeypot="bot-field"
      autoComplete="off"
      ref={formReference as any}
      className="application-form"
    >
      <input type="hidden" name="form-name" value="submit-application" />
      <p style={{ display: 'none' }}>
      </p>
      <FormGroup>
        <TextFieldWithIcon
          label="Full Name"
          name="name"
          variant="outlined"
          required
          startIcon={<Person className="person" />}
        />
      </FormGroup>
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
      <div>
        <FormGroup>
          <TextField
            label="Why are you?"
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
      <CausesInput
        checking={checking}
        setChecking={setChecking}
        onChange={() => console.log('onChange')}
      />
      <FormGroup>
        <button type="submit" className="mhi-button">
          Join
        </button>
      </FormGroup>
    </form>
  )
}
