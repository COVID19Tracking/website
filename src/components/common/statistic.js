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
      <div
        className={classnames(
          statisticStyles.value,
          value === null && statisticStyles.nullValue,
        )}
      >
        <FormatNumber number={value} nullValue="not reported" />
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

const DefinitionLink = ({ onDefinitionsToggle, label }) => {
  return (
    <button
      className={statisticStyles.link}
      onClick={onDefinitionsToggle}
      type="button"
      aria-label={`Definition of ${label}`}
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
      {label} {calculated && '(calculated)'}
    </span>
    <span className={statisticStyles.value}>
      <FormatNumber number={value} nullValue="not reported" />
      {suffix}
    </span>
  </div>
)

export { DrillDown, Statistic, StatisticGroup, StatisticLink, DefinitionLink }
