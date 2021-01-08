import React from 'react'
import V1 from './v1'
import V2 from './v2'

export default function Footer({ kind }: { kind: 'v1' | 'v2' }): JSX.Element {
  if (kind === 'v1') {
    return <V1 />
  } else {
    return <V2 />
  }
}
