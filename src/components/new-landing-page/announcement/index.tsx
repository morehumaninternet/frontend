import React from 'react'

const Announcement = (): JSX.Element => {
  return (
    <div className="announcement-container">
      <img src="/announcement.png" />
      <div className="announcement__text">
        <h2>Stewarding Hawaii’s cultural and natural resources for generations</h2>
        <p>Livable Hawaii Kai Hui</p>
        <a href="#">Learn more</a>
      </div>
    </div>
  )
}

export default Announcement
