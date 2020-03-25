import React from 'react'
import { Link } from 'gatsby'

const ButtonLink = ({ big, to, children }) => (
  <Link to={to} className={big ? 'button button-big' : 'button'}>
    {children}
  </Link>
)

const ButtonAnchor = ({ big, href, children }) => (
  <a href={href} className={big ? 'button button-big' : 'button'}>
    {children}
  </a>
)

const Button = ({ big, children }) => (
  <button type="button" className={big ? 'button button-big' : 'button'}>
    {children}
  </button>
)

export { ButtonAnchor, ButtonLink, Button }
