import React from 'react'
import paragraphStyle from './paragraph.module.scss'

export default ({ children }) => (
  <p className={paragraphStyle.paragraph}>{children}</p>
)
