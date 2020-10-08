import React from 'react'
import { Parallax } from 'react-scroll-parallax'
import { MountainBackground1, MountainBackground2 } from './mountain-background'
import MountainMidground from './mountain-midground'
import MountainForeground from './mountain-foreground'

export default () => (
  <>
    <div className="mountain-background">
      <Parallax
        styleOuter={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0' }}
        styleInner={{ width: '100%', height: '100%' }}
        y={['-5%', '60%']}
      >
        <MountainBackground1 />
      </Parallax>
      <Parallax
        styleOuter={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0' }}
        styleInner={{ width: '100%', height: '100%' }}
        y={['-5%', '60%']}
      >
        <MountainBackground2 />
      </Parallax>
      <Parallax
        styleOuter={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0' }}
        styleInner={{ width: '100%', height: '100%' }}
        y={['2%', '40%']}
      >
        <MountainMidground />
      </Parallax>
    </div>
    <MountainForeground />
  </>
)
