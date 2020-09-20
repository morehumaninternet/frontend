import React from 'react'

type StarProps = { cx: number; cy: number; r: number; durationSeconds: number }

function Star({ cx, cy, r, durationSeconds }: StarProps): JSX.Element {
  return (
    <circle cx={cx} cy={cy} r={r} fill="#fff">
      <animate attributeName="opacity" values="0.25;0.95;0.25" dur={`${durationSeconds}s`} repeatCount="indefinite" />
    </circle>
  )
}

export default function Stars({ x, y, starCount }: { x: number; y: number; starCount: number }): JSX.Element {
  // Generate starCount stars within the xy region, none of them within 100 pixels of another
  const stars: StarProps[] = [] // tslint:disable-line:readonly-array

  while (stars.length < starCount) {
    const cx = x * Math.random()
    const cy = y * Math.random()
    const someStarTooClose = stars.some(star => {
      const distance = Math.sqrt(Math.pow(star.cx - cx, 2) + Math.pow(star.cy - cy, 2))
      return distance < 100
    })
    if (someStarTooClose) continue // the generated star is too close, try again
    const r = 1.5 + 2.7 * Math.random()
    const durationSeconds = 3 + Math.random()
    stars.push({ cx, cy, r, durationSeconds }) // tslint:disable-line:no-expression-statement
  }

  return (
    <svg viewBox={`0 0 ${x} ${y}`} fill="none" preserveAspectRatio="xMinYMid slice" className="stars">
      {stars.map(star => (
        <Star {...star} />
      ))}
    </svg>
  )
}
