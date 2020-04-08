import React from 'react'
import leadParagraphStyles from './lead-paragraph.module.scss'

export default ({ children }) => (
  <p className={`lead-paragraph ${leadParagraphStyles.leadParagraph}`}>
    {children}
  </p>
)
