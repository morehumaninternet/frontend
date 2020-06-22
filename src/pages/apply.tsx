import React from 'react'
import { Link } from 'gatsby'
import { Button, Card, CardHeader, CardActions, CardContent, InputAdornment, TextField } from '@material-ui/core'
import { Email } from '@material-ui/icons'
import Layout from '../components/layout'
import SEO from '../components/seo'
import '../styles/index.css'



const IndexPage = () => (
  <Layout>
    <SEO title="Apply" />
    <div className="hero join">
      <Card className="join-card">
        <h2>Join</h2>
        <CardContent className="join-card-content">
          <form method="POST" action="/apply">
            <TextField
              placeholder="Full Name"
              name="name"
              variant="outlined"
              className="thing"

            />
            <TextField
              type="email"
              placeholder="Email"
              name="email"
              variant="outlined"
              className="thing"
              InputProps={{
                startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
              }}
            />
            <div style={{ width: '100%', marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
              <Button>
                Resume
              </Button>
              or
              <TextField
                placeholder="LinkedIn"
                name="linkedIn"
                variant="outlined"
                className="thing"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </Layout>
)

export default IndexPage
