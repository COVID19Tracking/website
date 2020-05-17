import React from 'react'
import { Link } from 'gatsby'
import ctaLinkStyle from './call-to-action.module.scss'

const CtaLink = ({ to, children, centered = false, bold = false }) => (
  <Link
    to={to}
    className={`${ctaLinkStyle.cta} ${centered ? ctaLinkStyle.centered : ''} ${
      bold ? ctaLinkStyle.bold : ''
    }`}
  >
    {children}
    <span className={ctaLinkStyle.arrow} aria-hidden>
      {' '}
      →
    </span>
  </Link>
)

export default CtaLink

export { CtaLink }
