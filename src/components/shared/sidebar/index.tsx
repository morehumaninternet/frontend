import React from 'react'
import { last } from 'lodash'
import { Link } from 'gatsby'
import { Avatar } from '@material-ui/core'
import { MoreHumanInternetLogo, HomeIcon, IssuesIcon, AddIcon } from './icons'
import { homeHref, issuesHref } from '../../../utils/href'

type SidebarProps = {
  location: Location
  currentUser: CurrentUser
}

export default function Sidebar({ location, currentUser }: SidebarProps): JSX.Element {
  // TODO: use the path to determine where you are and highlight the links accordingly
  const path = location.pathname.split('/').filter(part => !!part)

  const page = last(path)
  if (page !== 'issue' && page !== 'issues') {
    throw new Error('TODO: implement logic for pages other than issue & issues')
  }

  const params = new URLSearchParams(location.search)
  const site = params.get('site')!

  return (
    <div className="sidebar">
      <div className="sidebar-contents">
        <div className="sidebar-links">
          <Link className="home-link" to={homeHref()} aria-label="More Human Internet Home">
            <MoreHumanInternetLogo />
          </Link>
          <Link to={homeHref()} className="inactive">
            <HomeIcon />
            <span className="description">Home</span>
          </Link>
          <Link to={issuesHref({ site })} className="active">
            <IssuesIcon />
            <span className="description">Issues</span>
          </Link>
          <Link to={homeHref()} className="inactive">
            <AddIcon />
            <span className="description">Report</span>
          </Link>
          <Link to="/settings" className="settings">
            <Avatar src={currentUser.loaded ? currentUser.user.avatarUrl : undefined} />
            <span className="description">{currentUser.loaded && currentUser.user.username}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
