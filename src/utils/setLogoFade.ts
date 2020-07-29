import Color from 'color'
import { zip } from 'lodash'


let logoFade = 0

export default (nextLogoFade: number) => {
  if (nextLogoFade === logoFade) return
  logoFade = nextLogoFade

  const whiteRbg = [255, 255, 255]
  const humanBlueRbg = [22, 65, 118]

  const blueWhiteRbg = zip(whiteRbg, humanBlueRbg).map(([whiteCoordinate, humanBlueCoordinate]) => (
    whiteCoordinate! + logoFade * (humanBlueCoordinate! - whiteCoordinate!)
  ))

  const blueWhiteHex = Color.rgb(blueWhiteRbg).hex()

  document.documentElement.style.setProperty('--logo-color-blue-white', blueWhiteHex)
}
