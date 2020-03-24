import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const ButtonLink = ({ big, to, children }) => (
  <Link to={to} className={big ? 'button button-big' : 'button'}>
    {children}
  </Link>
)

ButtonLink.propTypes = {
  big: PropTypes.bool,
  to: PropTypes.string,
}

const ButtonAnchor = ({ big, href, children }) => (
  <a href={href} className={big ? 'button button-big' : 'button'}>
    {children}
  </a>
)

ButtonAnchor.propTypes = {
  big: PropTypes.bool,
  href: PropTypes.string,
}

const Button = ({ big, children }) => (
  <button className={big ? 'button button-big' : 'button'}>{children}</button>
)

Button.propTypes = {
  big: PropTypes.bool,
}

export { ButtonAnchor, ButtonLink, Button }
