import { max, sum } from 'd3-array'
import { timeParse } from 'd3-time-format'
import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import cloneDeep from 'lodash/cloneDeep'

import BarChart from './charts/_BarChart'
import { formatNumber, parseDate } from './_utils'

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

  const initialCdcData = useMemo(
    () =>
      query.allCdcDaily.nodes.map(node => {
        const date = parseCdcDate(`${node.dateCollected}/2020`)
        return {
          date,
          value: +node.dailyTotal,
        }
      }),
    [query],
  )

  const initialCovidData = useMemo(
    () =>
      query.allCovidUsDaily.nodes
        .map(node => ({
          date: parseDate(node.date),
          value: node.totalTestResultsIncrease,
        }))
        .reduce((acc, val) => acc.concat(val), []),
    [query],
  )

  // normalize the data so that the two arrays share the same number of items,
  // with the same dates, making the two charts comparable.
  const cdcData = useMemo(
    () => normalizeData(initialCdcData, initialCovidData),
    [initialCdcData, initialCovidData],
  )
  const covidData = useMemo(
    () => normalizeData(initialCovidData, initialCdcData),
    [initialCdcData, initialCovidData],
  )

  const cdcCumulativeTotal = useMemo(() => sum(cdcData, d => d.value), [
    cdcData,
  ])
  const cumulativeTotal = useMemo(() => sum(covidData, d => d.value), [
    covidData,
  ])
  const dailyMax = useMemo(() => max(covidData, d => d.value), [covidData])

  return (
    <section>
      <div>
        <h4>Differences between this data and the CDC data</h4>
        <p>
          As of today, the C.D.C. has tested {formatNumber(cdcCumulativeTotal)}{' '}
          specimens, and we have tracked at least{' '}
          {formatNumber(cumulativeTotal)} tests administered across the country.
          It is important to note that testing numbers are likely an undercount
          because of the lack of universal testing and state reporting, and that
          multiple specimen tests can be conducted from a single person’s
          sample.
        </p>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, width: '50%' }}>
          <BarChart
            data={cdcData}
            fill="#585BC1"
            height={400}
            marginBottom={40}
            marginLeft={80}
            marginRight={10}
            marginTop={10}
            xTicks={2}
            width={400}
            yMax={dailyMax}
          />
        </div>
        <div style={{ flexGrow: 1, width: '50%' }}>
          <BarChart
            data={covidData}
            fill="#585BC1"
            height={400}
            marginBottom={40}
            marginLeft={80}
            marginRight={10}
            marginTop={10}
            xTicks={2}
            width={400}
          />
        </div>
      </div>
    </section>
  )
}
