import React, { forwardRef } from 'react'

const BlueSection = forwardRef<{}, { children: React.ReactNode }>(
  ({ children, ...rest }, ref): JSX.Element => {
    return (
      <section className="leaders" ref={ref as any} {...rest}>
        <div className="leaders__wrapper">
          {children}
        </div>
      </section>
    )
  }
)

export default BlueSection