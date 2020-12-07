import React from 'react'
import wrapperStyle from './wrapper.module.scss'

const HomepageWrapper = ({ children }) => (
  <div className={wrapperStyle.wrapper}>{children}</div>
)

export default HomepageWrapper
