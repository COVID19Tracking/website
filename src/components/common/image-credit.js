import React from 'react'
import classnames from 'classnames'
import imageCreditStyle from './image-credit.module.scss'

const ImageCredit = ({ children, white }) => (
  <div
    className={classnames(
      imageCreditStyle.credit,
      white && imageCreditStyle.white,
    )}
  >
    {children}
  </div>
)

export default ImageCredit
