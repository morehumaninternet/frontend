import React, { useState } from 'react'

const SpyPage = (): JSX.Element => {
  const [url, setUrl] = useState<string>('')
  const [spyList, setSpyList] = useState<Maybe<ReadonlyArray<string>>>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    // tslint:disable-next-line no-expression-statement
    e.preventDefault()

    const response = await fetch(`/spy/?url=${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <div className="spy-container">
      <div className="wrapper">
        <h1>Who's been spying on me?</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="url" placeholder="https://..." value={url} onChange={e => setUrl(e.target.value)} />
          <input type="submit" value="analyze" />
        </form>
        {spyList}
      </div>
    </div>
  )
}

export default SpyPage
