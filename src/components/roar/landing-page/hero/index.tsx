import React, { forwardRef } from 'react'
import Dots from './dots'

const Hero = forwardRef(
  ({ dotsRef }: { dotsRef: React.MutableRefObject<any> }, ref): JSX.Element => {
    return (
      <section className="hero-container" ref={ref as any}>
        <Dots ref={dotsRef} />
      </section>
    )
  }
)

export default Hero
