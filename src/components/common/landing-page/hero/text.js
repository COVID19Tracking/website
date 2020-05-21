import React from 'react'
import textStyles from './text.module.scss'

export default ({ children }) => (
  <p className={`hero-text ${textStyles.text}`}>{children}</p>
)
