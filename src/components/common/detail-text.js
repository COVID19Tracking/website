import React from 'react'
import classnames from 'classnames'
import detailTextStyles from './detail-text.module.scss'

const DetailText = ({ children, className, centered = false }) => (
  <div
    className={classnames(
      'detail-text',
      detailTextStyles.detailText,
      centered && detailTextStyles.centered,
      className,
    )}
  >
    {children}
  </div>
)

export default DetailText
