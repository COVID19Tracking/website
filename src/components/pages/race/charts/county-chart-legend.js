import React from 'react'
import countyChartLegendStyle from './county-chart-legend-style.module.scss'

export default () => (
  <ul className={countyChartLegendStyle.legend} aria-hidden>
    <li>
      <span
        className={`${countyChartLegendStyle.swatch} ${countyChartLegendStyle.blackAfricanAmericanAlone}`}
      />
      Black or African American alone
    </li>
    <li>
      <span
        className={`${countyChartLegendStyle.swatch} ${countyChartLegendStyle.whiteAlone}`}
      />
      White alone alone
    </li>
    <li>
      <span
        className={`${countyChartLegendStyle.swatch} ${countyChartLegendStyle.hispanicLatino}`}
      />
      Hispanic or Latino
    </li>
  </ul>
)
