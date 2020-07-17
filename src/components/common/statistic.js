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
  onDefinitionsToggle,
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
          {definitionLink && (
            <DefinitionLink
              to={definitionLink}
              onDefinitionsToggle={onDefinitionsToggle}
            />
          )}
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

const DefinitionLink = ({ to, onDefinitionsToggle }) => {
  const id = to
  const definitionsToggle = definitionId => {
    onDefinitionsToggle(definitionId || 'definition-id') // todo replace in prod with just definitionId
  }
  return (
    <button
      className={statisticStyles.link}
      onClick={() => definitionsToggle(id)}
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
      {label} {calculated && '*'}
    </span>
    <span className={statisticStyles.value}>
      <FormatNumber number={value} />
      {suffix}
    </span>
  </div>
)

export { DrillDown, Statistic, StatisticGroup, StatisticLink, DefinitionLink }
