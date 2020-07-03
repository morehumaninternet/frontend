import React from 'react'
import { last } from 'lodash'
import { Avatar } from '@material-ui/core'
import { GitHub, Person, FilterFrames } from '@material-ui/icons'
import TextFieldWithIcon from './text-field-with-icon'
import { getUserByUsername } from '../../clients/github'
import debounceDefer from '../../utils/debounceDefer'



const debouncedGetUserByUserName = debounceDefer(getUserByUsername, 500)

const githubIcon = <GitHub style={{ width: 35, height: 35 }} />

type GithubInputProps = {
  checking: boolean
  setChecking(checking: boolean): void
}

export default function GithubInput({ checking, setChecking }: GithubInputProps) {

  const [testingUsername, setTestingUsername] = React.useState<string>('')
  const [confirmedUsername, setConfirmedUsername] = React.useState<null | string>(null)
  const [avatar, setAvatar] = React.useState<null | React.ReactNode>(null)
  const [avatarLoaded, setAvatarLoaded] = React.useState(false)
  const [blur, setBlur] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [helperText, setHelperText] = React.useState<null | string>(null)

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const username = last(event.target.value.split('/'))!
    setAvatar(null)
    setAvatarLoaded(false)
    setTestingUsername(username)
    setError(false)
    setHelperText(null)
    setChecking(true)
  }

  React.useEffect(() => {
    debouncedGetUserByUserName(testingUsername)
      .then(user => {
        if (user && user.avatar_url) {
          console.log('in here')
          setConfirmedUsername(testingUsername)
          setAvatar(<Avatar
            style={{ width: 35, height: 35 }}
            src={`https://github.com/${testingUsername}.png?size=71&_=${new Date().getTime()}`}
            imgProps={{
              onLoad: () => {
                console.log('YES')
                setAvatarLoaded(true)
              }
            }}
          />)
          setError(false)
          setHelperText(null)
          setChecking(false)
          return
        }
        throw new Error(`User ${testingUsername} not found`)
      })
      .catch(err => {
        console.error(err)
        setConfirmedUsername(null)
        setChecking(false)
      })
  }, [testingUsername])

  React.useEffect(() => {
    if (!blur) {
      setError(false)
      setHelperText(null)
    } else if (testingUsername && !confirmedUsername && !checking) {
      setError(true)
      setHelperText(`No user found by that name`)
    }
  }, [blur, testingUsername, confirmedUsername, checking])

  return (
    <>
      {
        avatar && !avatarLoaded && (
          <div style={{ display: 'none' }}>
            {avatar}
          </div>
        )
      }
      <TextFieldWithIcon
        label="Github Username"
        name="githubUsername"
        variant="outlined"
        onChange={onChange}
        onFocus={() => setBlur(false)}
        onBlur={() => setBlur(true)}
        error={error}
        helperText={helperText}
        startIcon={(avatarLoaded && avatar) ? avatar : githubIcon}
      />
    </>
  )
}
