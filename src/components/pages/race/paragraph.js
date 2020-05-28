import React from 'react'
import paragraphStyle from '~components/pages/race/paragraph.module.scss'

export default ({ children }) => (
  <p className={paragraphStyle.paragraph}>{children}</p>
)
