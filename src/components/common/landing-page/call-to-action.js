import React from 'react'
import { Link } from 'gatsby'
import ctaLinkStyle from './call-to-action.module.scss'

const Arrow = () => (
  <span className={ctaLinkStyle.arrow} aria-hidden>
    {' '}
    →
  </span>
)

const CtaLink = ({ to, children, centered = false, bold = false }) => (
  <Link
    to={to}
    className={`${ctaLinkStyle.cta} ${centered ? ctaLinkStyle.centered : ''} ${
      bold ? ctaLinkStyle.bold : ''
    }`}
  >
    {children}
    <Arrow />
  </Link>
)

const CtaAnchorLink = ({ href, children, centered = false, bold = false }) => (
  <a
    href={href}
    className={`${ctaLinkStyle.cta} ${centered ? ctaLinkStyle.centered : ''} ${
      bold ? ctaLinkStyle.bold : ''
    }`}
  >
    {children}
    <Arrow />
  </a>
)

export default CtaLink

export { CtaLink, CtaAnchorLink }
