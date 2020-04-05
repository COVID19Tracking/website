import React from 'react'
import '../../scss/components/common/container.scss'

export default ({ children, narrow }) => (
  <div className={`container${narrow ? ' container-narrow' : ''}`}>
    {children}
  </div>
)
