import React from 'react'
import videoStyles from './video-content-block.module.scss'

const VideoContentBlock = ({ name, url }) => (
  <iframe
    width="560"
    height="315"
    className={videoStyles.video}
    title={name}
    src={`https://www.youtube.com/embed/${url.split('/').pop()}`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
)

export default VideoContentBlock
