import React from 'react'
import classnames from 'classnames'
import paragraphStyle from './paragraph.module.scss'

export default ({ children, center, noMargin, additionalClass = '' }) => (
  <p
    className={classnames(
      'homepage-paragraph',
      paragraphStyle.paragraph,
      center && paragraphStyle.center,
      noMargin && paragraphStyle.noMargin,
      additionalClass,
    )}
  >
    {children}
  </p>
)
