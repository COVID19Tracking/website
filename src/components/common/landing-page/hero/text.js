import React from 'react'
import textStyles from '~components/common/landing-page/hero/text.module.scss'

export default ({ children }) => (
  <p className={`hero-text ${textStyles.text}`}>{children}</p>
)
