import React from 'react'
import classnames from 'classnames'
import socialCardStyle from './social-card.module.scss'
import ChartBar from './chart-bar'

const ChartRow = ({
  group,
  stateStatus,
  worstCasesValue,
  worstDeathsValue,
  square,
}) => {
  const { label, style, cases, deaths, showAsterisk, showCross } = group

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
      {!stateStatus.deathsOnly && (
        <>
          {cases === null ? (
            <InsufficientDataPlaceholder />
          ) : (
            <ChartBar
              style={style}
              metric={cases}
              worstMetricValue={worstCasesValue}
              square={square}
              isOneChart={stateStatus.oneChart}
            />
          )}
        </>
      )}
      {!stateStatus.casesOnly && (
        <>
          {deaths === null ? (
            <InsufficientDataPlaceholder isDeaths />
          ) : (
            <ChartBar
              style={style}
              metric={deaths}
              worstMetricValue={worstDeathsValue}
              square={square}
              showAsterisk={showAsterisk}
              isOneChart={stateStatus.oneChart}
              isDeaths
            />
          )}
        </>
      )}
    </>
  )
}

export default ChartRow
