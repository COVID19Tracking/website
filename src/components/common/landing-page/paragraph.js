import React from 'react'
import classnames from 'classnames'
import paragraphStyle from './paragraph.module.scss'

export default ({
  children,
  center,
  noMargin,
  narrow,
  additionalClass = '',
}) => (
  <p
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
  </p>
)
