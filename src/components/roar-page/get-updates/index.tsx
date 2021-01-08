import React, { useState } from 'react'
import SlackIcon from './slack-icon'

const GetUpdates = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // tslint:disable-next-line: no-expression-statement
    e.preventDefault()

    // TODO - implement /subscribe in a Netlify function
    // let response, result
    // try {
    //     response = await fetch("/subscribe", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ email })
    //     })
    // } catch (error) {
    //     // Network failure or request failed to complete
    //     console.error({ error })
    // }

    // if (response && response.ok) {
    //     result = "✔ Subscribed. Please check your email for a confirmation link."
    // } else {
    //     // Server returned 4xx or 5xx
    //     result = "✖ Something went wrong. "
    //     if (response && response.status === 400) {
    //         result += "You are already subscribed."
    //     } else {
    //         result += "Please wait a few minutes and try again."
    //     }
    // }

    // tslint:disable-next-line: no-expression-statement
    setResult('✖ Something went wrong.')

    // Clear the results after 5 seconds
    // tslint:disable-next-line: no-expression-statement
    setTimeout(() => setResult(''), 5000)
  }

  return (
    <section className="get-updates">
      <a
        className="mhi-button slack"
        target="_blank"
        rel="noopener noreferrer"
        href="https://join.slack.com/t/morehumaninternet/shared_invite/zt-kkbdraz8-XT5~cViVQTJlzaklWgj7Dg"
      >
        <SlackIcon />
        <p className="slack__text">Join our Slack channel</p>
      </a>
      <div className="newsletter">
        {!result ? (
          <>
            <form className="newsletter__form" onSubmit={onSubmit}>
              <input className="newsletter__email" type="email" placeholder="email" required value={email} onChange={e => setEmail(e.target.value)} />
              <button className="mhi-button newsletter__submit" type="submit">
                Get updates
              </button>
            </form>
            <p className="newsletter__promise">* We hate spam and won’t ever share your email with anyone else</p>
          </>
        ) : (
          <p className="newsletter__result">{result}</p>
        )}
      </div>
    </section>
  )
}

export default GetUpdates
