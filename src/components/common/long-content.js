import React from 'react'
import longContentStyles from './long-content.module.scss'

export default ({ children }) => (
  <div className={longContentStyles.content}>{children}</div>
)
