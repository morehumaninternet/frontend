import React from 'react'

type StaffProps = TeamMember & { makeAndTrackRef: () => React.MutableRefObject<any> }

const Staff: React.FC<StaffProps> = ({ name, title, image_file_name, background_color, background_shape, makeAndTrackRef }) => {
  return (
    <div className="staff-card">
      <img className={`staff-card__image ${background_color} ${background_shape}`} ref={makeAndTrackRef()} src={`/headshots/${image_file_name}`} alt={name} />
      <p className="staff-card__name" ref={makeAndTrackRef()}>
        {name}
      </p>
      <p className="staff-card__title" ref={makeAndTrackRef()}>
        {title}
      </p>
    </div>
  )
}

export default Staff
