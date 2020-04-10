import React from 'react'
import noJsStyles from './javascript-presence.module.scss'

const JsEnabled = ({ children }) => (
  <div className={noJsStyles.jsEnabled}>{children}</div>
)

const JsDisabled = ({ children }) => (
  <div className={noJsStyles.jsDisabled}>{children}</div>
)

export { JsEnabled, JsDisabled }
