import React from 'react'
import imageCreditStyle from './image-credit.module.scss'

export default ({ children }) => (
  <div className={imageCreditStyle.credit}>{children}</div>
)
