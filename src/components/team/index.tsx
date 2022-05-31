import React from 'react'
import { members } from './members'
import Staff from './staff'

const Team: React.FC = () => (
  <div className="team">
    <div className="staff">
      {members.map(member => (
        <Staff
          key={member.name}
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
