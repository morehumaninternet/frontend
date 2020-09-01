import React from 'react'

type HeroProps = {
  additionalClassNames?: string
  heroRef?: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}

export default ({ additionalClassNames, heroRef, children }: HeroProps) => (
  <div className={`hero ${additionalClassNames || ''}`} ref={heroRef}>
    {children}
  </div>
)
