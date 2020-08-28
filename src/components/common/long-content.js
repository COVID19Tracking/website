import React from 'react'
import longContentStyles from './long-content.module.scss'

const LongContent = ({ children }) => (
  <div className={longContentStyles.content}>{children}</div>
)

export default LongContent
