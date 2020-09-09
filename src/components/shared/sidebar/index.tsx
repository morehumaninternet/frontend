import React from 'react'
import { Link } from 'gatsby'
import { Avatar } from '@material-ui/core'
import { MoreHumanInternetLogo, HomeIcon, IssuesIcon, AddIcon } from './icons'
import useCurrentUser from '../../../effects/useCurrentUser'

type SidebarProps = {
  location: Location
  currentUser: CurrentUser
}

export default function Sidebar({
  location,
  currentUser,
}: SidebarProps): JSX.Element {
  // TODO: use the path to determine where you are and highlight the links accordingly
  // const path = location.pathname.split('/').filter(part => !!part)

  return (
    <div className="sidebar">
      <div className="sidebar-contents">
        <Link
          className="home-link"
          to="/"
          aria-label="More Human Internet Home"
        >
          <MoreHumanInternetLogo />
        </Link>
        <div className="other-links">
          <Link to="/">
            <HomeIcon open={false} />
            <span className="description">Home</span>
          </Link>
          <Link to="/issues">
            <IssuesIcon open={true} />
            <span className="description">Issues</span>
          </Link>
          <Link to="/">
            <AddIcon open={false} />
            <span className="description">Report</span>
          </Link>
        </div>
        <Link to="/settings">
          <Avatar
            src={currentUser.loaded ? currentUser.user.avatarUrl : undefined}
          />
        </Link>
      </div>
    </div>
  )
}
