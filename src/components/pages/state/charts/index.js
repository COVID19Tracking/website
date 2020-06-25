import React, { useState, useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import BarChart from '~components/charts/bar-chart'
import { parseDate } from '~utilities/visualization'
import { Row, Col } from '~components/common/grid'
import Toggle from '~components/common/toggle'
import colors from '~scss/colors.module.scss'

import styles from './charts.module.scss'

// TODO: optimize if this slows down build (use rolling window)
// Also the US dailyAverage is calculated once per state page right now.
// Hoist or perform in a transformer plugin to cut out repeated work.
const dailyAverage = (history, field, range = 7) => {
  if (!history || !field) return null
  const average = []
  history.forEach((row, rowIndex) => {
    const pastRows = []
    let pastIndex = rowIndex
    while (pastIndex >= 0 && pastIndex > rowIndex - range) {
      pastRows.push(history[pastIndex][field])
      pastIndex -= 1
    }
    average.push({
      date: parseDate(row.date),
      value: pastRows.reduce((a, b) => a + b, 0) / pastRows.length,
    })
  })
  return average
}

// must be of format:
//  {
//   date: Date
//   value: number
// }
const getDataForField = (data, field) => {
  return data.map(d => ({
    date: parseDate(d.date),
    value: d[field],
  }))
}

export default ({ name, history, usHistory }) => {
  const siteData = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          stateChartDateRange
        }
      }
    }
  `)
  const {
    stateChartDateRange,
    stateChartPerCapMeasure,
  } = siteData.site.siteMetadata

  const [usePerCap, setUsePerCap] = useState(false)

  // This enables us to use the getDataForField & dailyAverage functions above
  // without enable triple nested properties
  const hoistPerCapProps = node => {
    const obj = {}
    Object.keys(node.childPopulation).forEach(t => {
      obj[`perCap_${t}`] =
        node.childPopulation[t].percent * stateChartPerCapMeasure
    })
    return { ...node, ...obj }
  }

  const data = [...history]
    .slice(0, stateChartDateRange)
    .sort((a, b) => a.date - b.date)
    .map(hoistPerCapProps)

  // Could be made more efficent by memoizing the sliced, sorted & mapped
  // result and then returning that or null but this doesn't seem necessary
  // for now.
  const usData = useMemo(
    () =>
      usHistory &&
      usePerCap &&
      [...usHistory]
        .slice(0, stateChartDateRange)
        .sort((a, b) => a.date - b.date)
        .map(hoistPerCapProps),

    [usHistory, usePerCap],
  )
  // Below enables the charts to switch between the per cap & not data
  // using the toggle state
  const prepend = useMemo(() => (usePerCap ? 'perCap_' : ''), [usePerCap])
  const testField = useMemo(() => `${prepend}totalTestResultsIncrease`, [
    prepend,
  ])
  const positiveField = useMemo(() => `${prepend}positiveIncrease`, [prepend])
  const hospitalizedField = useMemo(() => `${prepend}hospitalizedIncrease`, [
    prepend,
  ])
  const deathField = useMemo(() => `${prepend}deathIncrease`, [prepend])
  const hasHospitalizationData = history[0].hospitalized !== null

  const props = {
    height: 300,
    width: 300,
    marginBottom: 40,
    marginLeft: 80,
    marginRight: 10,
    marginTop: 10,
    xTicks: 3,
    showTicks: 6,
  }

  // 1 chart per line on small, 2 on medium & 4 on large sreens
  const colWidth = [4, 3, 3]

  return (
    <>
      <div className={styles.infoLine}>
        <div className={styles.toggleContainer}>
          <Toggle
            options={['Totals', 'Per capita']}
            state={usePerCap}
            setState={setUsePerCap}
          />
        </div>
        <LegendComponent name={name || 'National'} />
        {usData && usePerCap && <LegendComponent />}
      </div>
      <Row>
        <Col width={colWidth}>
          <h5>New tests</h5>
          <BarChart
            data={getDataForField(data, testField)}
            lineData={dailyAverage(data, testField)}
            refLineData={dailyAverage(usData, testField)}
            fill={colors.colorPlum300}
            lineColor={colors.colorPlum600}
            {...props}
          />
        </Col>
        <Col width={colWidth}>
          <h5>New cases</h5>
          <BarChart
            data={getDataForField(data, positiveField)}
            lineData={dailyAverage(data, positiveField)}
            refLineData={dailyAverage(usData, positiveField)}
            fill={colors.colorHoney300}
            lineColor={colors.colorHoney600}
            {...props}
          />
        </Col>
        <Col width={colWidth}>
          {hasHospitalizationData && (
            <>
              <h5>New hospitalizations</h5>
              <BarChart
                data={getDataForField(data, hospitalizedField)}
                lineData={dailyAverage(data, hospitalizedField)}
                refLineData={dailyAverage(usData, hospitalizedField)}
                fill={colors.colorHoney300}
                lineColor={colors.colorHoney600}
                {...props}
              />
            </>
          )}
        </Col>
        <Col width={colWidth}>
          <h5>New deaths</h5>
          <BarChart
            data={getDataForField(data, deathField)}
            lineData={dailyAverage(data, deathField)}
            refLineData={dailyAverage(usData, deathField)}
            fill={colors.colorSlate300}
            lineColor={colors.colorSlate600}
            {...props}
          />
        </Col>
      </Row>
    </>
  )
}

const LegendComponent = ({ name }) => (
  <div className={styles.legendComponent}>
    <svg height="4" width="50">
      <line
        x1="0"
        y1="3"
        x2="45"
        y2="3"
        stroke="black"
        strokeWidth="2"
        strokeDasharray={!name && '4'}
      />
    </svg>
    {name || 'National'} 7-day Avg
  </div>
)
