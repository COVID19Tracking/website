import React from 'react'
import classnames from 'classnames'
import imageCreditStyle from '~components/common/image-credit.module.scss'

export default ({ children, white }) => (
  <div
    className={classnames(
      imageCreditStyle.credit,
      white && imageCreditStyle.white,
    )}
  >
    {children}
  </div>
)
