import React from 'react'

type StepProps = {
  title: string
  description: string
  icon: React.ReactNode
}

const Step = ({ title, description, icon }: StepProps): JSX.Element => {
  return (
    <div className="step">
      <div className="step-explanation">
        {icon}
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  )
}

export default Step
