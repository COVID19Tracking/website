import React from 'react'
import leadParagraphStyles from '../../scss/components/common/lead-paragraph.module.scss'

export default ({ children }) => (
  <p className={`lead-paragraph ${leadParagraphStyles.leadParagraph}`}>
    {children}
  </p>
)
