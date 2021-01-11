import React, { forwardRef } from 'react'
import Dots from './dots'

const Hero = forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="hero-container" ref={ref as any}>
        <Dots />
      </section>
    )
  }
)

export default Hero
