import React from 'react'
import classnames from 'classnames'
import { FormatNumber } from '~components/utils/format'
import barChartStyle from './bar-chart.module.scss'

const ChartBar = ({
  style,
  metric,
  worstMetricValue,
  showAsterisk = false,
  isDeaths,
}) => {
  // gets the width of the bar for the bar charts
  const widthPercentage = (metric / worstMetricValue) * 100

  const BarContent = ({ value, asterisk = false }) => (
    <span>
      <FormatNumber number={value} />
      {asterisk && '*'}
    </span>
  )

  return (
    <div className={barChartStyle.barContainer}>
      {isDeaths && <div className={barChartStyle.deathBarSpacer} />}
      <div
        className={classnames(
          barChartStyle.bar,
          style,
          widthPercentage !== 0 && barChartStyle.hasInnerLabel,
        )}
        style={{
          width: `${widthPercentage}%`,
        }}
      >
        {widthPercentage > 50 && (
          <BarContent value={metric} asterisk={showAsterisk} />
        )}
      </div>
      {widthPercentage <= 50 && (
        <BarContent value={metric} asterisk={showAsterisk} />
      )}
    </div>
  )
}

export default ChartBar
