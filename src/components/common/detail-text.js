import React from 'react'
import classnames from 'classnames'
import detailTextStyles from './detail-text.module.scss'

const DetailText = ({
  children,
  className,
  small = false,
  centered = false,
}) => (
  <div
    className={classnames(
      'detail-text',
      detailTextStyles.detailText,
      centered && detailTextStyles.centered,
      small && detailTextStyles.small,
      className,
    )}
  >
    {children}
  </div>
)

export default DetailText
