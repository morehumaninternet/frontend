import React from 'react'

function Star({ cx, cy, r, durationSeconds }: { cx: number; cy: number; r: number; durationSeconds: number }): JSX.Element {
  return (
    <circle cx={cx} cy={cy} r={r} fill="#fff">
      <animate attributeName="opacity" values="0.25;0.75;0.25" dur={`${durationSeconds}s`} repeatCount="indefinite" />
    </circle>
  )
}

export default function Stars(props: any): JSX.Element {
  return (
    <svg viewBox="0 0 1358 566" fill="none" className="stars" {...props}>
      <Star cx={737.215} cy={442.206} r={3.62757} durationSeconds={3.1} />
      <Star cx={404.77} cy={176.5} r={3.5} durationSeconds={3.2} />
      <Star cx={156.925} cy={350.5} r={2.5} durationSeconds={3.3} />
      <Star cx={1252.41} cy={40.3603} r={1.36034} durationSeconds={3.4} />
      <Star cx={43.8252} cy={1.36034} r={1.36034} durationSeconds={3.5} />
      <Star cx={26.831} cy={370.36} r={1.36034} durationSeconds={3.6} />
      <Star cx={1221.008} cy={271.814} r={1.81379} durationSeconds={3.7} />
      <Star cx={249.207} cy={4.81379} r={1.81379} durationSeconds={3.8} />
      <Star cx={347.174} cy={538.814} r={1.81379} durationSeconds={3.7} />
      <Star cx={381.161} cy={133.814} r={1.81379} durationSeconds={3.6} />
      <Star cx={731.04} cy={25.814} r={1.81379} durationSeconds={3.5} />
      <Star cx={392.158} cy={563.814} r={1.81379} durationSeconds={3.4} />
      <Star cx={599.272} cy={393} r={2} durationSeconds={3.3} />
      <Star cx={661.877} cy={558.628} r={3.62757} durationSeconds={3.2} />
      <Star cx={4.10581} cy={527.628} r={3.62757} durationSeconds={3.1} />
      <Star cx={47.7303} cy={241.267} r={2.26723} durationSeconds={3} />
      <Star cx={394.074} cy={301.183} r={3.17413} durationSeconds={3.1} />
      <Star cx={1015.3} cy={46.1741} r={3.17413} durationSeconds={3.2} />
      <Star cx={1247.55} cy={491.5} r={1.5} durationSeconds={3.3} />
      <Star cx={1354.73} cy={236.721} r={2.72068} durationSeconds={3.4} />
      <Star cx={278.65} cy={473.267} r={2.26723} durationSeconds={3.5} />
      <Star cx={135.247} cy={137.489} r={1.81379} durationSeconds={3.6} />
      <Star cx={1241.55} cy={306.5} r={2.5} durationSeconds={3.7} />
      <Star cx={1083.1} cy={523} r={2} durationSeconds={3.8} />
      <Star cx={1022.21} cy={272.081} r={4.08102} durationSeconds={3.7} />
      <Star cx={951.149} cy={554} r={3} durationSeconds={3.6} />
    </svg>
  )
}
