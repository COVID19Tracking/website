import React from 'react'
import classnames from 'classnames'
import detailTextStyles from './detail-text.module.scss'

const DetailText = ({ children, className }) => (
  <div
    className={classnames(
      'detail-text',
      detailTextStyles.detailText,
      className,
    )}
  >
    {children}
  </div>
)

export default DetailText
