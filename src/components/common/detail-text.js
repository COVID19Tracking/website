import React from 'react'
import detailTextStyles from './detail-text.module.scss'

const DetailText = ({ children }) => (
  <div className={`detail-text ${detailTextStyles.detailText}`}>{children}</div>
)

export default DetailText
