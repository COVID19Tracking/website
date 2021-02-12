import React from 'react'
import countyChartLegendStyle from './county-chart-legend.module.scss'

const legendData = {
  'Black or African American alone': {
    style: countyChartLegendStyle.blackAfricanAmericanAlone,
    // the label value maps the 'category alone' value to 'category', to align
    // with the OMB standard.
    label: 'Black or African American',
  },
  'White alone': {
    style: countyChartLegendStyle.whiteAlone,
    label: 'White',
  },
  'Hispanic or Latino': {
    style: countyChartLegendStyle.hispanicLatino,
    label: 'Hispanic or Latino',
  },
  'Asian alone': {
    style: countyChartLegendStyle.asianAlone,
    label: 'Asian',
  },
  'Two or more races': {
    style: countyChartLegendStyle.twoOrMore,
    label: 'Two or more races',
  },
  'American Indian and Alaskan Native alone': {
    style: countyChartLegendStyle.aianAlone,
    label: 'American Indian or Alaskan Native',
  },
  'Native Hawaiian and Other Pacific Islander alone': {
    style: countyChartLegendStyle.nhpiAlone,
    label: 'Native Hawaiian or Other Pacific Islander',
  },
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
              className={`${countyChartLegendStyle.swatch} ${legendData[legend].style}`}
            />
            {legendData[legend].label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CountyChartLegend
