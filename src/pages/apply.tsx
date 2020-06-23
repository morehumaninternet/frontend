import React from 'react'
import { Button, Card, CardContent, FormGroup, InputAdornment, InputBase, TextField, FormControl } from '@material-ui/core'
import { Email, LinkedIn, Person } from '@material-ui/icons'
import Layout from '../components/layout'
import SEO from '../components/seo'
import '../styles/index.css'


class FileUploadButton extends React.Component<{}, { fileUploadState: string }> {
  inputReference: React.RefObject<any>

  constructor(props) {
    super(props)
    this.state = { fileUploadState: '' }
    this.inputReference = React.createRef()
  }

  fileUploadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    this.setState({ fileUploadState: e.target.value })
  }

  fileUploadAction = () => this.inputReference.current.click()

  render(): JSX.Element {
    return (
      <div>
        <input type="file" hidden ref={this.inputReference} onChange={this.fileUploadInputChange} />
        <button type="button" className="ui button" onClick={this.fileUploadAction}>
          Resume
        </button>
        {this.state.fileUploadState}
        </div>
    )
  }
}




const ApplyPage = () => (
  <Layout>
    <SEO title="Apply" />
    <div className="hero join">
      <Card className="join-card">
        <h2>Join</h2>
        <CardContent className="join-card-content">
          <form method="POST" action="/submit-application">
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
                <FileUploadButton />
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
