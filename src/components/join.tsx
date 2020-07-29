import React from 'react'
import { CardContent } from '@material-ui/core'
import ApplicationForm from './application-form'


export default React.forwardRef<HTMLDivElement>((_, ref) => (
  <div className="join" ref={ref}>
    <h2>Join</h2>
    <CardContent className="join-card-content">
      <ApplicationForm />
    </CardContent>
  </div>
))
