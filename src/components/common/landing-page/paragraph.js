import React from 'react'
import paragraphStyle from './paragraph.module.scss'

export default ({ children, center, additionalClass = '' }) => (
  <p
    className={`homepage-paragraph ${paragraphStyle.paragraph} ${center &&
      paragraphStyle.center} ${additionalClass}`}
  >
    {children}
  </p>
)
