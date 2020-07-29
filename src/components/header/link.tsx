import React from 'react'
import { Link } from 'gatsby'
import Logo from './logo'


type HeaderLinkProps = {
  logoRef?: React.MutableRefObject<SVGSVGElement>
}

export default function HeaderLink({ logoRef }: HeaderLinkProps): JSX.Element {
  return (
    <Link className="home-link" to="/" aria-label="More Human Internet Home" >
      <Logo logoRef={logoRef} />
    </Link>
  )
}
