import React from 'react'
import { FormGroup } from '@material-ui/core'
import { Email, Person } from '@material-ui/icons'
import TextFieldWithIcon from './text-field-with-icon'
import { thankYouHref } from '../../../utils/href'

export function NameField(): JSX.Element {
  return (
    <FormGroup>
      <TextFieldWithIcon
        label="Full Name"
        name="name"
        variant="outlined"
        required
        startIcon={<Person className="person" />}
      />
    </FormGroup>
  )
}

export function EmailField(): JSX.Element {
  return (
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
  )
}

export function ApplicationForm({ formName, children }: { formName: string, children?: React.ReactNode }): JSX.Element {

  const formReference = React.useRef<HTMLFormElement>()

  return (
    <form
      name={formName}
      method="POST"
      action={thankYouHref('signup')}
      data-netlify="true"
      netlify-honeypot="bot-field"
      autoComplete="off"
      ref={formReference as any}
      className="application-form"
    >
      <input type="hidden" name="form-name" value={formName} />
      {children}
      <FormGroup>
        <button type="submit" className="mhi-button human-pink-bg">
          Send
        </button>
      </FormGroup>
    </form>
  )
}
