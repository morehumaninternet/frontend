import React from 'react'
import { last } from 'lodash'
import { Avatar } from '@material-ui/core'
import { GitHub, Person } from '@material-ui/icons'
import TextFieldWithIcon from './text-field-with-icon'
import { getUserByUsername } from '../../clients/github'
import debounceDefer from '../../utils/debounceDefer'


type GithubInputProps = {
  setChecking(checking: boolean): void
}

const debouncedGetUserByUserName = debounceDefer(getUserByUsername, 500)

const githubIcon = <GitHub />

// class GithubInput extends React.Component<GithubInputProps, { icon: React.ReactNode }> {

//   ref = React.createRef<HTMLInputElement>()

//   state = {
//     icon: githubIcon
//   }

//   onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({ icon: githubIcon })
//     this.props.setChecking(true)
//     const username = last(event.target.value.split('/'))!

//     getUserByUsername(username)
//       .then(user => {
//         console.log('user', user)
//         if (ref.current) { console.log(ref.current) }
//         // ref.current?.setCustomValidity('')
//         setIcon(<img src={user.avatar_url} />)
//         setChecking(false)
//       })
//       .catch(err => {
//         console.error(err)
//         if (ref.current) { console.log(ref.current) }
//         // ref.current?.setCustomValidity(`Could not find github user ${username}`)
//         setChecking(false)
//       })
//   }


//   render() {
//     return (
//       <TextFieldWithIcon
//         ref={this.ref}
//         label="Github Account"
//         name="githubAccount"
//         variant="outlined"
//         onChange={onChange}
//         onBlur={() => this.doesGithubAccountExist()}
//         startIcon={icon}
//       />
//     )
//   }
// }


export default function GithubInput({ setChecking }: GithubInputProps) {
  const ref = React.createRef<HTMLInputElement>()

  const [icon, setIcon] = React.useState(githubIcon)
  const [error, setError] = React.useState(false)
  const [helperText, setHelperText] = React.useState<null | string>(null)

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIcon(githubIcon)
    setChecking(true)

    const username = last(event.target.value.split('/'))!

    debouncedGetUserByUserName(username)
      .then(user => {
        console.log('user', user)
        if (ref.current) { console.log(ref.current) }
        // ref.current?.setCustomValidity('')
        setIcon(<Avatar src={`https://github.com/${username}.png?size=55`} />)
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
      // onBlur={() => this.doesGithubAccountExist()}
      startIcon={icon}
    />
  )
}
