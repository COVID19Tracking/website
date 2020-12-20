import React from 'react'
import { Link } from 'gatsby'
import chartDataLinkStyle from './chart-data-link.module.scss'

const ChartDataLink = ({ to, children }) => (
  <Link className={chartDataLinkStyle.link} to={to}>
    {children}
  </Link>
)

export default ChartDataLink
