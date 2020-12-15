import React from 'react'
import { Link } from 'gatsby'
import { FormatNumber } from '~components/utils/format'
import sidebarStyle from './sidebar.module.scss'

const Number = ({ number, label }) => (
  <div className={sidebarStyle.number}>
    <h3 className="a11y-only">{label}</h3>
    <FormatNumber number={number} />
    <p aria-hidden className={sidebarStyle.label}>
      {label}
    </p>
  </div>
)

const Header = ({ children }) => (
  <h2 className={sidebarStyle.header}>{children}</h2>
)

const RelatedPost = ({ date, title, slug }) => (
  <div className={sidebarStyle.relatedPost}>
    <p className={sidebarStyle.date}>{date}</p>
    <Link to={`/blog/${slug}`} className={sidebarStyle.title}>
      <p>{title}</p>
    </Link>
    <Link to={`/blog/${slug}`} className={sidebarStyle.link}>
      Read the article →
    </Link>
  </div>
)

const RelatedFlex = ({ children }) => (
  <div className={sidebarStyle.relatedFlex}>{children}</div>
)

export default Number

export { Number, Header, RelatedPost, RelatedFlex }
