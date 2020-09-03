import React from 'react'
import classnames from 'classnames'
import paragraphStyle from './paragraph.module.scss'

const CrdtParagraph = ({ children, className }) => (
  <p className={classnames(paragraphStyle.paragraph, className && className)}>
    {children}
  </p>
)

export default CrdtParagraph
