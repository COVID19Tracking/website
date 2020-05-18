import React from 'react'
import countyChartLegendStyle from './county-chart-legend-style.module.scss'

const legendStyles = {
  'Black or African American alone':
    countyChartLegendStyle.blackAfricanAmericanAlone,
  'White alone': countyChartLegendStyle.whiteAlone,
  'Hispanic or Latino': countyChartLegendStyle.hispanicLatino,
}

export default ({ data }) => {
  const legends = []
  if (!data) {
    return null
  }
  data.forEach(item => {
    if (legends.indexOf(item.demographics.largestRace1) === -1) {
      legends.push(item.demographics.largestRace1)
    }
  })
  return (
    <div className={countyChartLegendStyle.legend}>
      <ul aria-hidden>
        {legends.map(legend => (
          <li>
            <span
              className={`${countyChartLegendStyle.swatch} ${legendStyles[legend]}`}
            />
            {legend}
          </li>
        ))}
      </ul>
    </div>
  )
}
