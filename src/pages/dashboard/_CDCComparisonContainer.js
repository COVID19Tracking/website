import { max, sum } from 'd3-array'
import { format } from 'd3-format'
import { timeParse } from 'd3-time-format'
import React, { useEffect, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import cloneDeep from 'lodash/cloneDeep'
import BarChart from '../../components/charts/bar-chart'
import { parseDate, totalColor } from '../../utilities/visualization'

import dashboardStyles from './dashboard.module.scss'

const parseCdcDate = timeParse('%m/%d/%Y')

const sortChronologically = (a, b) => {
  if (a.date > b.date) return 1
  if (a.date < b.date) return -1
  return 0
}

const isSameDay = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

// Adds any missing date items from source array to the target array, with
// null values. Returns new, normalized array.
const normalizeData = (target, source) => {
  const targetClone = cloneDeep(target)

  source.forEach(({ date: sourceDate }) => {
    const exists = targetClone.find(({ date: targetDate }) => {
      return isSameDay(targetDate, sourceDate)
    })

    if (!exists) {
      targetClone.push({
        date: sourceDate,
        value: null,
      })
    }
  })
  targetClone.sort(sortChronologically)
  return targetClone
}

export default function CDCComparisonContainer() {
  const query = useStaticQuery(graphql`
    {
      allCovidUsDaily {
        nodes {
          date
          totalTestResultsIncrease
        }
      }
      allCdcDaily {
        nodes {
          dateCollected
          lag
          cdcLabs
          dailyTotal
        }
      }
    }
  `)

  const initialCdcData = query.allCdcDaily.nodes.map(node => {
    const date = parseCdcDate(`${node.dateCollected}/2020`)
    return {
      date,
      value: +node.dailyTotal,
    }
  })

  const initialCovidData = query.allCovidUsDaily.nodes
    .map(node => ({
      date: parseDate(node.date),
      value: node.totalTestResultsIncrease,
    }))
    .reduce((acc, val) => acc.concat(val), [])

  // normalize the data so that the two arrays share the same number of items,
  // with the same dates, making the two charts comparable.
  const cdcData = normalizeData(initialCdcData, initialCovidData)
  const covidData = normalizeData(initialCovidData, initialCdcData)

  const cumulativeTotal = sum(covidData, d => d.value)

  const dailyMax = max(covidData, d => d.value)

  const [ctpHeading, setCtpHeading] = useState('The Covid Tracking Project')

  useEffect(() => {
    // TODO add window resize listener
    // eslint-disable-next-line no-restricted-globals
    if (screen.width < 500) {
      setCtpHeading('CTP')
    }
  }, [])

  return (
    <section>
      <div>
        <p>
          As of today, the COVID Tracking Project has identified more than{' '}
          {format('.2s')(cumulativeTotal).replace('M', ' million')} tests
          administered across the country, a count significantly higher than the
          numbers the CDC reports. That&rsquo;s because the CDC tallies only
          COVID-19 tests done at certified public health labs, and leaves out
          those conducted by private labs—the vast majority of all tests to
          date.
        </p>
        <p>
          The COVID Tracking Project provides more complete information. We
          collect the best available data from every US state and territory
          about the number of people tested for COVID-19 including both public
          and private labs. We update our dataset multiple times every day based
          on the latest reports.
        </p>
      </div>
      <div
        className={`${dashboardStyles.chartsContainer} ${dashboardStyles.chartsTwoColumn}`}
      >
        <h3 className={dashboardStyles.chartTitle}>
          Daily new tests in the US
        </h3>
        <div
          className={`${dashboardStyles.chartsContainerInner} ${dashboardStyles.chartsContainerInnerLeft}`}
        >
          <h4 className={dashboardStyles.chartSubtitle}>CDC</h4>
          <BarChart
            data={cdcData}
            fill={totalColor}
            height={250}
            marginBottom={40}
            marginLeft={80}
            marginRight={10}
            marginTop={10}
            xTicks={2}
            width={250}
            yMax={dailyMax}
            showTicks={2}
          />
        </div>
        <div className={dashboardStyles.chartsContainerInner}>
          <h4 className={dashboardStyles.chartSubtitle}>{ctpHeading}</h4>
          <BarChart
            data={covidData}
            fill={totalColor}
            height={250}
            marginBottom={40}
            marginLeft={80}
            marginRight={10}
            marginTop={10}
            xTicks={2}
            width={250}
            showTicks={5}
          />
        </div>
        <p className="chart-legend-note">
          <strong>Note:</strong> Numbers undercount the full extent of COVID-19
          because of the lack of widespread testing and lags in state reporting.
        </p>
      </div>
    </section>
  )
}
