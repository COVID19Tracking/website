import React from 'react'
import classnames from 'classnames'
import alertStyle from './alert.module.scss'
import alertIcon from '~images/alert/alert.svg'

const InfoboxInner = ({ header, children }) => (
  <div>
    <p className={alertStyle.header}>{header}</p>
    <div className={alertStyle.content}>{children}</div>
  </div>
)

const Alert = ({ header, children, fullSize = false }) => (
  <div
    className={classnames(
      'alert',
      alertStyle.alert,
      fullSize && alertStyle.fullSize,
    )}
  >
    <img src={alertIcon} alt="Alert icon" />
    <InfoboxInner header={header}>{children}</InfoboxInner>
  </div>
)

export default Alert
