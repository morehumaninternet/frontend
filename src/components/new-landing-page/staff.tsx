import React from 'react'
import Img, { FixedObject } from 'gatsby-image'
import colors from '../../styles/shared/colors.scss'

const Staff: React.FC<TeamMember<FixedObject>> = ({ name, title, background_color, background_shape, fixed }) => {
  return (
    <div className="staff-card">
      <Img
        fixed={fixed}
        alt={name}
        title={title}
        style={{
          width: '140px',
          height: '140px',
          borderRadius: background_shape === 'circle' ? '50%' : '0',
          backgroundColor: colors[background_color],
        }}
      />
      <p className="staff-card__name">{name}</p>
      <p className="staff-card__title">{title}</p>
    </div>
  )
}

export default Staff
