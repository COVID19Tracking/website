import React from 'react'
import featureStyle from './feature.module.scss'

export default ({ element, title, children, flip = false }) => (
  <div className={`${featureStyle.feature} ${flip ? featureStyle.flip : ''}`}>
    <div className={featureStyle.element}>{element}</div>
    <div className={featureStyle.info}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  </div>
)
