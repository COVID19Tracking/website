import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import { FormatNumber } from '~components/utils/format'
import statisticStyles from './statistic.module.scss'

const Statistic = ({
  title,
  value,
  suffix,
  children,
  subelement,
  definitionLink,
  hasCalculatedDrillDowns,
}) => (
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
      {(definitionLink || children) && (
        <div className={statisticStyles.info}>
          {definitionLink && <DefinitionLink to={definitionLink} />}
          {children && children}
        </div>
      )}
      {hasCalculatedDrillDowns && (
        <div className={statisticStyles.calculatedLabel}>
          <span>* Calculated values</span>
        </div>
      )}
    </div>
  </div>
)

const StatisticLink = ({ to, children }) => (
  <Link to={to} className={statisticStyles.link}>
    {children}
  </Link>
)

const DefinitionLink = ({ to }) => (
  <StatisticLink to={to}>Definition</StatisticLink>
)

const StatisticGroup = ({ children }) => (
  <div className={statisticStyles.group}>{children}</div>
)

const DrillDown = ({ label, value, suffix, calculated = false }) => (
  <div className={statisticStyles.drillDown}>
    <span className={statisticStyles.label}>
      {label} {calculated && '*'}
    </span>
    <span className={statisticStyles.value}>
      <FormatNumber number={value} />
      {suffix}
    </span>
  </div>
)

export { DrillDown, Statistic, StatisticGroup, StatisticLink, DefinitionLink }
