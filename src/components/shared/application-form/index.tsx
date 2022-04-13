import React, { useEffect } from 'react'
import { FormControlLabel, FormGroup, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core'
import { Business, Email, Person, Language } from '@material-ui/icons'
import { FormattedMessage, useIntl } from 'react-intl'
import FileUploadButton from './file-upload-button'
import TextFieldWithIcon from './text-field-with-icon'
import GithubInput from './github-input'
import { thankYouHref } from '../../../utils/href'
import { DropzoneArea } from 'material-ui-dropzone'

export function ApplicationForm(): JSX.Element {
  const intl = useIntl()

  const [availability, setAvailability] = React.useState('volunteer')

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
      <FormGroup>
        <RadioGroup aria-label="availability" name="availability" value={availability} onChange={event => setAvailability(event.target.value as any)}>
          <FormControlLabel value="signup" control={<Radio />} label="I want to contribute" />
          <FormControlLabel value="volunteer" control={<Radio />} label="I represent an important cause" />
          <FormControlLabel value="signup" control={<Radio />} label="I want to teach a workshop" />
        </RadioGroup>

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
          required={availability === 'volunteer'}
          startIcon={<Person className="person" />}
        />
      </FormGroup>
      <RadioGroup aria-label="availability" name="availability" value={availability} onChange={event => setAvailability(event.target.value as any)}>
        <FormControlLabel value="signup" control={<Radio />} label="Keep me updated" />
        <FormControlLabel value="volunteer" control={<Radio />} label="I'd like to volunteer" />
      </RadioGroup>
      <div className={availability === 'volunteer' ? '' : 'hide'}>
        <FormGroup className="stretch-row">
          <GithubInput checking={checking} setChecking={setChecking} onChange={volunteerRequirements} />

          {/* need to replace fileupLoadButton with DropzoneArea */}
          <FileUploadButton name="resume" label={intl.formatMessage({ id: 'application_form_resume' })} onNewFileName={() => volunteerRequirements()} />
          <DropzoneArea onDrop={() => volunteerRequirements()} dropzoneText="Drag and drop your resume"/>
        </FormGroup>

        <FormGroup>
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
      <FormGroup>
        <button type="submit" className="mhi-button">
          <FormattedMessage id="application_form_join" />
        </button>
      </FormGroup>
    </form>
  )
}
