import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import { FormatNumber } from '~components/utils/format'
import statisticStyles from './statistic.module.scss'

const Statistic = ({ title, value, suffix, children, subelement }) => (
  <div
    className={classnames(
      statisticStyles.statisticWrapper,
      subelement && statisticStyles.subelement,
    )}
  >
    <div className={statisticStyles.statistic}>
      <div className={statisticStyles.title}>{title}</div>
      <div className={statisticStyles.value}>
        <FormatNumber number={value} />
        {suffix}
      </div>
      {children && (
        <div className={statisticStyles.info}>{children && children}</div>
      )}
    </div>
  </div>
)

const StatisticLink = ({ to, children }) => (
  <Link to={to} className={statisticStyles.link}>
    {children}
  </Link>
)

const DefinitionLink = ({ onDefinitionsToggle }) => {
  return (
    <button
      className={statisticStyles.link}
      onClick={onDefinitionsToggle}
      type="button"
    >
      Definition
    </button>
  )
}

const StatisticGroup = ({ children }) => (
  <div className={statisticStyles.group}>{children}</div>
)

const DrillDown = ({ label, value, suffix, calculated = false }) => (
  <div className={statisticStyles.drillDown}>
    <span className={statisticStyles.label}>
      {calculated && 'Calculated: '} {label}
    </span>
    <span className={statisticStyles.value}>
      <FormatNumber number={value} />
      {suffix}
    </span>
  </div>
)

export { DrillDown, Statistic, StatisticGroup, StatisticLink, DefinitionLink }
