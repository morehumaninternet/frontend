import React from 'react'


export type CurrentUser =
  | { loaded: false }
  | { loaded: true, user: User }


export default function useCurrentUser(): CurrentUser {
  const [currentUser, setCurrentUser] = React.useState<CurrentUser>({ loaded: false })

  // TODO: authentication
  if (typeof window !== 'undefined' && !currentUser.loaded) {
    setTimeout(() => {
      setCurrentUser({
        loaded: true,
        user: {
          username: 'sillywalks',
          avatarUrl: 'https://github.com/will-weiss.png?size=71'
        }
      })
    }, 0)
  }

  return currentUser
}
