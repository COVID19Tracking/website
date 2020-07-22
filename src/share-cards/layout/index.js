import React from 'react'
import { ReactComponent as CtpLogo } from '~images/project-logo.svg'
import layoutStyles from './layout.module.scss'

export default ({ children }) => (
  <div className={layoutStyles.layout}>
    {children}
    <CtpLogo className={layoutStyles.logo} />
  </div>
)
