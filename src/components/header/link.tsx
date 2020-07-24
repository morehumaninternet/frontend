import React from 'react'
import Color from 'color'
import { Link } from 'gatsby'
import { zip } from 'lodash'
import Logo from '../logo'


type HeaderLinkProps = {
  logoRef?: React.MutableRefObject<SVGSVGElement>
  logoFade?: number
}

type HeaderLogoProps = HeaderLinkProps & {
  hover: boolean
}

const whiteRbg = [255, 255, 255]
const humanBlueRbg = [22, 65, 118]


function HeaderLogo({ hover, logoRef, logoFade = 0 }: HeaderLogoProps) {

  const blueWhiteRbg = zip(whiteRbg, humanBlueRbg).map(([whiteCoordinate, humanBlueCoordinate]) => (
    whiteCoordinate! + logoFade * (humanBlueCoordinate! - whiteCoordinate!)
  ))

  const blueWhiteHex = Color.rgb(blueWhiteRbg).hex()
  const pinkHex = '#FA759E'

  const [primaryHex, secondaryHex] = (
    hover
      ? [pinkHex, blueWhiteHex]
      : [blueWhiteHex, pinkHex]
  )

  return (
    <Logo
      logoRef={logoRef}
      primaryHex={primaryHex}
      secondaryHex={secondaryHex}
      pinkHex={pinkHex}
      blueWhiteHex={blueWhiteHex}
    />
  )
}


export default function HeaderLink({ logoRef, logoFade }: HeaderLinkProps): JSX.Element {
  const [hover, setHover] = React.useState(false)
  const onMouseEnter = () => setHover(true)
  const onMouseLeave = () => setHover(false)

  return (
    <Link to="/" aria-label="More Human Internet Home" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <HeaderLogo logoRef={logoRef} logoFade={logoFade} hover={hover} />
    </Link>
  )
}
