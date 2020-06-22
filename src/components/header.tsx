import { Link } from 'gatsby'
import React from 'react'
import Logo from '../images/logo.svg'


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
      <img src={Logo} />
    </Link>
    {children}
  </header>
)


export default Header
