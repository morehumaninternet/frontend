// tslint:disable:no-expression-statement no-class no-this
import React from 'react'
import axios from 'axios'
import { last } from 'lodash'
import { Avatar } from '@material-ui/core'
import { GitHub } from '@material-ui/icons'
import TextFieldWithIcon from './text-field-with-icon'
import debounceDefer from '../../../utils/debounceDefer'

async function getUserByUsername(username: string): Promise<any> {
  if (!username) return null
  const result = await axios(`https://api.github.com/users/${username}`)
  return result.data
}

const debouncedGetUserByUserName = debounceDefer(getUserByUsername, 200)

const githubIcon = <GitHub />

// Loads the avatar of a given username, if present.
// Until an avatar has loaded, display the default github icon.
function GithubAvatar({ username }: { username: null | string }): JSX.Element {
  const [avatar, setAvatar] = React.useState<null | React.ReactNode>(null)
  const [avatarLoaded, setAvatarLoaded] = React.useState(false)

  React.useEffect(() => {
    if (username) {
      setAvatar(
        <Avatar
          src={`https://github.com/${username}.png?size=71`}
          imgProps={{
            onLoad: () => setAvatarLoaded(true),
          }}
        />
      )
    } else {
      setAvatar(null)
      setAvatarLoaded(false)
    }
  }, [username])

  // The display: 'none' trick is to put the underlying <img> on the page, forcing it to load
  return (
    <>
      {!avatarLoaded && avatar && <div style={{ display: 'none' }}>{avatar}</div>}
      {avatarLoaded && avatar ? avatar : githubIcon}
    </>
  )
}

type GithubInputProps = {
  checking: boolean
  setChecking(checking: boolean): void
  onChange(): void
}

export default function GithubInput({ checking, setChecking, onChange: formOnChange }: GithubInputProps): JSX.Element {
  const inputRef: React.MutableRefObject<HTMLInputElement> = React.useRef() as any
  const [testingUsername, setTestingUsername] = React.useState<string>('')
  const [confirmedUsername, setConfirmedUsername] = React.useState<null | string>(null)

  const [blur, setBlur] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [helperText, setHelperText] = React.useState<null | string>(null)

  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const username = last(event.target.value.split('/'))!
    setTestingUsername(username)
    setConfirmedUsername(null)
    setError(false)
    setHelperText(null)
    inputRef.current?.setCustomValidity('')
    formOnChange()
    setChecking(true)
  }

  React.useEffect(() => {
    debouncedGetUserByUserName(testingUsername)
      .then(user => {
        if (user && user.avatar_url) {
          setConfirmedUsername(testingUsername)
          setError(false)
          setHelperText(null)
          inputRef.current?.setCustomValidity('')
          setChecking(false)
          return
        }
        throw new Error(`404: User ${testingUsername} not found`)
      })
      .catch(err => {
        if (err.message.includes('404')) {
          setConfirmedUsername(null)
          setChecking(false)
        } else {
          throw err
        }
      })
  }, [testingUsername])

  React.useEffect(() => {
    if (!blur) {
      setError(false)
      setHelperText(null)
    } else if (testingUsername && !confirmedUsername && !checking) {
      setError(true)
      setHelperText(`Could not find github account ${testingUsername}`)
      inputRef.current?.setCustomValidity(`Could not find github account ${testingUsername}`)
    }
  }, [blur, testingUsername, confirmedUsername, checking])

  return (
    <TextFieldWithIcon
      inputRef={inputRef}
      label="Github Username"
      name="githubUsername"
      variant="outlined"
      onChange={onChange}
      onFocus={() => setBlur(false)}
      onBlur={() => setBlur(true)}
      error={error}
      helperText={helperText}
      startIcon={<GithubAvatar username={confirmedUsername} />}
    />
  )
}
