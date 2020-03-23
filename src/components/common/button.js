import React from 'react'

const ButtonAnchor = ({ big, href, children }) => (
  <a href={href} className="button">
    {children}
  </a>
)

const Button = ({ big, children }) => (
  <button className="button">{children}</button>
)

export { ButtonAnchor, Button }
