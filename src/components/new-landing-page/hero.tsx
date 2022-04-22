import React from 'react'


const Hero = React.forwardRef((_, ref) => (
  <section className="new-landing-page-hero" ref={ref as any}>
    <div className="new-landing-page-hero__content">
      <h1>Bringing technology where it’s needed most</h1>
      <h2>We are an international community of expert contributors working directly with valuable causes</h2>
    </div>
  </section>
))

export default Hero
