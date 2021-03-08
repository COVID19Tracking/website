import React from 'react'
import classnames from 'classnames'
import socialCardStyle from './social-card.module.scss'
import ChartBar from './chart-bar'

const ChartRow = ({
  group,
  availableMetrics = ['cases', 'deaths'],
  stateStatus,
  worstCasesValue = undefined,
  worstDeathsValue = undefined,
  worstMetrics = undefined,
  square,
}) => {
  const worstAllMetrics = worstMetrics

  if (worstAllMetrics === undefined) {
    worstAllMetrics.cases.value = worstCasesValue
    worstAllMetrics.deaths.value = worstDeathsValue
  }

  const { label, style, showCross } = group

  const BarLabel = ({ barLabel, cross }) => (
    <span className={socialCardStyle.barLabel}>
      {barLabel}
      {cross && '†'}
    </span>
  )

  const InsufficientDataPlaceholder = ({ isDeaths }) => {
    const nullValue = 'No data reported' // the value to show for the empty state
    return (
      <span
        className={classnames(
          socialCardStyle.insufficientData,
          isDeaths && socialCardStyle.insufficientDataDeaths,
        )}
      >
        {nullValue}
      </span>
    )
  }

  return (
    <>
      <BarLabel barLabel={label} cross={showCross} />
      {availableMetrics.map(metric => (
        <>
          {group[metric] === null ? (
            <InsufficientDataPlaceholder />
          ) : (
            <ChartBar
              style={style}
              metric={group[metric]}
              worstMetricValue={worstAllMetrics[metric].value}
              square={square}
              isOneChart={stateStatus.oneChart}
            />
          )}
        </>
      ))}
    </>
  )
}

export default ChartRow
