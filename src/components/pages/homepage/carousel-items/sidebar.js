import React from 'react'
import { FormatNumber } from '~components/utils/format'
import sidebarStyle from './sidebar.module.scss'

const Number = ({ number, label }) => (
  <div className={sidebarStyle.number}>
    <h3 className="a11y-only">{label}</h3>
    <FormatNumber number={number} />
    <p aria-hidden className={sidebarStyle.label}>
      {label}
    </p>
  </div>
)

const Header = ({ children }) => (
  <h2 className={sidebarStyle.header}>{children}</h2>
)

export default Number

export { Number, Header }
