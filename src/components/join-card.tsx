import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import ApplicationForm from '../components/application-form'


export const JoinCardContents = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div className="join-card-contents" ref={ref}>
    <h2>Join</h2>
    <CardContent className="join-card-content">
      <ApplicationForm />
    </CardContent>
  </div>
))

export default () => (
  <Card className="join">
    <JoinCardContents />
  </Card>
)
