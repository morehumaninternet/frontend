import React, { forwardRef } from 'react'

const BlueSection = forwardRef<{}, { children: React.ReactNode }>(
  ({ children, ...rest }, ref): JSX.Element => {
    return (
      <section className="blue-section" ref={ref as any} {...rest}>
        <div className="blue-section__contents">
          {children}
        </div>
      </section>
    )
  }
)

export default BlueSection
