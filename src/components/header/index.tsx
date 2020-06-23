import React from 'react'
import { Link } from 'gatsby'
import HeaderLogo from './logo'


type HeaderProps = {
  children?: React.ReactNode
}

const Header = ({ children }: HeaderProps) => (
  <header
    style={{
      height: 100,
      position: 'fixed',
      top: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: 100,
      paddingRight: 100,
      paddingTop: 25,
      paddingBottom: 25
    }}
  >
    <Link to="/">
      <HeaderLogo />
    </Link>
    {children}
  </header>
)


export default Header
