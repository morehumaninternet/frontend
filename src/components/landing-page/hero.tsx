import React from 'react'
// @ts-ignore
import { Link } from 'gatsby'

export default ({ makeAndTrackRef, joinRef }: { makeAndTrackRef(): React.MutableRefObject<any>; joinRef: React.MutableRefObject<any> }) => (
  <div className="new-hero">
    <h1 className="mhi-heading" ref={makeAndTrackRef()}>
      The time has come for a<br />
      more human internet
    </h1>
    <p ref={makeAndTrackRef()}>
      We're on a quest to make the web more transparent
      <br />
      and better aligned with human interests
    </p>
    <div className="container" ref={makeAndTrackRef()}>
      <Link role="button" className="mhi-button" to="/roar">
        Get Roar!
      </Link>
    </div>
  </div>
)
