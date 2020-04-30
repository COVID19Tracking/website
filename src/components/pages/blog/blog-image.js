import React from 'react'

export default ({ imageSource, imageAlt, caption, containerStyle }) => (
  <div className={containerStyle}>
    <img src={imageSource} alt={imageAlt} />
    <p>{caption}</p>
  </div>
)
