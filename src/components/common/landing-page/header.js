import React from 'react'
import classnames from 'classnames'
import paragraphStyle from './paragraph.module.scss'

export default ({
  children,
  center,
  narrow,
  noMargin,
  additionalClass = '',
}) => (
  <h2
    className={classnames(
      'homepage-paragraph',
      paragraphStyle.paragraph,
      center && paragraphStyle.center,
      noMargin && paragraphStyle.noMargin,
      narrow && paragraphStyle.narrow,
      additionalClass,
    )}
  >
    {children}
  </h2>
)
