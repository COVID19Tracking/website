import React from 'react'
import { Link } from 'gatsby'
import ctaLinkStyle from './cta-link.module.scss'

export default ({ to, children }) => (
  <Link to={to} className={ctaLinkStyle.cta}>
    {children}
  </Link>
)
