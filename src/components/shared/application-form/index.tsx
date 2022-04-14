import React, { useEffect } from 'react'
import { FormGroup, TextField } from '@material-ui/core'
import { Email, Person, Language } from '@material-ui/icons'
import { FormattedMessage, useIntl } from 'react-intl'
import TextFieldWithIcon from './text-field-with-icon'
import { thankYouHref } from '../../../utils/href'

export function ApplicationForm(): JSX.Element {
  const intl = useIntl()

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
        <label>
          <FormattedMessage id="application_form_bot" /> <input name="bot-field" />
        </label>
      </p>
      <FormGroup>
        <TextFieldWithIcon
          type="email"
          label={intl.formatMessage({ id: 'application_form_email' })}
          name="email"
          variant="outlined"
          required
          startIcon={<Email className="email" />}
        />
      </FormGroup>
      <FormGroup>
        <TextFieldWithIcon
          label={intl.formatMessage({ id: 'application_form_name' })}
          name="name"
          variant="outlined"
          required
          startIcon={<Person className="person" />}
        />
      </FormGroup>
      <div>
        <FormGroup>
          <TextField
            label={intl.formatMessage({ id: 'application_form_why' })}
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
          <FormattedMessage id="application_form_join" />
        </button>
      </FormGroup>
    </form>
  )
}
