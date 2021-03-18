import React from 'react'
import classnames from 'classnames'
import barChartStyle from './bar-chart.module.scss'
import ChartBar from './chart-bar'

const ChartRow = ({
  group,
  availableMetrics = ['cases', 'deaths'],
  worstCasesValue = undefined,
  worstDeathsValue = undefined,
  worstMetrics = undefined,
}) => {
  const worstAllMetrics = worstMetrics

  if (worstAllMetrics === undefined) {
    worstAllMetrics.cases.value = worstCasesValue
    worstAllMetrics.deaths.value = worstDeathsValue
  }

  const { label, style, showCross, showAsterisk } = group

  const BarLabel = ({ barLabel, cross }) => (
    <span className={barChartStyle.barLabel}>
      {barLabel}
      {cross && '†'}
    </span>
  )

  const InsufficientDataPlaceholder = ({ isDeaths }) => {
    const nullValue = 'No data reported' // the value to show for the empty state
    return (
      <span
        className={classnames(
          barChartStyle.insufficientData,
          isDeaths && barChartStyle.insufficientDataDeaths,
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
              showAsterisk={showAsterisk}
            />
          )}
        </>
      ))}
    </>
  )
}

export default ChartRow
