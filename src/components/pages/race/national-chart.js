import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import nationalChartStyle from './national-chart.module.scss'
import { FormatNumber } from '~components/utils/format'

export default () => {
  const { covidRaceDataHomepage } = useStaticQuery(graphql`
    {
      covidRaceDataHomepage {
        whiteMortalityRate
        twoMortalityRate
        otherMortalityRate
        nhpiMortalityRate
        latinXMortalityRate
        blackMortalityRate
        aianMortalityRate
      }
    }
  `)

  const maxRate = Math.max(
    ...Object.entries(covidRaceDataHomepage).map(e => parseFloat(e[1])),
  )
  const mortalityRateData = Object.entries(covidRaceDataHomepage)
    .map(e => [
      e[0].substring(0, e[0].length - 13), // strips "MortalityRate" from labels
      (parseFloat(e[1]) / maxRate) * 100, // converts values to percentiles
    ])
    .sort((a, b) => b[1] - a[1])

  const perXPeople = 100000
  const [isCollapsed, toggleIsCollapsed] = useState(true)
  return (
    <div>
      <h4 className={nationalChartStyle.header}>
        Deaths per <FormatNumber number={perXPeople} /> people by race or
        ethnicity
      </h4>
      <div className={nationalChartStyle.charts}>
        {mortalityRateData.map(race => (
          <div width={`${race[1]}%`} />
        ))}
      </div>
      <div>
        <Disclosure
          open={isCollapsed}
          onChange={() => toggleIsCollapsed(!isCollapsed)}
        >
          <DisclosureButton className={nationalChartStyle.showNotes}>
            {isCollapsed ? (
              <>
                Notes <span aria-hidden>↑</span>
              </>
            ) : (
              <>
                Notes <span aria-hidden>↓</span>
              </>
            )}
          </DisclosureButton>
          <DisclosurePanel className={nationalChartStyle.notes}>
            These calculations are based on data from The Covid Racial Data
            Tracker and the U.S. Census Bureau. Race categories may overlap with
            Hispanic/Latinx ethnicity. Rates are not age-adjusted and some rates
            are underestimated due to lack of reporting of race and ethnicity
            categories for COVID-19 deaths.
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  )
}
