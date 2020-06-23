import React from 'react'
import { Button, Card, CardContent, FormGroup, InputAdornment, TextField } from '@material-ui/core'
import { Email, LinkedIn, Person } from '@material-ui/icons'
import Layout from '../components/layout'
import FileUploadButton from '../components/file-upload-button'
import SEO from '../components/seo'
import '../styles/index.css'




const ApplyPage = () => (
  <Layout>
    <SEO title="Apply" />
    <div className="hero join">
      <Card className="join-card">
        <h2>Join</h2>
        <CardContent className="join-card-content">
          <form name="submit-application" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="submit-application" />
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FileUploadButton name="resume" />
                or
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
        </CardContent>
      </Card>
    </div>
  </Layout>
)

export default ApplyPage
