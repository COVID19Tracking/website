import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import classnames from 'classnames'
import RacialDataParagraph from '~components/pages/race/paragraph'
import { FormatNumber } from '~components/utils/format'

import nationalChartStyle from './national-chart.module.scss'

export default () => {
  const { covidRaceDataHomepage } = useStaticQuery(graphql`
    {
      covidRaceDataHomepage {
        aianMortalityRate
        asianMortalityRate
        blackMortalityRate
        latinXMortalityRate
        nhpiMortalityRate
        otherMortalityRate
        twoMortalityRate
        whiteMortalityRate
        blackLivesLost
        blackPercentOfDeath
      }
    }
  `)

  const raceApiContent = Object.entries(covidRaceDataHomepage).filter(
    e => e[0] !== 'blackLivesLost' && e[0] !== 'blackPercentOfDeath',
  )

  // get the maximum deaths per 100,000 value
  const maxRate = Math.max(...raceApiContent.map(e => parseFloat(e[1])))

  const mortalityRateData = raceApiContent
    .map(e => ({
      mortalityRate: parseFloat(e[1]),
      width: (parseFloat(e[1]) / maxRate) * 75, // converts values to percentiles*
      label: e[0].substring(0, e[0].length - 13), // strips "MortalityRate" from labels
    }))
    .sort((a, b) => b.width - a.width)
  // * the 75% value is the maximum width that a bar can be.
  // Labels, etc. represent the rest of the width

  const perXPeople = 100000

  const endpointToLabel = {
    white: { label: 'White', emphasis: true },
    two: { label: 'Two or more races', emphasis: false },
    other: { label: 'Other', emphasis: false },
    nhpi: { label: 'Native Hawaiian and Pacific Islander', emphasis: false },
    latinX: { label: 'Hispanic or Latino', emphasis: false },
    black: { label: 'Black or African American', emphasis: true },
    aian: { label: 'American Indian or Alaska Native', emphasis: false },
    asian: { label: 'Asian', emphasis: false },
  }

  const [isCollapsed, toggleIsCollapsed] = useState(false)
  return (
    <div>
      <div className={nationalChartStyle.charts}>
        <div className={nationalChartStyle.header}>
          <div className={nationalChartStyle.headerSpacer} />
          <span>
            Deaths per <FormatNumber number={perXPeople} /> people by race or
            ethnicity
          </span>
        </div>
        {mortalityRateData.map(race => (
          <div
            className={classnames(
              nationalChartStyle.raceRow,
              endpointToLabel[race.label].emphasis &&
                nationalChartStyle.emphasis,
            )}
            key={race.label}
          >
            <div>
              <span className={nationalChartStyle.rowLabel}>
                {endpointToLabel[race.label].label}
              </span>
            </div>
            <div
              style={{ flexBasis: `${race.width}%` }}
              className={nationalChartStyle.bar}
            />
            <span className="a11y-only">
              {endpointToLabel[race.label].label} people have experienced
            </span>
            <span className={nationalChartStyle.mortalityRateLabel}>
              {race.mortalityRate.toFixed(0)}
            </span>
            <span className="a11y-only">
              deaths per <FormatNumber number={perXPeople} />.
            </span>
          </div>
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
      <RacialDataParagraph className={nationalChartStyle.paragraph}>
        We’ve lost at least {covidRaceDataHomepage.blackLivesLost} Black lives
        to COVID-19 to date. Black people account for{' '}
        {parseFloat(covidRaceDataHomepage.blackPercentOfDeath).toFixed(2) * 100}
        % of COVID-19 deaths where race is known.
      </RacialDataParagraph>
    </div>
  )
}
