import React from 'react'
import { Link } from 'gatsby'
import exploreLinkStyle from './explore-link.module.scss'

export default ({ to, text }) => (
  <div className={exploreLinkStyle.exploreLink}>
    <Link to={to}>
      {text} <abbr>→</abbr>
    </Link>
  </div>
)
