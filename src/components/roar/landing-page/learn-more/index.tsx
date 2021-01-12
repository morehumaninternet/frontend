import React, { forwardRef } from 'react'
import { BigCircle, SmallCircle } from '../../../shared/circles'
import Info from './info'

const LearnMore = forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="learn-more" ref={ref as any}>
        <BigCircle />
        <SmallCircle />
        <Info />
      </section>
    )
  }
)

export default LearnMore
