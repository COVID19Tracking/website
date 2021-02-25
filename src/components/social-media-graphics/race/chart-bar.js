import React from 'react'
import classnames from 'classnames'
import { FormatNumber } from '~components/utils/format'
import { getBarWidth } from './utils'
import socialCardStyle from './social-card.module.scss'

const ChartBar = ({
  style,
  metric,
  worstMetricValue,
  square,
  isOneChart,
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
    <div className={socialCardStyle.barContainer}>
      {isDeaths && <div className={socialCardStyle.deathBarSpacer} />}
      <div
        className={classnames(
          socialCardStyle.bar,
          style,
          widthPercentage !== 0 && socialCardStyle.hasInnerLabel,
        )}
        style={{
          width: `${getBarWidth(
            metric,
            worstMetricValue,
            square,
            isOneChart,
          )}px`,
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
