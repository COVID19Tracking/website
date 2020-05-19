import React from 'react'
import classnames from 'classnames'
import dividerSectionStyle from './divider-section.module.scss'

export default ({ children, noBorder, noMargin }) => (
  <section
    className={classnames(
      dividerSectionStyle.section,
      noBorder && dividerSectionStyle.noBorder,
      noMargin && dividerSectionStyle.noMargin,
    )}
  >
    {children}
  </section>
)
