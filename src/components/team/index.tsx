import React from 'react'
import { members } from './members'
import Staff from './staff'

type TeamProps = {
  makeAndTrackRef: () => React.MutableRefObject<any>
  volunteer(): void
}

const Team: React.FC<TeamProps> = ({ makeAndTrackRef, volunteer }) => (
  <div className="team">
    <div className="staff">
      {members.map(member => (
        <Staff
          key={member.name}
          makeAndTrackRef={makeAndTrackRef}
          name={member.name}
          title={member.title}
          image_file_name={member.image_file_name}
          background_color={member.background_color}
          background_shape={member.background_shape}
        />
      ))}
    </div>
  </div>
)

export default Team
