import React from 'react'
import { Link } from 'gatsby'
import HeaderLogo from './logo'


type HeaderProps = {
  children?: React.ReactNode
}

const Header = ({ children }: HeaderProps) => (
  <header>
    <Link to="/">
      <HeaderLogo />
    </Link>
    {children}
  </header>
)


export default Header
