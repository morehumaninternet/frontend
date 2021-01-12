import React from 'react'

const Video = ({ videoSrcURL, videoTitle }: { videoSrcURL: string; videoTitle: string }) => (
  <div className="video">
    <iframe
      src={`${videoSrcURL}?autoplay=1&mute=1`}
      title={videoTitle}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </div>
)

export default Video
