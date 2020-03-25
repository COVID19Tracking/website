import React from 'react'
import '../../scss/components/common/detail-text.scss'

const DetailText = ({ children, isBlock }) => (
  <span className={isBlock ? 'detail-text detail-text-block' : 'detail-text'}>
    {children}
  </span>
)

export default DetailText
