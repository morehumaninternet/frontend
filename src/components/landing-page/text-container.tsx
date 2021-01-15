import React from 'react'
import { FormattedMessage } from 'react-intl'
// @ts-ignore
import { LocalizedLink } from 'gatsby-theme-i18n'

type TextContainerProps = {
  aboutRef: React.MutableRefObject<any>
  whyRef: React.MutableRefObject<any>
  makeAndTrackRef(): React.MutableRefObject<any>
}

export default ({ aboutRef, whyRef, makeAndTrackRef }: TextContainerProps) => (
  <div className="text-container">
    <div className="about" ref={aboutRef}>
      <h2 className="mhi-heading" ref={makeAndTrackRef()}>
        About
      </h2>
      <p ref={makeAndTrackRef()}>
        <FormattedMessage id="index_aboutus1" />
      </p>
      <p ref={makeAndTrackRef()}>
        <FormattedMessage id="index_aboutus2" />
        <a className="same-color" href="https://chrome.google.com/webstore/detail/roar/jfcmnmgckhjcflmljjgjjilmjhbgdfkc?hl=en&authuser=0">
          <FormattedMessage id="index_aboutus3" />
        </a>
        <FormattedMessage id="index_aboutus4" />
      </p>
      <p ref={makeAndTrackRef()}>
        <FormattedMessage id="index_aboutus5" />
        <a className="same-color umami--click--nav-bar-join" href="#">
          <FormattedMessage id="index_aboutus6" />
        </a>
        <FormattedMessage id="index_aboutus7" />
      </p>
      
      
    </div>
    <div className="why" ref={whyRef}>
      <h2 className="mhi-heading" ref={makeAndTrackRef()}>
        Why
      </h2>
      <p ref={makeAndTrackRef()}>
        <FormattedMessage id="index_why1" />
      </p>
      <p ref={makeAndTrackRef()}>
        <FormattedMessage id="index_why2" />
      </p>
      <p ref={makeAndTrackRef()}>
        <strong>
          <FormattedMessage id="index_why3" />
        </strong>
      </p>
    </div>
  </div>
)
