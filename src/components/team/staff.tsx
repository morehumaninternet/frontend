import React from 'react'

// disable the makeAndTrackRef
type StaffProps = TeamMember
// type StaffProps = TeamMember & { makeAndTrackRef: () => React.MutableRefObject<any> }

const Staff: React.FC<StaffProps> = ({ name, title, image_file_name, background_color, background_shape }) => {
  return (
    <div className="staff-card">
      <img className={`staff-card__image ${background_color} ${background_shape}`} src={`/headshots/${image_file_name}`} alt={name} />
      <p className="staff-card__name">
        {name}
      </p>
      <p className="staff-card__title">
        {title}
      </p>
    </div>
  )
}

export default Staff
