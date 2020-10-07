import React from 'react'
import { last } from 'lodash'
// @ts-ignore
import { LocalizedLink } from 'gatsby-theme-i18n'
import { Avatar } from '@material-ui/core'
import { MoreHumanInternetLogo, HomeIcon, IssuesIcon, AddIcon } from './icons'
import { issuesHref } from '../../../utils/href'
import Popper from '../popper'

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
          <LocalizedLink className="home-link" to="/" aria-label="More Human Internet Home">
            <MoreHumanInternetLogo />
          </LocalizedLink>
          <LocalizedLink className="inactive">
            <Popper position="top" message="Coming soon, see all your issues on one page.">
              <div>
                <HomeIcon />
                <span className="description">Home</span>
              </div>
            </Popper>
          </LocalizedLink>

          <LocalizedLink to={issuesHref({ site })} className="active">
            <IssuesIcon />
            <span className="description">Issues</span>
          </LocalizedLink>
          <LocalizedLink className="inactive">
            <Popper position="bottom" message="Coming soon, report a new issue.">
              <div>
                <AddIcon />
                <span className="description">Report</span>
              </div>
            </Popper>
          </LocalizedLink>
          <LocalizedLink className="settings">
            <Popper position="top" message="Coming soon, configure settings">
              <div>
                <Avatar src={currentUser.loaded ? currentUser.user.avatarUrl : undefined} />
                <span className="description">{currentUser.loaded && currentUser.user.username}</span>
              </div>
            </Popper>
          </LocalizedLink>
        </div>
      </div>
    </div>
  )
}
