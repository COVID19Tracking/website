import React from 'react'
import classnames from 'classnames'
import paragraphStyle from './paragraph.module.scss'

export default ({
  children,
  center,
  noMargin,
  narrow,
  detail = false,
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
    {detail && <div className={paragraphStyle.detail}>{detail}</div>}
    {children}
  </p>
)
