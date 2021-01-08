import React from 'react'

const Introduction = (): JSX.Element => {
  return (
    <section className="introduction-section full-width">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero__header">Powered by you</h1>
          <p className="hero__text">
            See something broken online?
            <br />
            Tell the world and get help with Roar from More Human Internet.
          </p>
          <a
            className="mhi-button btn btn--download"
            rel="noopener noreferrer"
            href="https://chrome.google.com/webstore/detail/roar/jfcmnmgckhjcflmljjgjjilmjhbgdfkc"
          >
            Free Download
          </a>
        </div>
        <img className="hero__gif" src="demo_video.gif" />
      </div>
    </section>
  )
}

export default Introduction
