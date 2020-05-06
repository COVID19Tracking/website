import React from 'react'
import { Link } from 'gatsby'
import ctaLinkStyle from './cta-link.module.scss'

export default ({ to, children, centered = false }) => (
  <Link
    to={to}
    className={`${ctaLinkStyle.cta} ${centered ? ctaLinkStyle.centered : ''}`}
  >
    {children}
    <span className={ctaLinkStyle.arrow} aria-hidden>
      {' '}
      →
    </span>
  </Link>
)
