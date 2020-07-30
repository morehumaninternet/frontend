export default function numPixels(style: string): number {
  const match = style.match(/^(.+)px$/)

  if (!match) {
    throw new Error(`style must end in px, got ${style}`)
  }

  const pixels = Number(match[1])
  if (Number.isNaN(pixels)) {
    throw new Error(`${style} does not have numeric pixels`)
  }

  return pixels
}
