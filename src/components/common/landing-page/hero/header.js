import React from 'react'
import heroHeaderStyle from './header.module.scss'

export default ({ children }) => (
  <h2 className={`hero-header ${heroHeaderStyle.header}`}>{children}</h2>
)
