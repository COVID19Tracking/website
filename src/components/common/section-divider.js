import React from 'react'
import classnames from 'classnames'
import sectionDividerStyle from './section-divider.module.scss'

export default ({ className }) => (
  <hr className={classnames(sectionDividerStyle.divider, className)} />
)
