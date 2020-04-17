import React from 'react'
import { Link } from 'gatsby'

const ButtonLink = ({ big, to, children }) => (
  <Link to={to} className={`button${big ? ' button-big' : ''}`}>
    {children}
  </Link>
)

const ButtonAnchor = ({ big, href, children }) => (
  <a href={href} className={`button${big ? ' button-big' : ''}`}>
    {children}
  </a>
)

const Button = ({ big, children, type = 'button' }) => {
  if (type === 'submit') {
    return (
      <button className={`button${big ? ' button-big' : ''}`} type="submit">
        {children}
      </button>
    )
  }
  return (
    <button className={`button${big ? ' button-big' : ''}`} type="button">
      {children}
    </button>
  )
}

export { ButtonAnchor, ButtonLink, Button }
