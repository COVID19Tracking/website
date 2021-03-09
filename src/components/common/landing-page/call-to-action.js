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

const NewWindow = () => (
  <>
    <span className="a11y-only">(Opens a new window)</span>
    <span
      className={classnames(ctaLinkStyle.newWindow, ctaLinkStyle.arrow)}
      aria-hidden
    >
      {' '}
    </span>
  </>
)

const CtaLink = ({
  to,
  children,
  centered = false,
  extraMargin = false,
  bold = false,
  className,
}) => (
  <Link
    to={to}
    className={classnames(
      ctaLinkStyle.cta,
      centered && ctaLinkStyle.centered,
      bold && ctaLinkStyle.bold,
      extraMargin && ctaLinkStyle.extraMargin,
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
  newWindow = false,
}) => (
  <a
    href={href}
    className={classnames(
      ctaLinkStyle.cta,
      centered && ctaLinkStyle.centered,
      bold && ctaLinkStyle.bold,
      block && ctaLinkStyle.block,
    )}
    target={newWindow && '_blank'}
    rel="noreferrer"
    onClick={onClick}
  >
    {children}
    {newWindow ? <NewWindow /> : <Arrow />}
  </a>
)

export default CtaLink

export { CtaLink, CtaAnchorLink }
