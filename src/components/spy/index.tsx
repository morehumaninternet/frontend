// tslint:disable:no-expression-statement no-let
import React, { useState } from 'react'

const SpyPage = (): JSX.Element => {
  const [url, setUrl] = useState<string>('')
  const [spyList, setSpyList] = useState<ReadonlyArray<string>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError('')
    setSpyList([])
    setLoading(true)
    let response, data
    try {
      const urlWithProtocol = url.startsWith('http') ? url : `http://${url}`
      response = await fetch(`https://localhost:5004/v1/spy/?url=${urlWithProtocol}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      data = await response.json()
    } catch (error) {
      console.error(error)
      setLoading(false)
      setError('Error while scanning for spies')
      return
    }
    setLoading(false)
    if (!response || !response.ok) {
      setError('Error while scanning for spies')
      return
    } else {
      if (data.spies) {
        setSpyList(data.spies.join(', '))
      } else {
        setError('Could not find any spies')
      }
    }
  }

  return (
    <div className="spy-container">
      <div className="wrapper">
        <h1>Who's been spying on me?</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="url" placeholder="https://..." value={url} onChange={e => setUrl(e.target.value)} />
          <input className="mhi-button" type="submit" value="analyze" />
        </form>
        {loading && <p>Please wait...</p>}
        {error && <p>{error}</p>}
        {spyList && <p>{spyList}</p>}
      </div>
    </div>
  )
}

export default SpyPage
