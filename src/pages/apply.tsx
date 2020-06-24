import React from 'react'
import { Button, Card, CardContent, FormGroup, TextField } from '@material-ui/core'
import { Email, LinkedIn, Person } from '@material-ui/icons'
import Hero from '../components/hero'
import Layout from '../components/layout'
import FileUploadButton from '../components/file-upload-button'
import TextFieldWithIcon from '../components/text-field-with-icon'
import SEO from '../components/seo'
import '../styles/index.css'


class SubmitApplicationForm extends React.Component {

  formReference: React.RefObject<HTMLFormElement> = React.createRef()

  inputElement = (name: string): HTMLInputElement => {
    return this.formReference.current.elements.namedItem(name) as any
  }

  linkedInUrl = (): HTMLInputElement => {
    return this.inputElement('linkedInUrl')
  }

  resume = (): HTMLInputElement => {
    return this.inputElement('resume')
  }

  setLinkedInUrlOrResume = () => {
    const hasLinkedInUrlOrResume = !!this.linkedInUrl().value || !!this.resume().value
    const customValidity = hasLinkedInUrlOrResume ? '' : 'Please upload a resume or provide the url to your LinkedIn page.'
    this.linkedInUrl().setCustomValidity(customValidity)
  }

  componentDidMount() {
    this.setLinkedInUrlOrResume()
  }

  render(): JSX.Element {
    return (
      <form
        name="submit-application"
        method="POST"
        action="/thank-you"
        data-netlify="true"
        netlify-honeypot="bot-field"
        autoComplete="off"
        ref={this.formReference}
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
          <FileUploadButton
            name="resume"
            label="Resume"
            onNewFileName={() => this.setLinkedInUrlOrResume()}
          />
          <div className="spaced-vertically-centered-text">and/or</div>
          <TextFieldWithIcon
            type="url"
            label="LinkedIn"
            name="linkedInUrl"
            variant="outlined"
            onChange={event => this.setLinkedInUrlOrResume()}
            startIcon={<LinkedIn />}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            label="Why do you want to join?"
            name="whyjoin"
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
}

const ApplyPage = () => (
  <Layout>
    <SEO title="Apply" />
    <Hero>
      <Card className="join-card">
        <h2>Join</h2>
        <CardContent className="join-card-content">
          <SubmitApplicationForm />
        </CardContent>
      </Card>
    </Hero>
  </Layout>
)

export default ApplyPage
