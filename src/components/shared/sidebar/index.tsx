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
        <div className="sidebar-links">
          <Link
            className="home-link"
            to="/"
            aria-label="More Human Internet Home"
          >
            <MoreHumanInternetLogo />
          </Link>
          <Link to="/" className="inactive">
            <HomeIcon />
            <span className="description">Home</span>
          </Link>
          <Link to="/issues" className="active">
            <IssuesIcon />
            <span className="description">Issues</span>
          </Link>
          <Link to="/" className="inactive">
            <AddIcon />
            <span className="description">Report</span>
          </Link>
          <Link to="/settings" className="settings">
            <Avatar
              src={currentUser.loaded ? currentUser.user.avatarUrl : undefined}
            />
            <span className="description">
              {currentUser.loaded && currentUser.user.username}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
