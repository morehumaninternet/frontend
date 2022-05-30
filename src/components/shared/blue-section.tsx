import React, { forwardRef } from 'react'

const BlueSection = forwardRef<{}, { children: React.ReactNode }>(
  ({ children, ...rest }, ref): JSX.Element => {
    return (
      <section className="full-width blue-section" ref={ref as any} {...rest}>
        <div>
          {children}
        </div>
      </section>
    )
  }
)

export default BlueSection
