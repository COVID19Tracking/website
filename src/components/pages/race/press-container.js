import React from 'react'
import pressContainerStyles from './press-container.module.scss'

const CrdtPressContainer = ({ children }) => (
  <div className={pressContainerStyles.container}>{children}</div>
)

export default CrdtPressContainer
