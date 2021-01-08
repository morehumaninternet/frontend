import React, { useState } from 'react'

type AccordionItemProps = {
  header: string
  description: string
}

const AccordionItem = ({ header, description }: AccordionItemProps): JSX.Element => {
  const [active, setActive] = useState(false)

  return (
    <div className={`accordion_item ${active ? 'active' : ''}`} onClick={() => setActive(!active)}>
      <div className="accordion_header">
        <svg className="arrow" viewBox="0 0 22 29">
          <path d="M0 28.6029V0.20105L21.3088 14.402L0 28.6029Z" fill="black" />
        </svg>
        <h3>{header}</h3>
      </div>
      <div className="accordion__text">
        <p>{description}</p>
      </div>
    </div>
  )
}

export default AccordionItem
