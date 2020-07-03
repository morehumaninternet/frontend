import React from 'react'
import { debounce, last } from 'lodash'
import { Button, Card, CardContent, FormGroup, TextField } from '@material-ui/core'
import { GitHub, Person } from '@material-ui/icons'
import TextFieldWithIcon from './text-field-with-icon'
import { getUserByUsername } from '../../clients/github'


type GithubInputProps = {
  setChecking(checking: boolean): void
}

const debouncedGetUserByUserName = debounce(getUserByUsername, 200)

const githubIcon = <GitHub />

export default function GithubInput({ setChecking }: GithubInputProps) {
  const ref = React.createRef<HTMLInputElement>()
  const [icon, setIcon] = React.useState(githubIcon)

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIcon(githubIcon)
    setChecking(true)
    const username = last(event.target.value.split('/'))!

    getUserByUsername(username)
      .then(user => {
        console.log('user', user)
        if (ref.current) { console.log(ref.current) }
        // ref.current?.setCustomValidity('')
        setIcon(<img src={user.avatar_url} />)
        setChecking(false)
      })
      .catch(err => {
        console.error(err)
        if (ref.current) { console.log(ref.current) }
        // ref.current?.setCustomValidity(`Could not find github user ${username}`)
        setChecking(false)
      })
  }

  return (
    <TextFieldWithIcon
      ref={ref}
      label="Github Account"
      name="githubAccount"
      variant="outlined"
      onChange={onChange}
      onBlur={() => this.doesGithubAccountExist()}
      startIcon={icon}
    />
  )
}
