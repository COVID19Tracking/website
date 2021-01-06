import React from 'react'
import wrapperStyle from './wrapper.module.scss'

const Wrapper = ({ children }) => (
  <div className={wrapperStyle.wrapper} role="img">
    <div className={wrapperStyle.inset}>{children}</div>
  </div>
)

export default Wrapper
