import React from 'react'
import countyChartLegendStyle from './county-chart-legend.module.scss'

const legendStyles = {
  'Black or African American alone':
    countyChartLegendStyle.blackAfricanAmericanAlone,
  'White alone': countyChartLegendStyle.whiteAlone,
  'Hispanic or Latino': countyChartLegendStyle.hispanicLatino,
  'Asian alone': countyChartLegendStyle.asianAlone,
  'Two or more races': countyChartLegendStyle.twoOrMore,
  'American Indian and Alaskan Native alone': countyChartLegendStyle.aianAlone,
  'Native Hawaiian and Other Pacific Islander alone':
    countyChartLegendStyle.nhpiAlone,
}

const CountyChartLegend = ({ data }) => {
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
    <div className={countyChartLegendStyle.legend} aria-hidden>
      <h4>Largest racial or ethnic group</h4>
      <ul>
        {legends.map(legend => (
          <li key={`legend-${legend}`}>
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

export default CountyChartLegend
