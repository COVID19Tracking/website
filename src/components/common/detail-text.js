import React from 'react'
import classnames from 'classnames'
import detailTextStyles from './detail-text.module.scss'

const DetailText = ({ children, className, small = false }) => (
  <div
    className={classnames(
      'detail-text',
      detailTextStyles.detailText,
      className,
      small && detailTextStyles.small,
    )}
  >
    {children}
  </div>
)

export default DetailText
