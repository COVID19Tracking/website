import React from 'react'
import { Link } from 'gatsby'
import { FormatNumber } from '~components/utils/format'
import statisticStyles from './statistic.module.scss'

const Statistic = ({ title, value, suffix, children }) => (
  <div className={statisticStyles.statistic}>
    <div className={statisticStyles.title}>{title}</div>
    <div className={statisticStyles.value}>
      <FormatNumber number={value} />
      {suffix}
    </div>
    <div className={statisticStyles.info}>{children}</div>
  </div>
)

const StatisticLink = ({ to, children }) => (
  <Link to={to} className={statisticStyles.link}>
    {children}
  </Link>
)

const StatisticGroup = ({ children }) => (
  <div className={statisticStyles.group}>{children}</div>
)

export { Statistic, StatisticGroup, StatisticLink }
