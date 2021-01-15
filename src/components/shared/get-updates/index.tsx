import React, { forwardRef, useState } from 'react'
import SlackIcon from './slack-icon'

const GetUpdates = forwardRef(
  (_, ref): JSX.Element => {
    const [email, setEmail] = useState('')
    const [result, setResult] = useState('')

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      // tslint:disable: no-expression-statement
      e.preventDefault()

      // tslint:disable-next-line: no-let
      let response, result

      response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response && response.ok) {
        result = '✔ Subscribed. Please check your email for a confirmation link.'
      } else {
        // Server returned 4xx or 5xx
        result = '✖ Something went wrong. '
        if (response && response.status === 400) {
          result += 'You are already subscribed.'
        } else {
          result += 'Please wait a few minutes and try again.'
        }
      }

      setResult(result)

      // Clear the results after 5 seconds
      setTimeout(() => setResult(''), 5000)

      // tslint:enable: no-expression-statement
    }

    return (
      <section className="get-updates" ref={ref as any}>
        <a
          className="mhi-button slack"
          rel="noopener noreferrer"
          href="https://join.slack.com/t/morehumaninternet/shared_invite/zt-kkbdraz8-XT5~cViVQTJlzaklWgj7Dg"
        >
          <SlackIcon />
          <span className="slack__text">Join our Slack channel</span>
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
            <span className="newsletter__result">{result}</span>
          )}
        </div>
      </section>
    )
  }
)

export default GetUpdates
