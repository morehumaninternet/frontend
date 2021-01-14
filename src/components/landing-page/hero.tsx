import React from 'react'
// @ts-ignore
import { LocalizedLink } from 'gatsby-theme-i18n'

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
      <a role="button" className="mhi-button hide-on-mobile umami--click--try-the-demo" target="_blank" href="https://chrome.google.com/webstore/detail/roar/jfcmnmgckhjcflmljjgjjilmjhbgdfkc?hl=en&authuser=0">
        Get Roar!
      </a>
      <LocalizedLink className="terms" target="_blank" to="roar/welcome">What is Roar?</LocalizedLink>
      <button className="mhi-button hide-on-desktop umami--click--sign-up" onClick={() => joinRef.current!.scrollIntoView({ block: 'center' })}>
        Sign up
      </button>
    </div>
  </div>
)
