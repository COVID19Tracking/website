import React from 'react'
import classnames from 'classnames'
import { Link } from 'gatsby'
import ctaLinkStyle from './call-to-action.module.scss'

const Arrow = () => (
  <span className={ctaLinkStyle.arrow} aria-hidden>
    {' '}
    →
  </span>
)

const CtaLink = ({
  to,
  children,
  centered = false,
  bold = false,
  className,
}) => (
  <Link
    to={to}
    className={classnames(
      ctaLinkStyle.cta,
      centered && ctaLinkStyle.centered,
      bold && ctaLinkStyle.bold,
      className,
    )}
  >
    {children}
    <Arrow />
  </Link>
)

const CtaAnchorLink = ({
  href,
  children,
  onClick,
  centered = false,
  block = false,
  bold = false,
}) => (
  <a
    href={href}
    className={classnames(
      ctaLinkStyle.cta,
      centered && ctaLinkStyle.centered,
      bold && ctaLinkStyle.bold,
      block && ctaLinkStyle.block,
    )}
    onClick={onClick}
  >
    {children}
    <Arrow />
  </a>
)

export default CtaLink

export { CtaLink, CtaAnchorLink }
