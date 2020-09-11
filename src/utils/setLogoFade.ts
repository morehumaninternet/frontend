import Color from 'color'
import { zip } from 'lodash'

let logoFade = 0 // tslint:disable-line:no-let

export default (nextLogoFade: number) => {
  if (nextLogoFade === logoFade) return
  if (nextLogoFade < 0 || nextLogoFade > 1) {
    throw new Error(`Logo fade must be in range (0, 1). Received ${nextLogoFade}`)
  }

  logoFade = nextLogoFade // tslint:disable-line:no-expression-statement

  const whiteRbg: ReadonlyArray<number> = [255, 255, 255]
  const humanBlueRbg: ReadonlyArray<number> = [22, 65, 118]

  const blueWhiteRbg = zip(whiteRbg, humanBlueRbg).map(
    ([whiteCoordinate, humanBlueCoordinate]) => whiteCoordinate! + logoFade * (humanBlueCoordinate! - whiteCoordinate!)
  )

  const blueWhiteHex = Color.rgb(blueWhiteRbg).hex()

  document.documentElement.style.setProperty('--logo-color-blue-white', blueWhiteHex) // tslint:disable-line:no-expression-statement
}
