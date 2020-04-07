import React from 'react'
import detailTextStyles from '../../scss/components/common/detail-text.module.scss'

const DetailText = ({ children }) => (
  <div className={`detail-text ${detailTextStyles.detailText}`}>{children}</div>
)

export default DetailText
