import React, { useEffect } from 'react'
import { FormControlLabel, FormGroup, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core'
import { Business, Email, Person, Language } from '@material-ui/icons'
import { FormattedMessage, useIntl } from 'react-intl'
import FileUploadButton from './file-upload-button'
import TextFieldWithIcon from './text-field-with-icon'
import GithubInput from './github-input'
import { thankYouHref } from '../../../utils/href'

type ApplicationFormType = {
  availability: Availability
  setAvailability: React.Dispatch<React.SetStateAction<Availability>>
  makeAndTrackRef(): any
}

export default function ApplicationForm({ availability, setAvailability, makeAndTrackRef }: ApplicationFormType): JSX.Element {
  const intl = useIntl()

  const formReference = React.useRef<HTMLFormElement>()

  const [checking, setChecking] = React.useState(false)
  const [awaitingSubmit, setAwaitingSubmit] = React.useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    if (checking) {
      setAwaitingSubmit(true) // tslint:disable-line:no-expression-statement
      event.preventDefault() // tslint:disable-line:no-expression-statement
    }
  }

  // tslint:disable-next-line:no-expression-statement
  useEffect(() => {
    if (awaitingSubmit && !checking) {
      const submitButton: HTMLButtonElement = formReference.current!.querySelector('button[type="submit"]')! as any
      return submitButton.click()
    }
  }, [awaitingSubmit, checking])

  const inputElement = (name: string): HTMLInputElement => {
    return formReference.current!.elements.namedItem(name) as any
  }

  // Volunteers must include their github username or a resume
  const volunteerRequirements = () => {
    const githubUsername = inputElement('githubUsername')
    const resume = inputElement('resume')

    if (availability !== 'volunteer') return githubUsername.setCustomValidity('')

    // If a githubUsername has been entered, defer to it to keep track of its custom validity
    if (githubUsername.value) return

    // Otherwise, set the custom validity based on the existence of a resume
    const customValidity = resume.value ? '' : 'Please add your github username or upload a resume'
    return githubUsername.setCustomValidity(customValidity)
  }

  // tslint:disable-next-line:no-expression-statement
  useEffect(() => volunteerRequirements())

  return (
    <form
      name="submit-application"
      method="POST"
      action={thankYouHref('signup')}
      data-netlify="true"
      netlify-honeypot="bot-field"
      autoComplete="off"
      ref={formReference as any}
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value="submit-application" />
      <p style={{ display: 'none' }}>
        <label>
          <FormattedMessage id="application_form_bot" /> <input name="bot-field" />
        </label>
      </p>
      <FormGroup ref={makeAndTrackRef()}>
        <TextFieldWithIcon
          type="email"
          label={intl.formatMessage({ id: 'application_form_email' })}
          name="email"
          variant="outlined"
          required
          startIcon={<Email className="email" />}
        />
      </FormGroup>
      <FormGroup ref={makeAndTrackRef()}>
        <TextFieldWithIcon
          label={intl.formatMessage({ id: 'application_form_name' })}
          name="name"
          variant="outlined"
          required={availability === 'volunteer'}
          startIcon={<Person className="person" />}
        />
      </FormGroup>
      <FormGroup ref={makeAndTrackRef()}>
        <TextFieldWithIcon
          type="employer"
          label={intl.formatMessage({ id: 'application_form_employer' })}
          name="employer"
          variant="outlined"
          startIcon={<Business className="employer" />}
        />
      </FormGroup>
      <FormGroup ref={makeAndTrackRef()}>
        <TextFieldWithIcon type="website" label="Website" name="website" variant="outlined" startIcon={<Language className="website" />} />
      </FormGroup>
      <FormGroup className="select" ref={makeAndTrackRef()}>
        <InputLabel id="role-select-label">{intl.formatMessage({ id: 'application_form_role' })}</InputLabel>
        <Select labelId="role-select-label" defaultValue="developer" onChange={volunteerRequirements}>
          <MenuItem value="business development">{intl.formatMessage({ id: 'application_form_business development' })}</MenuItem>
          <MenuItem value="ceo/founder">{intl.formatMessage({ id: 'application_form_ceo/founder' })}</MenuItem>
          <MenuItem value="customer insights">{intl.formatMessage({ id: 'application_form_customer insights' })}</MenuItem>
          <MenuItem value="designer">{intl.formatMessage({ id: 'application_form_designer' })}</MenuItem>
          <MenuItem value="developer" selected>
            {intl.formatMessage({ id: 'application_form_developer' })}
          </MenuItem>
          <MenuItem value="marketing">{intl.formatMessage({ id: 'application_form_marketing' })}</MenuItem>
          <MenuItem value="product manager">{intl.formatMessage({ id: 'application_form_product manager' })}</MenuItem>
          <MenuItem value="other">{intl.formatMessage({ id: 'application_form_other' })}</MenuItem>
        </Select>
      </FormGroup>
      <RadioGroup aria-label="availability" name="availability" value={availability} onChange={event => setAvailability(event.target.value as any)}>
        <FormControlLabel value="signup" control={<Radio />} label="Keep me updated" ref={makeAndTrackRef()} />
        <FormControlLabel value="volunteer" control={<Radio />} label="I'd like to volunteer" ref={makeAndTrackRef()} />
      </RadioGroup>
      <div className={availability === 'volunteer' ? '' : 'hide'}>
        <FormGroup className="stretch-row" ref={makeAndTrackRef()}>
          <GithubInput checking={checking} setChecking={setChecking} onChange={volunteerRequirements} />
          <div className="spaced-vertically-centered-text">
            <FormattedMessage id="application_form_and_or" />
          </div>
          <FileUploadButton name="resume" label={intl.formatMessage({ id: 'application_form_resume' })} onNewFileName={() => volunteerRequirements()} />
        </FormGroup>
        <FormGroup ref={makeAndTrackRef()}>
          <TextField
            label={intl.formatMessage({ id: 'application_form_why' })}
            name="whyJoin"
            variant="outlined"
            required={availability === 'volunteer'}
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
      <FormGroup ref={makeAndTrackRef()}>
        <button type="submit" className="mhi-button">
          <FormattedMessage id="application_form_join" />
        </button>
      </FormGroup>
    </form>
  )
}
