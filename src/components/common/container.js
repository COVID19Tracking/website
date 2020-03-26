import React from 'react'
import '../../scss/components/common/container.scss'

export default ({ children, narrow }) => (
  <div className={narrow ? 'container container-narrow' : 'container'}>
    {children}
  </div>
)
