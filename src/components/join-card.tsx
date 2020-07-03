import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import ApplicationForm from '../components/application-form'


export default function JoinCard() {
  return (
    <Card className="join">
      <h2>Join</h2>
      <CardContent className="join-card-content">
        <ApplicationForm />
      </CardContent>
    </Card>
  )
}
