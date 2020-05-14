import React from 'react'
import paragraphStyle from './paragraph.module.scss'

export default ({ children, center, additionalClass = '' }) => (
  <h2
    className={`homepage-paragraph ${paragraphStyle.paragraph} ${center &&
      paragraphStyle.center} ${additionalClass}`}
  >
    {children}
  </h2>
)
