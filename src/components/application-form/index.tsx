import React, { useEffect } from 'react'
import { debounce, last } from 'lodash'
import { Button, Card, CardContent, FormGroup, TextField } from '@material-ui/core'
import { Email, Person } from '@material-ui/icons'
import FileUploadButton from './file-upload-button'
import TextFieldWithIcon from './text-field-with-icon'
import GithubInput from './github-input'


// const inputElement = (name: string): HTMLInputElement => {
//   return formReference.current!.elements.namedItem(name) as any
// }

// githubAccount = (): HTMLInputElement => {
//   return this.inputElement('githubAccount')
// }

// resume = (): HTMLInputElement => {
//   return this.inputElement('resume')
// }

// setGithubAccountOrResume = () => {
//   const hasGitHubUrlOrResume = !!this.githubAccount().value || !!this.resume().value
//   const customValidity = hasGitHubUrlOrResume ? '' : 'Please upload a resume or provide the url to your GitHub page.'
//   this.githubAccount().setCustomValidity(customValidity)
// }

// componentDidMount() {
//   this.setGithubAccountOrResume()
// }


export default function ApplicationForm(): JSX.Element {

  const formReference = React.createRef<HTMLFormElement>()

  const [checking, setChecking] = React.useState(false)
  const [awaitingSubmit, setAwaitingSubmit] = React.useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (checking) {
      setAwaitingSubmit(true)
      return event.preventDefault()
    }
    console.log('here', 'event')
  }

  function doSetChecking(checking: boolean) {
    setChecking(checking)
    if (awaitingSubmit && !checking) formReference.current!.submit()
  }

  return (
    <form
      name="submit-application"
      method="POST"
      action="/thank-you"
      data-netlify="true"
      netlify-honeypot="bot-field"
      autoComplete="off"
      ref={formReference}
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
          startIcon={<Email />}
        />
      </FormGroup>
      <FormGroup className="stretch-row">
        <GithubInput checking={checking} setChecking={doSetChecking} />
        <div className="spaced-vertically-centered-text">and/or</div>
        <FileUploadButton
          name="resume"
          label="Resume"
          // onNewFileName={() => this.setGithubAccountOrResume()}
          onNewFileName={() => { return }}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          label="Why do you want to join?"
          name="whyJoin"
          variant="outlined"
          required
          multiline
          rows={3}
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
