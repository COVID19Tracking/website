import React, { useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import nationalChartStyle from './national-chart.module.scss'
import HorizontalBarChart from '~components/charts/horizontal-bar-chart'
import { totalColor, lightColor } from '~utilities/visualization'
import { FormatNumber } from '~components/utils/format'

export default () => {
  const {
    blackMortalityRate,
    aianMortalityRate,
    nhpiMortalityRate,
    twoMortalityRate,
    whiteMortalityRate,
    otherMortalityRate,
    latinXMortalityRate,
  } = {
    // hardcoded for now
    blackLivesLost: 26425,
    blackPercentOfPopulation: 0.1267,
    blackPercentOfDeath: 0.2332735988,
    blackLivesExpectedMultiplier: 1.841149162,
    statesReportingCases: 49,
    statesReportingDeaths: 48,
    blackMortalityRate: 64,
    aianMortalityRate: 30,
    nhpiMortalityRate: 20,
    twoMortalityRate: 2,
    whiteMortalityRate: 25,
    otherMortalityRate: 24,
    latinXMortalityRate: 29,
    blackwhiteRateRatio: 2.5,
  }
  const data = [
    {
      name: 'Black',
      value: blackMortalityRate,
      highlight: true,
    },
    {
      name: 'Hispanic or Latinx',
      value: latinXMortalityRate,
      highlight: false,
    },
    {
      name: 'American Indian/Alaska Native',
      value: aianMortalityRate,
      highlight: false,
    },
    {
      name: 'Asian',
      value: 27, // Missing?
      highlight: false,
    },
    {
      name: 'White',
      value: whiteMortalityRate,
      highlight: true,
    },
    {
      name: 'Other',
      value: otherMortalityRate,
      highlight: false,
    },
    {
      name: 'Native Hawaiian/ Other Pacific Islander',
      value: nhpiMortalityRate,
      highlight: false,
    },
    {
      name: 'Two or more races',
      value: twoMortalityRate,
    },
  ]
  const perXPeople = 100000
  const [isCollapsed, toggleIsCollapsed] = useState(true)
  return (
    <div className={nationalChartStyle.wrapper}>
      <h4 className={nationalChartStyle.header}>
        Deaths per <FormatNumber number={perXPeople} /> people by race or
        ethnicity
      </h4>
      <div className={nationalChartStyle.charts}>
        <HorizontalBarChart
          data={data}
          fill={lightColor}
          highlight={totalColor}
          height={400}
          marginBottom={40}
          marginLeft={136}
          marginRight={40}
          marginTop={20}
          xTicks={4}
          yTicks={data.length}
          width={400}
        />
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
