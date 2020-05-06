import React from 'react'
import imageCreditStyle from './image-credit.module.scss'

export default ({ children }) => (
  <cite className={imageCreditStyle.credit}>{children}</cite>
)
