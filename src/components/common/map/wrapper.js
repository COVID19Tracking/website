import React from 'react'
import classnames from 'classnames'
import wrapperStyle from './wrapper.module.scss'

const Wrapper = ({ children, fullWidth = false }) => (
  <div
    className={classnames(
      wrapperStyle.wrapper,
      fullWidth && wrapperStyle.fullWidth,
    )}
    role="img"
  >
    <div className={wrapperStyle.inset}>{children}</div>
  </div>
)

export default Wrapper
