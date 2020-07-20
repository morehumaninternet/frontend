import React, { useEffect } from 'react'
import { Button, FormGroup, TextField } from '@material-ui/core'
import { Email, Person } from '@material-ui/icons'
import FileUploadButton from './file-upload-button'
import TextFieldWithIcon from './text-field-with-icon'
import GithubInput from './github-input'


export default function ApplicationForm(): JSX.Element {

  const formReference = React.useRef<HTMLFormElement>()

  const [checking, setChecking] = React.useState(false)
  const [awaitingSubmit, setAwaitingSubmit] = React.useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (checking) {
      setAwaitingSubmit(true)
      return event.preventDefault()
    }
  }

  useEffect(() => {
    if (awaitingSubmit && !checking) {
      const submitButton: HTMLButtonElement = formReference.current!.querySelector('button[type="submit"]')! as any
      submitButton.click()
    }
  }, [awaitingSubmit, checking])

  const inputElement = (name: string): HTMLInputElement => {
    return formReference.current!.elements.namedItem(name) as any
  }

  const ensureGithubUsernameOrResumePresent = () => {
    const githubUsername = inputElement('githubUsername')
    const resume = inputElement('resume')

    // If a githubUsername has been entered, defer to it to keep track of its custom validity
    if (githubUsername.value) return

    // Otherwise, set the custom validity based on the existence of a resume
    const customValidity = resume.value ? '' : 'Please add your github username or upload a resume'
    githubUsername.setCustomValidity(customValidity)
  }

  useEffect(() => {
    ensureGithubUsernameOrResumePresent()
  })

  return (
    <form
      name="submit-application"
      method="POST"
      action="/thank-you"
      data-netlify="true"
      netlify-honeypot="bot-field"
      autoComplete="off"
      ref={formReference as any}
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value="submit-application" />
      <p style={{ display: 'none' }}>
        <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
      </p>
      <FormGroup>
        <TextFieldWithIcon
          label="Full Name"
          name="name"
          variant="outlined"
          required
          startIcon={<Person />}
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
      <FormGroup className="stretch-row">
        <GithubInput checking={checking} setChecking={setChecking} onChange={ensureGithubUsernameOrResumePresent} />
        <div className="spaced-vertically-centered-text">and/or</div>
        <FileUploadButton
          name="resume"
          label="Resume"
          onNewFileName={() => ensureGithubUsernameOrResumePresent()}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          label="Why do you want to join?"
          name="whyJoin"
          variant="outlined"
          required
          multiline
          rows={5}
        />
      </FormGroup>
      <FormGroup>
        <Button type="submit">
          Apply
        </Button>
      </FormGroup>
    </form>
  )
}
