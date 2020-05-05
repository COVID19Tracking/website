import React from 'react'
import paragraphStyle from './paragraph.module.scss'

export default ({ children, additionalClass = '' }) => (
  <p
    className={`homepage-paragraph ${paragraphStyle.paragraph} ${additionalClass}`}
  >
    {children}
  </p>
)
