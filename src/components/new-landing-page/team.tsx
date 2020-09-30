import React from 'react'
import { Button } from '@material-ui/core'

import useTeam from './useTeam'
import Staff from './staff'

const Team = () => {
  const { teamMembers } = useTeam()

  return (
    <div className="team">
      <div className="volunteer">
        <h1>Community of volunteers</h1>
        <p>
          Go deeper than that. Large corporations have taken control of a once open system. While they have brought efficiency, the platforms they have built
          are for their benefit.
        </p>
        <Button className="mhi-button">Volunteer</Button>
      </div>
      <div className="staff">
        {teamMembers.map(member => (
          <Staff
            key={member.name}
            name={member.name}
            title={member.title}
            background_color={member.background_color}
            background_shape={member.background_shape}
            fixed={member.fixed}
          />
        ))}
      </div>
    </div>
  )
}

export default Team
