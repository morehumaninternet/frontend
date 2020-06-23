import React from 'react'
import { Button, Card, CardContent, FormGroup, InputAdornment, TextField } from '@material-ui/core'
import { Email, LinkedIn, Person, CloudUpload } from '@material-ui/icons'
import Hero from '../components/hero'
import Layout from '../components/layout'
import FileUploadButton from '../components/file-upload-button'
import SEO from '../components/seo'
import '../styles/index.css'


const SubmitApplicationForm = () => (
  <form name="submit-application" method="POST" action="/thank-you" data-netlify="true" netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="submit-application" />
    <p style={{ display: 'none' }}>
      <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
    </p>
    <FormGroup>
      <TextField
        placeholder="Full Name"
        name="name"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start"><Person /></InputAdornment>,
        }}
      />
    </FormGroup>
    <FormGroup>
      <TextField
        type="email"
        placeholder="Email"
        name="email"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
        }}
      />
    </FormGroup>
    <FormGroup>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
        <FileUploadButton name="resume">
          <CloudUpload/> &nbsp;&nbsp; Resume
        </FileUploadButton>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>or</div>
        <TextField
          placeholder="LinkedIn"
          name="linkedin"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start"><LinkedIn /></InputAdornment>,
          }}
        />
      </div>
    </FormGroup>
    <FormGroup>
      <TextField
        placeholder="Your thoughts..."
        label="Why do you want to join?"
        name="whyjoin"
        variant="outlined"
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
