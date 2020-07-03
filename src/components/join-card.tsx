import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import ApplicationForm from '../components/application-form'


export function JoinCardContents(): JSX.Element {
  return (
    <>
      <h2>Join</h2>
      <CardContent className="join-card-content">
        <ApplicationForm />
      </CardContent>
    </>
  )
}

export default React.forwardRef((_, ref) => (
  console.log('rendering join card'),
  <Card className="join" ref={ref}>
    <JoinCardContents />
  </Card>
))
