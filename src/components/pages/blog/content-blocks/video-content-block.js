import React from 'react'
import classnames from 'classnames'
import videoStyles from './video-content-block.module.scss'

const VideoContentBlock = ({ name, url, className }) => (
  <iframe
    width="980"
    height="551"
    className={classnames(videoStyles.video, className)}
    title={name}
    src={`https://www.youtube.com/embed/${url.split('/').pop()}`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
)

export default VideoContentBlock
