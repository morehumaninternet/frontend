import React from 'react'
import { Parallax } from 'react-scroll-parallax'
import Astronaut from './astronaut'
import AstronautStarGroup from './astronaut-star-group'

export default () => (
  <div className="astronaut-container">
    <AstronautStarGroup />
    <Parallax styleOuter={{ position: 'absolute', width: '100%', top: '0', left: '0' }} y={['100%', '-5%']}>
      <Astronaut />
    </Parallax>
  </div>
)
