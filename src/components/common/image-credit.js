import React from 'react'
import imageCreditStyle from './image-credit.module.scss'

export default ({ children }) => (
  <p className={imageCreditStyle.credit}>{children}</p>
)
