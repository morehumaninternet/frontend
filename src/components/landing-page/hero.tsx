import React from 'react'
// @ts-ignore
import { LocalizedLink } from 'gatsby-theme-i18n'
import { Button } from '@material-ui/core'

export default ({ makeAndTrackRef }: { makeAndTrackRef(): React.MutableRefObject<any> }) => (
  <div className="new-hero">
    <h1 className="mhi-heading" ref={makeAndTrackRef()}>
      The time has come for a<br />
      more human internet
    </h1>
    <p ref={makeAndTrackRef()}>
      We're on a quest to make the web more transparent
      <br />
      and better aligned with the interests of all people
    </p>
    <div className="container" ref={makeAndTrackRef()}>
      <Button className="mhi-button" component={LocalizedLink} to="/demo">
        Try the demo
      </Button>
    </div>
  </div>
)
