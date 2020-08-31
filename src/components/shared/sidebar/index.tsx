import React from 'react'
import { Link } from 'gatsby'
import { Avatar } from '@material-ui/core'
import useCurrentUser from '../../../effects/useCurrentUser';


function MoreHumanInternetLogo() {
  return (
    <svg width={38} height={37} viewBox="0 0 38 37" fill="none">
      <path
        d="M9.343 10.494c1.983 0 3.595-1.6 3.595-3.566 0-1.966-1.613-3.564-3.595-3.564-1.982 0-3.594 1.6-3.594 3.564 0 1.966 1.612 3.566 3.594 3.566z"
        fill="#FA759E"
      />
      <path
        d="M18.143 3.832c0 2.114 1.732 3.833 3.863 3.833 2.13 0 3.864-1.72 3.864-3.833C25.87 1.72 24.137 0 22.006 0c-2.13 0-3.863 1.72-3.863 3.832z"
        fill="#fff"
      />
      <path
        d="M36.222 25.406c-.398-.336-.861-.405-1.443-.308-.035-.56-.21-1.084-.538-1.488-.453-.557-1.134-.862-1.925-.862h-.037c-.383.005-.806.093-1.26.22v-8.023c0-2.364-1.939-4.287-4.32-4.287h-9.383a4.325 4.325 0 00-3.964 2.589H5.044c-2.214 0-4.014 1.786-4.014 3.982-.04 8.777-.04 13.864 0 15.26.018.648 1.46 1.875 1.96 2.005C5.501 35.152 9.69 36 14.6 36c6.435-.002 14.109-1.457 20.849-6.705.152-.103 1.484-1.04 1.549-2.279.022-.419-.096-1.037-.776-1.61zm-3.928-1.397h.022c.408 0 .72.131.932.39.215.267.308.648.276 1.06-.414.156-.875.347-1.395.564-1.691.703-4.097 1.704-7.46 2.522.07-.206.105-.405.117-.588.04-.583-.018-1.098-.163-1.548 1.951-.478 3.538-1.067 4.825-1.559 1.222-.466 2.186-.834 2.846-.841zM17.316 11.918h9.382c1.682 0 3.05 1.357 3.05 3.026v8.445c-.243.09-.49.183-.754.285-.5.19-1.064.398-1.66.608v-8.705a.634.634 0 00-.636-.63.633.633 0 00-.636.63v9.122c-.663.205-1.362.407-2.133.583-.872-.83-2.057-.779-2.084-.78-1.657.02-2.908-.015-3.892-.086v-8.838a.634.634 0 00-.636-.63.633.633 0 00-.636.63v8.705c-1.242-.183-1.865-.46-2.414-.77v-8.57c-.001-1.668 1.367-3.025 3.05-3.025zm-15.015 5.31c0-1.501 1.23-2.722 2.743-2.722h7.996c-.015.146-.045.288-.045.438v7.873c-1.135-.527-2.963-1.02-7.315-1.225v-3.783a.633.633 0 00-.635-.63.633.633 0 00-.636.63v3.734c-.177-.005-.341-.014-.525-.017a2.96 2.96 0 00-1.583.402v-4.7zM34.7 28.278c-11.47 8.926-25.767 6.468-31.384 4.996a1.775 1.775 0 01-1.332-1.726l.034-6.995c.002-.481.196-.931.546-1.267a1.782 1.782 0 011.288-.5c6.981.176 8.291.948 9.448 1.628 1.295.763 2.424 1.43 8.581 1.348.01-.002.73-.024 1.201.455.342.349.49.907.44 1.655-.013.185-.052.74-1.159 1.175-.01.003-.017.01-.026.014l-.014.001c-1.178.451-3.77.827-9.449.072a.635.635 0 00-.714.54.63.63 0 00.546.708c2.217.296 4.137.444 5.749.444 1.816 0 3.236-.192 4.257-.566h.005c4.67-.896 7.82-2.206 9.907-3.075 1.292-.535 2.508-1.042 2.776-.816.309.26.337.454.33.58-.025.487-.683 1.088-1.03 1.328z"
        fill="#fff"
        stroke="#fff"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width={26} height={22} viewBox="0 0 26 22" fill="none">
      <path
        opacity={0.26}
        d="M13 0l13 12.74-1.591 1.6L13 3.17 1.591 14.34 0 12.74 13 0zm7.274 19.755v-6.931l2.273 2.23V22H14.82v-7.184H11.18V22H3.452v-6.945l2.274-2.231v6.931h3.182v-7.184h8.184v7.184h3.182z"
        fill="#fff"
      />
    </svg>
  );
}

function IssuesIcon() {
  return (
    <svg width={26} height={25} viewBox="0 0 26 25" fill="none">
      <path
        d="M13 22.505l10.974-7.09L26 16.61 13 25 0 16.61l2.039-1.195L13 22.505zm0-4.49l10.974-7.09L26 12.118l-13 8.39-13-8.39 2.039-1.195L13 18.014zm0-2.01L0 7.616 13 0l13 7.616-13 8.39zM4 7.708l9 5.804 9-5.804-9-5.291-9 5.291z"
        fill="#fff"
      />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <path
        opacity={0.26}
        d="M22 9.72v2.56h-9.72V22H9.72v-9.72H0V9.72h9.72V0h2.56v9.72H22z"
        fill="#fff"
      />
    </svg>
  );
}

export default function Sidebar(): JSX.Element {
  const currentUser = useCurrentUser()

  return (
    <div className="sidebar">
      <Link className="home-link" to="/" aria-label="More Human Internet Home" >
        <MoreHumanInternetLogo />
      </Link>
      <div className="other-links">
        <Link to="/">
          <HomeIcon />
        </Link>
        <Link to="/">
          <IssuesIcon />
        </Link>
        <Link to="/">
          <AddIcon />
        </Link>
      </div>
      <Link to="/settings">
        <Avatar src={currentUser.loaded ? currentUser.user.avatarUrl : undefined} />
      </Link>
    </div>
  )
}