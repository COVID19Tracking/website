import React from 'react'
import ImageCredit from '~components/common/image-credit'

export default ({ imageSource, imageAlt, caption, containerStyle }) => (
  <div className={containerStyle}>
    <img src={imageSource} alt={imageAlt} />
    <ImageCredit>{caption}</ImageCredit>
  </div>
)
